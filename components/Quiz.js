import React, { Component } from 'react'
import { View, Text, StyleSheet, Vibration, Animated } from 'react-native'
import TextButton from './TextButton'

import { black, gray, white, lightGreen, orange, blue } from '../utils/colors'

const initialState = {
  cards: [],
  currentIndex: 0,
  correct: 0,
  bounceValue: new Animated.Value(1)
}

export default class Quiz extends Component {

  constructor (props) {
    super (props)

    const { cards } = this.props.navigation.state.params

    this.state = cards
                ? {
                    ...initialState,
                    cards,
                  }
                : initialState

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect = (value) => {

    const { cards, currentIndex, correct, bounceValue } = this.state,
          { answer } = cards[currentIndex]

    if (value === answer)
      this.setState({
        correct: correct + 1
      })
    else
      Vibration.vibrate(1000)

    this.setState({
      currentIndex: currentIndex + 1
    })

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start()
  }

  render () {
    const { correct, cards, currentIndex, bounceValue } = this.state
    const total = cards.length

    if (!total)
      return (
        <View style={styles.plainContainer}>
          <Text style={{ fontSize: 24, textAlign: 'center', color: blue, padding: 8 }}>NO CARDS IN THIS DECK, ADD ONE FIRST!</Text>
        </View>
      )

    if (currentIndex === total)
      return (
        <View style={styles.plainContainer}>
          <Text style={{ fontSize: 32, textAlign: 'center', color: blue }}>YOUR SCORE: { correct } / { total }</Text>
        </View>
      )

    const card = cards[currentIndex]

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.header, { transform:
            [{
              scale: bounceValue
             }]
          }]}>
            <Text style={styles.question}>{ card.question }</Text>
            <Text style={styles.number}>
              { currentIndex + 1 } / { cards.length }
            </Text>
        </Animated.View>
        <TextButton
          style={right}
          onPress={() => this.handleSelect(true)}>
            CORRECT
        </TextButton>
        <TextButton
          style={wrong}
          onPress={() => this.handleSelect(false)}>
            INCORRECT
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: black,
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    color: white,
    fontSize: 32,
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
  },
  number: {
    color: white,
    fontSize: 20
  },
  plainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  }
})

const right = StyleSheet.create({
  touchable: {
    borderRadius: 0,
    backgroundColor: lightGreen,
  }
})

const wrong = StyleSheet.create({
  touchable: {
    borderRadius: 0,
    backgroundColor: orange,
  }
})
