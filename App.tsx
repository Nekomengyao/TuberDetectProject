// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// // import Index from './src_imageCapture'
// import Index from './src_test'


// export default class App extends Component {
//   render() {
//     return (
//       <Index />
//     )
//   }
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthScreens, Login, Register, ModeSelection } from './src_test/AuthScreens';
import index from './src_test/index'; // 导入原有的 test_version
import Feedback from './src_test/Feedback';
import History from './src_test/History';
import Profile from './src_test/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';
          if (route.name === 'OpCame') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="OpCame" component={index} options={{ title: 'T-SCANNING' }} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreens} />
        <Stack.Screen name="ModeSelection" component={ModeSelection} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;