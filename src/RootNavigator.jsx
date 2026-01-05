import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import WelcomeScreen from './screen/WelcomeScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        // header: () => (
        //   <View><Text style={{ fontSize: 18, fontWeight: 'bold' , color:'red'}}>Header</Text></View>
        // ),
      }}> 
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen }
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Register"
        component={RegisterScreen }
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen }
        options={{ headerShown: false }}
      /> 

      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
