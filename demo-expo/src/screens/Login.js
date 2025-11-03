import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native'
import Register from './Register'
import { auth } from '../firebase/config' 

export class Login extends Component {
   constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            error: ''
        }
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Login
