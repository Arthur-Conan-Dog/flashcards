import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Foundation } from '@expo/vector-icons'

import { black, white, gray } from '../utils/colors'

import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'

import SwitchBox from './SwitchBox'

const initialState = {
  id: '',
  question: '',
  answer: true,
}

class AddCard extends Component {

  state = {
    ...initialState,
    id: 'c' + this.props.serialNumber
  }

  save = () => {
    if (!this.state.question) return

    const card = this.state
    const { deckId } = this.props.navigation.state.params

    this.props.addCard(card)

    this.setState(initialState)

    addCardToDeck(deckId, card)

    this.props.goBack()
  }

  handleTextChange = (question) => {
    this.setState({
      question
    })
  }

  handleValueChecked = (value) => {
    this.setState({
      answer: value
    })
  }

  render () {

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
          <TextInput value={this.state.question}
                     onChangeText={this.handleTextChange}
                     placeholder="QUESTION"
                     multiline={true}
                     style={styles.textInput}></TextInput>
          <SwitchBox value={this.state.answer}
                     onValueChange={this.handleValueChecked}></SwitchBox>
          <TouchableOpacity
            style={styles.button}
            onPress={this.save}>
              <Text style={{ textAlign: 'center', color: gray, fontSize: 32, marginRight: 16 }}>SAVE</Text>
              <Foundation name="check" size={30} color={gray}></Foundation>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
  },
  textInput: {
    backgroundColor: white,
    padding: 6,
    marginBottom: 10,
    alignSelf: 'stretch',
    fontSize: 32,
    height: 96,
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50%',
    backgroundColor: white,
    padding: 6,
    marginTop: 64
  },
})

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params

  return {
    deckId,
    serialNumber: state[deckId].cards.length + 1
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckId } = navigation.state.params

  return {
    addCard: (card) => dispatch(addCard(deckId, card)),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
