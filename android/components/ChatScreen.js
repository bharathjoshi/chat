import React, { Component } from 'react';
import { Platform, Alert, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, View } from 'react-native';
import User from './User'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase'
import { SafeAreaView } from 'react-navigation';

export default class HomeScreen extends Component {




    constructor(props) {
        super(props)
        console.log(2)
        console.log(1, props.navigation.state.params)
        this.state = {
            message: '',
            person: {
                name: props.navigation.state.params.Name,
                phone: props.navigation.state.params.phone
            },
            messageList: []


        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }
    componentWillMount = () => {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => value => {
        this.setState({ [key]: value })
    }
    handleSend = async () => {

        if (this.state.message.length > 0) {
            console.log(User.phone, this.state.person.name, this.state.person.name)
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.message,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            //   console.log('messages/' ,User.phone , '/' ,this.state.person.phone ,'/' , msgId)
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({ message: '' })
        }
    }
    renderRow = ({ item }) => {
        console.log(item)
        return (
            <View style={{
                flexDirection :'row',
                width :'60%',
                alignItems: item.from == User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from == User.phone ? '#00897b' : '#7cb342',
                borderRadius: 15,
                marginBottom: 10
            }} >
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {item.time}
                </Text>
            </View>
        )
    }
    render() {
        let { height, width } = Dimensions.get('window')
        return (
            <SafeAreaView>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}

                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder='type your message'
                        value={this.state.message}
                        onChangeText={(text) => { this.setState({ message: text }) }}
                    />
                    <TouchableOpacity onPress={this.handleSend}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}