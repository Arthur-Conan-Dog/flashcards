import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import TextButton from './TextButton'

import { blue, white, green, lightGreen, gold } from '../utils/colors'

import { connect } from 'react-redux'


class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  handleAddCard = () => {

    const { deckId, navigation } = this.props
    const { key } = navigation.state

    navigation.navigate('AddCard', { deckId })
  }

  handleStartQuiz = () => {

    const { deck: { cards }, navigation } = this.props

    navigation.navigate('Quiz', { cards })
  }

  render () {
    const { deck: { name, cards }, navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{ name.toUpperCase() }</Text>
          <Text style={styles.number}>
            <MaterialCommunityIcons name="cards-outline" size={30}></MaterialCommunityIcons>
            { cards.length } CARDS
          </Text>
        </View>
        <TextButton
          style={addButton}
          onPress={this.handleAddCard}>
            ADD CARD
        </TextButton>
        <TextButton
          style={quizButton}
          onPress={this.handleStartQuiz}>START QUIZ</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 5,
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: white,
    fontSize: 64,
    marginBottom: 25
  },
  number: {
    color: white,
    fontSize: 20
  }
})

const addButton = StyleSheet.create({
  touchable: {
    borderRadius: 0,
    backgroundColor: lightGreen,
  }
})

const quizButton = StyleSheet.create({
  touchable: {
    borderRadius: 0,
    backgroundColor: gold,
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetail)
