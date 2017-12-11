import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import {
  blue, green, gold, lightGreen, ligthBlue, orange
} from './colors'

export const randomColor = () => {
  const paintbox = [blue, ligthBlue, green, lightGreen, gold, orange]
  const index = Math.floor(Math.random() * paintbox.length)
  return paintbox[index]
}

const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotification () {

  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification () {
  return {
    title: 'Quiz time!',
    body: 'Don\'t forget to complete a quiz for today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      console.log(data)
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(13)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
