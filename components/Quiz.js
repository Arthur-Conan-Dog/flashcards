import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Animated } from 'react-native'
import TextButton from './TextButton'

import { black, gray, white, lightGreen, orange, blue } from '../utils/colors'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

const initialState = {
  cards: [],
  currentIndex: 0,
  correct: 0,
  showAnswer: false,
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
    this.toggleShowAnswer = this.toggleShowAnswer.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
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
      showAnswer: false,
      currentIndex: currentIndex + 1
    })

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start()
  }

  toggleShowAnswer = () => {
    this.setState(prev => ({
      showAnswer: !prev.showAnswer
    }))
  }

  handleRestart = () => {
    const { cards } = this.props.navigation.state.params
    this.setState({
      ...initialState,
      cards
    })
  }

  handleGoBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { correct, cards, currentIndex, showAnswer, bounceValue } = this.state
    const total = cards.length

    if (!total)
      return (
        <View style={styles.plainContainer}>
          <Text style={{ fontSize: 24, textAlign: 'center', color: blue, padding: 8 }}>NO CARDS IN THIS DECK, ADD ONE FIRST!</Text>
        </View>
      )

    if (currentIndex === total) {
      // Clear local notification
      clearLocalNotification()
        .then(setLocalNotification)
        .catch(err => console.log(err))

      return (
        <View style={styles.plainContainer}>
          <Text style={{ fontSize: 32, textAlign: 'center', color: blue, marginBottom: 32 }}>YOUR SCORE: { correct } / { total }</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleRestart}>
              <Text style={{ fontSize: 24, color: blue }}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleGoBack}>
              <Text style={{ fontSize: 24, color: blue }}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

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
            <Text style={styles.answer} onPress={this.toggleShowAnswer}>
              {
                showAnswer ? card.answer ? 'CORRECT' : 'INCORRECT' : 'SHOW ANSWER'
              }
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
  answer: {
    marginTop: 25,
    fontSize: 14,
    color: gray,
  },
  plainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  button: {
    marginTop: 6,
    padding: 6,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    marginLeft: 64,
    marginRight: 64,
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
