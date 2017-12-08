import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { black } from './utils/colors'

import { getDecks, getDeck, clearLocalStorage, checkLocalStorage } from './utils/api'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import RootNavigator from './components/RootNavigator'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <RootNavigator></RootNavigator>
        </View>
      </Provider>
    );
  }
}
