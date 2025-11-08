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
    }
  }

  crearPosteo(mensaje) {

    if ( mensaje === '') {
        this.setState({ error: 'El post no puede estar vacio! Escribi lo que estes pensando.'});
        return;
    }

    if (mensaje !== '') {

      db.collection('posts').add({
        owner: auth.currentUser.email,
        descripcion: this.state.descripcion,
        createdAt: Date.now(),
        likes: [], // agregar y obtener datos de una coleccion power
        // donde se guardan los emails - agregar datos 
      })
        .then(() => {
          console.log('el posteo se ha enviado correctamente');
          this.setState({ descripcion: '', error: '' });
          this.props.navigation.navigate('Home');
        })
        .catch(error => console.log(error))
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
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  card: {
    width: '92%',        
      maxWidth: 740,       
      alignSelf: 'center', 
      backgroundColor: '#f5f5f5',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E5AA7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
});


export default CreatePost
