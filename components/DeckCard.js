import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { blue, white } from '../utils/colors'

export default function DeckCard ({ deck, onPress, style = {} }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.defaultTouchable, style.card]}>
      <Text style={[styles.defaultText, style.text]}>{ deck.name } : { deck.cards.length }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultTouchable: {
    backgroundColor: blue,
    padding: 20,
  },
  defaultText: {
    textAlign: 'center',
    fontSize: 32,
    color: white,
  }
})
