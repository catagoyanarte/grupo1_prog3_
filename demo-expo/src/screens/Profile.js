import React, { Component } from 'react'
import { View, Text, Pressable, FlatList, StyleSheet  } from 'react-native'
import { auth, db } from '../firebase/config'
import PostCard from '../components/PostCard';

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: {},
      posteos: [],
      loadingUsuario: true,
      loadingPosteos: true
    }
  }


  componentDidMount() {
    console.log(auth.currentUser)
    db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(data => {
      data.forEach(doc => {
        this.setState({ usuario: doc.data(), loadingUsuario: false })
      })
    })


    db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt) //ordeno de mas nuevo a mas viejo
        console.log(posts)
        this.setState({
          posteos: posts,
          loadingPosteos: false
        })
      })
  }


  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate("Login"))
  }

  render() {
    if (this.state.loadingUsuario || this.state.loadingPosteos) {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi perfil</Text>
        <Text>Email: {this.state.usuario.owner}</Text>
        <Text>Usuario: {this.state.usuario.username}</Text>

        <Pressable onPress={() => this.logout()} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.subtitle}>Mis posteos:</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#E63946',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default Profile
