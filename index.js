const cardsDiv = document.getElementById('cards-div')
let deckId = ''

function handleNewDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id
    })
}

document.getElementById('new-deck').addEventListener('click', handleNewDeck)

function handleDrawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      data.cards.map((card, ind) => {
        document.getElementById('cards-div').children[
          ind
        ].innerHTML = `<img class="card-img" src="${card.image}" alt="${card.code}">`
      })
    })
}

document.getElementById('draw-cards').addEventListener('click', handleDrawCards)
