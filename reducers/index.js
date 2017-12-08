import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      const { deckId, card } = action

      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          cards: [...state[deckId].cards, card]
        }
      }
    default:
      return state
  }
}
