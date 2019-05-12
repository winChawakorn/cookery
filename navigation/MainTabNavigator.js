import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import ListScreen from '../screens/ListScreen'
import ExploreScreen from '../screens/ExploreScreen'
import SettingsScreen from '../screens/SettingsScreen'
import MenuDetailScreen from '../screens/MenuDetailScreen'

const ListStack = createStackNavigator({
  List: ListScreen,
  Detail: MenuDetailScreen,
})

ListStack.navigationOptions = {
  tabBarLabel: 'Cooking List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-list'
          : 'md-list'
      }
    />
  ),
}

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
  Detail: MenuDetailScreen,
})

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator({
  ExploreStack,
  ListStack,
  SettingsStack,
})
