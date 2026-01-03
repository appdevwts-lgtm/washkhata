import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
        // header: () => (
        //   <View><Text style={{ fontSize: 18, fontWeight: 'bold' , color:'red'}}>Header</Text></View>
        // ),
      }}> 
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
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
