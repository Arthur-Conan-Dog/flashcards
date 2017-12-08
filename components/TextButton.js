import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { blue, white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.defaultTouchable, style.touchable]}>
      <Text style={[styles.defaultText, style.text]}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultTouchable: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: blue,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    textAlign: 'center',
    fontSize: 28,
    color: white,
  }
})
