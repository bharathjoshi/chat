import React, { Component } from 'react';
import { Platform, SafeAreaView, Alert, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase'
import User from './User';


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };
  constructor() {
    super()
    this.state = { users: [] , users_online : []  }
    this.signOut = this.signOut.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }
  componentWillMount = () => {
    dbRef = firebase.database().ref('users')

    dbRef.on('child_added', (value) => {
      person = value.val()
      person.phone = value.key
      console.log(value.key,value);
      if (person.phone==User.phone){
        User.name= person.name
      }
      else{
      this.setState((prevState) => {
        return {
          users: [...prevState.users, person]
        }
      })
    }})
    
  }
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  renderRow = ({ item }) => {
    console.log(item)

    return (
      <TouchableOpacity style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}

        onPress={() => {
          console.log(item)

          this.props.navigation.navigate('Chat', item)

        }}>
        <Text >{item.Name} {item.phone}</Text>
      </TouchableOpacity>
    )

  }
  render() {
    return (
      <SafeAreaView>

        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.phone}
        />


        <TouchableOpacity onPress={this.signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>




      </SafeAreaView>
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
