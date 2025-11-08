import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
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
        <Text style={styles.title}> Bienvenido! Registre su usuario </Text>

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
        <Text>{this.state.error}</Text>
        <Pressable style={styles.boton} onPress={() => this.submit(this.state.username, this.state.email, this.state.password)}>
          <Text> Enviar registro </Text>
        </Pressable>

        <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate("Login")}>
          <Text>Ya tenes cuenta? Iniciar sesion</Text>
        </Pressable>
      </View>
    )
  }

  
}


const styles = StyleSheet.create({
  container: {
    width: '92%',
    maxWidth: 740,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginVertical: 20,
    alignItems: 'stretch',
  },
  
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#1E5AA7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1E5AA7',
    fontSize: 15,
    fontWeight: '600',
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
})
