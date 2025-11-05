import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
      loading: '',
      error: ''
    }}

    crearPosteo(mensaje){
      if (mensaje !== '') {

      db.collection('posts').add({
        owner: auth.currentUser.email,
        descripcion: this.state.descripcion,
        createdAt: Date.now(),
        likes: [], // agregar y obtener datos de una coleccion power
                  // donde se guardan los emails - agregar datos 
      })
      .then( console.log('el posteo se ha enviado correctamente') )
      .catch( error => console.log(error) )
      } 
      else {
        this.setState({ error: 'escribi algo antes de publicar!'})
      }
    } 

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>¿En que estas pensando?</Text>
      <View>
        <TextInput style={styles.input}
        keyboardType='default'
        placeholder='Escribi tu proximo posteo'
        onChangeText={(text) => this.setState({ descripcion: text })}
        value={this.state.descripcion}
        />
        <Pressable style={styles.button}
         onPress={() => this.crearPosteo(this.state.descripcion)}>
          <Text style={styles.buttonText}>Publicar Posteo</Text>
        </Pressable>
      </View>
      </View>
    )
  }}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      minHeight: 80,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: 6,
    },
  });
  

export default CreatePost
