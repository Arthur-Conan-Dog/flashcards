export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const RECEIVE_DECK = 'RECEIVE_DECK'

export function receiveDeck (deck) {
  return {
    type: RECEIVE_DECK,
    deck
  }
}

export const ADD_DECK = 'ADD_DECK'

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export const ADD_CARD = 'ADD_CARD'

export function addCard (deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}
