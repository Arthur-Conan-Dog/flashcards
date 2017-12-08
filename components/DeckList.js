import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { black } from '../utils/colors'
import { randomColor } from '../utils/helpers'

import TextButton from './TextButton'
import DeckCard from './DeckCard'

class DeckList extends Component {

  componentDidMount () {

    const { dispatch } = this.props

    getDecks().then(decks => dispatch(receiveDecks(decks)))
      // .then(() => console.log(this.props))
  }

  // renderItem = () => (
  //
  // )

  render () {
    const { decks } = this.props

    return (
      // change ScrollView into FlatList
      <ScrollView style={styles.container}>
        {
          Object.keys(decks).map(deck => (
            <DeckCard key={deck}
                      deck={decks[deck]}
                      style={{ card: { backgroundColor: randomColor() } }}
                      onPress={() => this.props.navigation.navigate('DeckDetail', { deckId: deck })}></DeckCard>
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: black,
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
