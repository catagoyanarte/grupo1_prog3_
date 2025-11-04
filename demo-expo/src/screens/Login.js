import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'


export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      email: '',
      error: ''
    }
  }


  submit(email, password) {
    console.log('Creando usuario con los valores', { email, password })


    if (!email.includes('@')) {
      this.setState({ error: 'El email no es válido.' })
      return
    }
    if (password.length < 6) {
      this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' })
      return
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
            this.props.navigation.navigate('AppTabs')
          })
     
      .catch(err => {
        console.log('error')
        this.setState({ error: 'Error en el registro.' })
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>


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
        <Text>{this.state.error}</Text>
        <Pressable style={styles.boton} onPress={() => this.submit( this.state.email, this.state.password)}>
          <Text>Loguearme</Text>
        </Pressable>


        <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate("Register")}>
          <Text>No tenes una cuenta? Registrate</Text>
        </Pressable>
      </View>
    )
  }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(182, 163, 163, 0.5)',
        alignItems: 'center',
        fontSize: 16,


    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'


    },
    boton: {
        backgroundColor: 'rgba(241, 9, 9, 0.26)',
        borderRadius: 30,
        padding: 10,
        marginTop: 10
    },
    field: {
        backgroundColor: 'rgba(54, 42, 42, 0.26)',
        margin: 10,
        borderRadius: 10,
        padding: 8


    }
})
