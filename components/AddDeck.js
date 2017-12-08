import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import { Foundation } from '@expo/vector-icons'

import { black, white, gray } from '../utils/colors'

import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

import { NavigationActions } from 'react-navigation'

const initialState = {
  id: '',
  name: '',
  cards: []
}

class AddDeck extends Component {

  state = initialState

  submit = () => {
    const deck = this.state,
          key = deck.name

    if (!key) return

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState(initialState)

    this.toDeckListView()

    saveDeckTitle(key, deck)
  }

  toDeckListView () {
    Keyboard.dismiss()

    this.props.navigation.dispatch(NavigationActions.back({
      key: null
    }))
  }

  render () {

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
          <TextInput onChangeText={(name) => this.setState({ name })}
                     placeholder="NAME"
                     value={this.state.name}
                     style={styles.textInput}></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={this.submit}>
              <Text style={{ textAlign: 'center', color: gray, fontSize: 32, marginRight: 16 }}>SUBMIT</Text>
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
    marginBottom: 20,
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
    padding: 8,
  },
})

export default connect()(AddDeck)
