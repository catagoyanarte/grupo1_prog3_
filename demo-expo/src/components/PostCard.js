import React, {Component} from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import firebase from 'firebase'
import { db, auth } from "../firebase/config"


export default class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeado: false,
      cantLikes: 0
    }
  }

  componentDidMount() {
     db.collection('posts')
      .doc(this.props.item.id)
      .onSnapshot(doc => {
        const data = doc.data()
        this.setState({
          cantLikes: data.likes.length,
          likeado: data.likes.includes(auth.currentUser.email)
        })
      }
      )
  }

  agregarLike() {
     db.collection('posts')
      .doc(this.props.item.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.email
        )
      })
      .then(() =>
        this.setState({
          likeado: true
        })
      )
  }

  sacarLike() {
     db.collection('posts')
      .doc(this.props.item.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        )
      })
      .then(() =>
        this.setState({
          likeado: false
        })
      )
  }

  render() {
  return (
    <View style={stylesPost.postCard}>
      <Text style={stylesPost.owner}>{this.props.item.data.owner} posteo hoy a las {new Date(this.props.item.data.createdAt).toLocaleTimeString()} </Text>
      <Text style={stylesPost.texto}> {this.props.item.data.descripcion} </Text>
      <View style={stylesPost.likesContainer}>
      {this.state.likeado ? (
      <Pressable onPress={() => this.sacarLike()}>
        <Text>❤️</Text>
      </Pressable>
    ) : (
      <Pressable onPress={() => this.agregarLike()}>
        <Text>❤️</Text>
      </Pressable>
    )}
    <Text>{this.state.cantLikes} 
      {this.state.cantLikes <= 1 ? 'Like' : 'Likes'}
    </Text>
    </View>
    { this.props.pantalla == 'Comentarios' ? null : 
      <Pressable style={stylesPost.button}
        onPress={() =>
          this.props.pantalla == "Profile" ?
            this.props.navigation.navigate('Home',{screen: 'Comentarios', params: { postId: this.props.item.id }})
          : 
            this.props.navigation.navigate('Comentarios', { postId: this.props.item.id })
        } >
        <Text style={stylesPost.buttonText}>Comentar</Text>
      </Pressable> }
    </View>
  )
}
}

const stylesPost = StyleSheet.create({
  postCard: {
    width: '92%',
    maxWidth: 740,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  owner: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 6,
    fontSize: 15
  },
  texto: {
    fontSize: 16,
    color: 'black',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#1E5AA7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  likesContainer: {
    marginBottom: 10,
  }
});
