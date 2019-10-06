import React from 'react';
import {
  ActivityIndicator,

  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from './User';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentWillMount=()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyCkQb0yGT2Rc1q-qro0cx8k6eb7w5QIUoE",
        authDomain: "chat-ab024.firebaseapp.com",
        databaseURL: "https://chat-ab024.firebaseio.com",
        projectId: "chat-ab024",
        storageBucket: "",
        messagingSenderId: "559118306420",
        appId: "1:559118306420:web:f01fc06da2db8170"
      };
      firebase.initializeApp(firebaseConfig)
      console.log('firebase created')
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('myPhone')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}