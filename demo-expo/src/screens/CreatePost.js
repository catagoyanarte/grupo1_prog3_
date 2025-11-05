import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
      loading: '',
      error: '',
      likes: [], // agregar y obtener datos de una coleccion power
                 // donde se guardan los emails - agregar datos 
    }}

    crearPosteo(mensaje){
      if (mensaje !== '') {

      db.collection('posts').add({
        owner: auth.currentUser.email,
        descripcion: this.state.descripcion,
        createdAt: Date.now(),
      })
      .then( console.log('el posteo se ha enviado correctamente') )
      .catch( error => console.log(error) )

    } 
  }

  render() {
    return (
      <View>
      <Text>¿En que estas pensando?</Text>
      <View>
        <TextInput
        keyboardType='default'
        placeholder='Escribi tu proximo posteo'
        onChangeText={(text) => this.setState({ descripcion: text })}
        value={this.state.descripcion}
        />
        <Pressable onPress={() => this.crearPosteo(this.state.descripcion)}>
          <Text>Publicar Posteo</Text>
        </Pressable>
      </View>
      </View>
    )
  }}


export default CreatePost
