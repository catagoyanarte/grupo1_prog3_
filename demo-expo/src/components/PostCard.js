import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function PostCard({ item, navigation }) {

    return (
        <View style={stylesPost.postCard}>
            <Text style={stylesPost.owner}>{item.data.owner}</Text>
            <Text style={stylesPost.texto}> {item.data.descripcion} </Text>
            <Pressable style={stylesPost.button}
                  onPress={() => navigation.navigate('Comentarios', { postId: item.id })
                  } >
                  <Text style={stylesPost.buttonText}>Comentar</Text>
                </Pressable>
        </View>
    )
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
           fontSize: 15 },
    texto: { 
        fontSize: 16,
         color: 'black',
          marginBottom: 12 },
    button: {
      backgroundColor: '#1E5AA7',
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'stretch', 
    },
    buttonText: { 
        color: 'white',
         fontWeight: '700' },
  });
