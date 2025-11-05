import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet, FlatList } from 'react-native';

// capturar por id y agregar a card
export class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      nuevoComentario: ''
    }
  }

  componentDidMount() {
    // para obtener los datos de una coleccion
    db.collection('comentarios').onSnapshot(
      docs => {
        let coments = [];
        docs.forEach(doc => {
          coments.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            comentarios: coments,
            loading: false
          })
        })
      }
    )
  }

  comentar(comentario) {
    if (comentario !== '') {
      db.collection('posts').add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        mensaje: descripcion
      })
        .then((response) => this.props.navigation.navigate('Nuevo Post'))
        .catch((error) => console.log(error))
    }
  }

  render() {
    return (
      <View>
        <Text>Agrega un comentario</Text>
        <View>
          <TextInput
            keyboardType='default'
            placeholder='Comenta que te parece publicacion'
            onChangeText={(text) => this.setState({ nuevoComentario: text })}
            value={this.state.nuevoComentario}
          />
          <Pressable onPress={() => this.comentar(this.state.nuevoComentario)}>
            <Text>Comentar post</Text>
          </Pressable>
          <View>
            <Text>Comentarios:</Text>
            {this.state.comentarios.map((comentario) => (
              <Text>{comentario}</Text>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default Comentarios
