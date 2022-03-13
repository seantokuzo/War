function getNewDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => console.log(data))
}

document.getElementById('new-deck').addEventListener('click', getNewDeck)

function timeOut() {
  console.log('Hurry up bruh')
}

// setTimeout(timeOut, 2000)

const people = [
  { name: 'Jack', hasPet: true },
  { name: 'Jill', hasPet: false },
  { name: 'Alice', hasPet: true },
  { name: 'Bob', hasPet: false },
]

const fn = (person) => person.hasPet

function filterArray(array, callback) {
  let filteredArray = []
  for (let person of array) {
    if (callback(person)) {
      filteredArray.push(person)
    }
  }
  return filteredArray
}

const peopleWithPets = filterArray(people, fn)

console.log(peopleWithPets)
