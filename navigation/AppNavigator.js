import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginScreen from '../screens/LoginScreen'

export default createAppContainer(createSwitchNavigator({
  Login: createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    }
  }),
  Main: MainTabNavigator,
}))