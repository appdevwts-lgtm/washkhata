import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import { View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './screen/ProfileScreen';
import OrderScreen from './screen/OrderScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          height: Platform.OS === 'ios' ? 85 : 65,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#fff',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          position: 'absolute',
          borderColor:"black",
          borderWidth:1
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? 26 : 22;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: Platform.OS === 'ios' ? 5 : 0,
            }}>
              {focused && (
                <View style={{
                  position: 'absolute',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  top: -5,
                }} />
              )}
              <Icon 
                name={iconName} 
                size={iconSize} 
                color={color}
                style={{
                  marginBottom: focused ? 2 : 0,
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrderScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
      <Tab.Screen 
        name="Settings" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}