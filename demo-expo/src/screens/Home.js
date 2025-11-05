import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, TextInput, StyleSheet, FlatList } from 'react-native';

export class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
        posteosRecuperados: [],
        loading: ''
      }
    }

  componentDidMount() {
    // para obtener los datos de una coleccion
    db.collection('posts').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            posteosRecuperados: posts,
            loading: false
          })
        })
      }
    )}

  render() {
    return (
      <View>
        <Text>Home</Text>
        <View style={styles1.flatlist}>
        <FlatList
            data={this.state.posteosRecuperados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <Text> {item.descripcion} </Text> }
            />
            </View>
      </View>

    )
  }
}

const styles1 = StyleSheet.create({
  flatlist: {
    width: '100%',
    flex: 1
  },
})

export default Home
