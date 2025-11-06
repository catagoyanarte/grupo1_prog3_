import React, { Component } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
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
    return (
      <View>
        {
          this.state.loadingUsuario && this.state.loadingPosteos ? <Text>Cargando</Text> :
            <View>
              <Text>Profile</Text>
              <Text>email: {this.state.usuario.owner}</Text>
              <Text>usuario: {this.state.usuario.username}</Text>
              <Pressable onPress={() => this.logout()}>
                <Text>Logout</Text>
              </Pressable>


              <FlatList
                data={this.state.posteos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => {
                  console.log(item)
                  return (
                    <View>
                      <Text>{item.item.data.owner}</Text>
                      <Text>{item.item.data.texto}</Text>
                      <Text>----------------</Text>
                    </View>
                  )
                }}
              />
            </View>
        }
      </View >
    )
  }
}


export default Profile





