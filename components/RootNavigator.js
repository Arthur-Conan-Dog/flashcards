import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { white, gray, black, dark, blue } from '../utils/colors'

import AddDeck from './AddDeck'
import DeckList from './DeckList'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'

// class Quiz extends Component {
//   render () {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Quiz</Text>
//         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//           <Text>Back</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECK',
      tabBarIcon: ({ tintColor }) => <Ionicons name={'ios-list'} size={30} color={tintColor}></Ionicons>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'ADD NEW',
      tabBarIcon: ({ tintColor }) => <Ionicons name={'ios-add'} size={30} color={tintColor}></Ionicons>
    }
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: blue,
    inactiveTintColor: dark,
    inactiveBackgroundColor: white,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      height: 60,
      shadowRadius: 6,
      shadowOpacity: 1,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    tabStyle: {
      padding: 8,
    }
  },
})

const RootNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'HOME',
    }
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'QUIZ',
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'ADD CARD',
    }
  }
})

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 4,
    padding: 4,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    alignSelf: 'stretch'
  }
})

export default RootNavigator
