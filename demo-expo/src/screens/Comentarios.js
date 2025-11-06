import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import PostCard from '../components/PostCard';

// capturar por id y agregar a card
export class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      nuevoComentario: '',
      loading: true,
      error: '',
    }
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;
  
    db.collection('comentarios')
      .where('postId', '==', postId)
      // .orderBy('createdAt', 'desc') m salta un error
      .onSnapshot(docs => {
        let coments = [];
        docs.forEach(doc => {
          coments.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          comentarios: coments,
          loading: false
        });
      });
  }
  
  comentar() {
    const postId = this.props.route.params.postId;
    const comentario = this.state.nuevoComentario.trim();
    
    db.collection('comentarios')
      .add({
        postId,                              
        owner: auth.currentUser.email,
        texto: comentario,
        createdAt: Date.now()
      })
      .then(() => 
        this.setState({ nuevoComentario: '' }))
      .catch(() =>
         this.setState({ 
          error: 'No se pudo publicar el comentario' 
        }));
  }
  

  render() {


    if (this.state.loading) {
      return <ActivityIndicator size='large' color='blue' />
    }

    return (
      <View style={styles3.container}>
        <Text style={styles3.titulo}>Agrega un comentario</Text>
        <View>

          <TextInput style={styles3.input}
            keyboardType='default'
            placeholder='Comenta que te parece esta publicacion'
            onChangeText={(text) => this.setState({ nuevoComentario: text })}
            value={this.state.nuevoComentario}
          />

          <Pressable style={styles3.boton} onPress={() => this.comentar()}>
            <Text style={styles3.textoBoton}>Comentar post</Text>
          </Pressable>
          <View>

            <Text style={styles3.subtitulo}>Comentarios:</Text>

            {this.state.comentarios.map((comentario) => (
              <View key={comentario.id} style={styles3.commentCard}>
                <Text style={styles3.owner}>{comentario.data.owner}</Text>
                <Text style={styles3.texto}>{comentario.data.texto}</Text>
              </View>
            ))}

          </View>
        </View>
      </View>
    )
  }
}

export default Comentarios

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#005183',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  commentCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  texto: {
    fontSize: 14,
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    marginTop: 10,
  },
});
