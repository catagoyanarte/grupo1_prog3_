import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      error: ''
    }
  }

  submit(username, email, password) {
    console.log('Creando usuario con los valores', { username, email, password })


    if (username.length < 3) {
      this.setState({ error: 'El nombre de usuario debe tener al menos 3 caracteres.' })
      return
    }
    if (!email.includes('@')) {
      this.setState({ error: 'El email no es válido.' })
      return
    }
    if (password.length < 6) {
      this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' })
      return
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Guarde los datos adicionales en Firestore
        db.collection('users')
          .add({
            owner: email,
            username: username,
            createdAt: Date.now()
          })
          .then(() => {
            // Si esta todo bien, redirigimos al login
            this.props.navigation.navigate('Login')
          })
      })
      .catch(err => {
        console.log('error')
        this.setState({ error: 'Error en el registro.' })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registra tu usuario</Text>

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Nombre de usuario'
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />

        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Contraseña'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
      </View>
    )
  }
}