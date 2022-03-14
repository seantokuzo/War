const cardsArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
const popupDiv = document.getElementById('popup-div')
const shufflePopUp = '<h4 class="popup">Shuffling Deck...</h4>'
const newDeckShuffleButton = document.getElementById('new-shuffle-deck')
const drawCardsButton = document.getElementById('draw-cards')
const cardsDiv = document.getElementById('cards-div')
const compooterScoreEl = document.getElementById('compooter-score')
const userScoreEl = document.getElementById('user-score')
const message = document.getElementById('message')
const cardsRemaining = document.getElementById('cards-remaining')
let deckId = ''
let card1 = ''
let card2 = ''
let compooterScore = 0
let userScore = 0

function renderScores() {
  compooterScoreEl.innerText = `Compooter Score: ${compooterScore}`
  userScoreEl.innerText = `Your Score: ${userScore}`
}

function shuffleDeck() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/shuffle/`)
    .then((res) => res.json())
    .then((data) => {
      popupDiv.innerHTML = shufflePopUp
      newDeckShuffleButton.disabled = true
      drawCardsButton.disabled = true
      setTimeout(() => {
        popupDiv.className = 'popup-div fade-out'
        cardsDiv.children[1].innerHTML = ''
        cardsDiv.children[2].innerHTML = ''
        message.innerText = 'Game of War!'
        cardsRemaining.innerText = 'Cards Remaining: 52'
        compooterScore = 0
        userScore = 0
        renderScores()
      }, 750)
      setTimeout(() => {
        popupDiv.className = 'popup-div'
        popupDiv.innerHTML = ''
        newDeckShuffleButton.disabled = false
        drawCardsButton.disabled = false
      }, 900)
    })
}

function getLocalDeck() {
  if (localStorage.getItem('myDeckId')) {
    deckId = localStorage.getItem('myDeckId')
    newDeckShuffleButton.textContent = 'Shuffle Deck'
    newDeckShuffleButton.addEventListener('click', shuffleDeck)
    shuffleDeck()
  } else return
}

function handleNewDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id
      localStorage.setItem('myDeckId', data.deck_id)
      console.log(`Local Deck set to: ${deckId}`)
      newDeckShuffleButton.textContent = 'Shuffle Deck'
      newDeckShuffleButton.addEventListener('click', shuffleDeck)
      renderScores()
    })
}
newDeckShuffleButton.addEventListener('click', handleNewDeck)

function compareCards(card1, card2) {
  const card1Value = cardsArray.indexOf(card1)
  const card2Value = cardsArray.indexOf(card2)

  if (card1Value > card2Value) {
    message.innerText = 'Compooter Wins This Round!'
    compooterScore += 1
    compooterScoreEl.innerText = `Compooter Score: ${compooterScore}`
  } else if (card2Value > card1Value) {
    message.innerText = 'You Win This Round!'
    userScore += 1
    userScoreEl.innerText = `Your Score: ${userScore}`
  } else message.innerText = 'War! War! War!'
}

function determineWinner() {
  newDeckShuffleButton.textContent = 'New Game'
  if (compooterScore > userScore) {
    message.innerText = 'YOU LOST! WOMP WOMP!'
  } else if (userScore > compooterScore) {
    message.innerText = 'YOU WIN! SUCK IT COMPOOTER!'
    startConfetti()
  } else message.innerText = "ER MERR GERRRD IT'S A TIE!"
}

function handleDrawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      cardsRemaining.innerText = `Cards Remaining: ${data.remaining}`
      card1 = data.cards[0].value
      card2 = data.cards[1].value
      cardsDiv.children[1].innerHTML = `<img class="card-img" src="${data.cards[0].image}" alt="${data.cards[0].code}">`
      cardsDiv.children[2].innerHTML = `<img class="card-img" src="${data.cards[1].image}" alt="${data.cards[1].code}">`
      compareCards(card1, card2)
      renderScores()
      if (data.remaining === 0) {
        drawCardsButton.disabled = true
        determineWinner()
      }
    })
}

drawCardsButton.addEventListener('click', handleDrawCards)

getLocalDeck()

// localStorage.clear()
