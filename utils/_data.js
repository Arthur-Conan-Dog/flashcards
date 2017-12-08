import { AsyncStorage } from 'react-native'

export const DATA_STORAGE_KEY = 'Flashcards:data'

const dummyData = {
  'React': {
    id: 'React',
    name: 'React',
    cards: [
      {
        id: 'c1',
        question: 'Is React flexible and can be used in a variety of projects ?',
        answer: true,
      },
      {
        id: 'c2',
        question: 'Do we need to rewrite our app to start using React ?',
        answer: false,
      }
    ]
  },
  'Redux': {
    id: 'Redux',
    name: 'Redux',
    cards: [
      {
        id: 'c3',
        question: 'Is Redux a predictable state container for JavaScript apps ?',
        answer: true,
      },
      {
        id: 'c4',
        question: 'Is React a WorldPress framework ?',
        answer: false,
      }
    ]
  },
}

function setDummyData () {

  AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatData (results) {

  // return setDummyData()

  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
