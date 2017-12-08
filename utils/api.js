import { AsyncStorage } from 'react-native'

import { DATA_STORAGE_KEY, formatData } from './_data'

// return all of the decks along with their titles, questions, and answers.
export function getDecks ()  {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(formatData)
}

// take in a single id argument and return the deck associated with that id.
export function getDeck (id) {

  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(res => {
      const data = JSON.parse(res)
      return data[id]
    })
}

// take in a single title argument and add it to the decks.
export function saveDeckTitle (key, deck) {

  return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
    // .then(() => AsyncStorage.getItem(DATA_STORAGE_KEY))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck (key, card) {

  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(res => {

      const data = JSON.parse(res)

      return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [key]: {
          ...data[key],
          cards: [...data[key].cards, card],
        }
      }))
    })
}

export function clearLocalStorage () {

  return AsyncStorage.removeItem(DATA_STORAGE_KEY)
}

export function checkLocalStorage () {

  return AsyncStorage.getItem(DATA_STORAGE_KEY)
}
