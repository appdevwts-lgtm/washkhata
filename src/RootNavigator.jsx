import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import WelcomeScreen from './screen/WelcomeScreen';
import EditScreen from './screen/EditScreen';
import CouponSceeen from './screen/CouponSceeen';
import HelpCenter from './screen/HelpCenter';
import MyAddressScreen from './screen/MyAddressScreen';
import PaymentMethod from './screen/PaymentMethod';
import PrivacyPolicyScreen from './screen/PrivacyPolicyScreen';
import TermsConditionScreen from './screen/TermsConditionScreen';
import NotificationsScreen from './screen/NotificationScreen';
import OrderDetailsScreen from './screen/OrderDetailsScreen';
import PaymentScreen from './screen/PaymentScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" > 
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
        name="EditProfile"
        component={EditScreen }
        options={{ headerShown: false }}
        
      /> 

      {/* //profile navigation routes */}
      <Stack.Screen
        name="Coupon"
        component={CouponSceeen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAddress"
        component={MyAddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsCondtions"
        component={TermsConditionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
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
