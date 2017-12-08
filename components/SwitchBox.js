import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { white, black, gray, lightGreen, orange } from '../utils/colors'

export default class SwitchBox extends Component {

  state = {
    value: this.props.value,
  }

  handleValueChange = () => {
    const { value } = this.state

    this.setState({
      value: !value
    })

    this.props.onValueChange(!value)
  }

  render () {
    const { value } = this.state

    return (
      <View style={styles.switch}>
        <TouchableOpacity
          onPress={this.handleValueChange}
          style={[styles.button, value ? { backgroundColor: lightGreen } : null]}>
            <Text style={[styles.text, value ? { color: white } : null]}>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleValueChange}
          style={[styles.button, !value ? { backgroundColor: orange } : null]}>
            <Text style={[styles.text, !value ? { color: white } : null]}>INCORRECT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  switch: {
    backgroundColor: black,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: white,
  },
  text: {
    textAlign: 'center',
    color: gray,
    fontSize: 28
  }
})
