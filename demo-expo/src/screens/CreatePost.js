import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: '',
      loading: '',
      error: '',
      likes: [], // donde se guardan los emails
    }}

    crearPosteo(){
      db.collection('posts').add({
        owner: auth.currentUser.email,
        descripcion: this.state.descripcion,
        createdAt: Date.now(),
      })
      .then( console.log('el posteo se ha enviado correctamente') )
      .catch( error => console.log(error) )
    }
// para obtener los datos de una coleccion
//db.collection('posts').onSnapshot(
//  docs => {
//    let posts = [];
//    docs.forEach( doc => {
//      posts.push({
//        id: doc.id,
//        data: doc.data()
//      })
//      this.setState({
//        posteos: posts,
//        loading: false
//      })
//    })
//  }
//)

  render() {
    return (
      <Text>Create Post</Text>
    )
  }}


export default CreatePost
