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

  componentDidMount(){
      auth.onAuthStateChanged(user => {
        console.log(user)
        if (user !== null){
          this.props.navigation.navigate(
            'AppTabs'
          )
        }
      }
  
      )
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
        <Text style={styles.title}> Ingrese a su cuenta </Text>


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
          <Text style={styles.texto1}>Loguearme</Text>
        </Pressable>


        <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate("Register")}>
          <Text style={styles.texto1}> No tenes una cuenta? Registrate </Text>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  boton: {
    backgroundColor: '#1E5AA7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  texto1: {
    color: 'white',
  },
})
