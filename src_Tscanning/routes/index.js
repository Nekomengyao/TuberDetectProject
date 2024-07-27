import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/Home/HomePage'
import HistoryScreen from '../screens/History/HistoryPage'
import UserScreen from '../screens/User/UserPage'

const Tab = createBottomTabNavigator()

export default class MainTab extends Component {
  render() {
    return (
        <Tab.Navigator 
          screenOptions={({route}) => ({ 
              headerShown: false, 
              tabBarIcon: ({focused, color,size}) => {
                  let iconName
                  
                  if (route.name === "History") {
                      iconName = focused ? 'book' : 'book-outline'
                  } else if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'User') {
                      iconName = focused ? 'person' : 'person-outline'
                  }                
                  return <Ionicons name={iconName} size={size} color={color}/>
                  
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray',
              })}
        >
          <Tab.Screen name= "History" component={HistoryScreen}/>
          <Tab.Screen name= "Home" component={HomeScreen}/>
          <Tab.Screen name= "User" component={UserScreen}/>
        </Tab.Navigator>
      )
    }
}

const styles = StyleSheet.create({})
