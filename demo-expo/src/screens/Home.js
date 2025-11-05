import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
        posteosRecuperados: [],
        loading: true,
        error: ''
      }
    }

  componentDidMount() {
    // para obtener los datos de una coleccion
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posteosRecuperados: posts,
          loading: false
        })
      }
    )}

  render() {

    if (this.state.loading) {
      return <ActivityIndicator size='large' color='blue' />
    }


    return (
      <View style={styles1.container}>
        <View style={styles1.flatlist}>
        <FlatList
            data={this.state.posteosRecuperados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles1.postCard}>
            <Text style={styles1.owner}>{item.data.owner}</Text>
            <Text style={styles1.texto}> {item.data.descripcion} </Text> 
              </View>
              )}
            />
            </View>
      </View>

    )
}}

const styles1 = StyleSheet.create({
  flatlist: {
    width: '100%',
    flex: 1
  },
  container: { flex: 1,
     backgroundColor: '#fff',
     paddingHorizontal: 10,
    padding: 20 },
  postCard: { backgroundColor: '#f5f5f5',
     borderRadius: 8,
     padding: 10, marginBottom: 10 },
  owner: { fontWeight: 'bold',
     color: '#333',
     marginBottom: 5 },
  texto: { fontSize: 16,
     color: '#000' },           
  noPosts: { textAlign: 'center',
     marginTop: 30,
     fontSize: 16,
     color: '#666' },
  error: { textAlign: 'center',
     color: 'crimson',
     marginTop: 20 },
  

})

export default Home
