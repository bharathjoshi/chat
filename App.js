import React, {Component} from 'react';
import {Platform, TextInput, StyleSheet, Text, View} from 'react-native';
import LoginScreen from './android/components/LoginScreen'
import HomeScreen from './android/components/HomeScreen'
import ChatScreen from './android/components/ChatScreen'
import AuthLoadingScreen from './android/components/AuthLoadingScreen'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const AppStack = createStackNavigator({ Home: HomeScreen , Chat : ChatScreen});
const AuthStack = createStackNavigator({ Login :LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

