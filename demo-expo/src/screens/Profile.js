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
  }}


