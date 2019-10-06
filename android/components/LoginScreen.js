import React, { Component } from 'react';
import { Platform, Alert, TextInput, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ProfileScreen from './HomeScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
import firebase from 'firebase';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor() {
    super()
    this.state = {
      name: '',
      phone: '',
      valid : 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
    this.checkingUserExists=this.checkingUserExists.bind(this)
  }
  componentWillMount() {
    AsyncStorage.getItem('myPhone').then(value => {
      if (value) {
        this.setState({ phone: value })
      }

    })
  }
  handleChange = key => value => {
    this.setState({ [key]: value })
  }
  checkingUserExists = (userId) => {
     firebase.database().ref('users/' + userId).limitToFirst(1).once("value", snapshot => {
      if (snapshot.exists()) {
        console.log('exists')
        this.setState({valid:1})

      } else {
        console.log('!exists')

      }
    });
  }
  handlesubmit = async () => {

    if (this.state.phone.length < 10) {
      Alert.alert('Please enter correct no')
    }
    else {
      await AsyncStorage.setItem('myPhone', this.state.phone)
      User.phone = this.state.phone
      const valid = this.checkingUserExists(this.state.phone)
      console.log('value:',this.state.valid)
      if (this.state.valid) {
        Alert.alert('U already exist nibba')
      }
      else {
        firebase.database().ref('users/' + User.phone).set({ name: this.state.name , online : 'online' })
      }
      this.props.navigation.navigate('App');

    }

  }




  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='phone number'
          keyboardType='number-pad'
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder='name'
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.handlesubmit}>
          <Text>Submit</Text>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
