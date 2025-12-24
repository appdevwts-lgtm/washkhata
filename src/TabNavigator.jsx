import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
     screenOptions={{ 
        headerShown: false , 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000ff',
          height: 45,
          borderTopWidth: 0,
          elevation: 10,
          borderLeftWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
         
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white'
    }}
        >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
         tabBarIcon: ({ color, size, focused }) => (
       focused ? <Text style={{color: color, fontSize: size}}>🏠</Text> : <Text style={{color: color, fontSize: size}}>s</Text>
      )
  }} />
      <Tab.Screen name="Homee" component={HomeScreen} options={{
        tabBarIcon:({color, size})=> <Text style={{color: color, fontSize: size}}>🏠</Text> 
      }} />
      <Tab.Screen name="Homfee" component={HomeScreen} options={{
        tabBarIcon:({color, size})=> <Text style={{color: color, fontSize: size}}>🏠</Text> 
      }} />
    </Tab.Navigator>
  );
}
