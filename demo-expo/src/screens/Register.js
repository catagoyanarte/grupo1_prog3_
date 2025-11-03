import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            error: ''
        }
    }

    submit(username, email, password){
        console.log('Creando usuario con los valores', { username, email, password })

        // Validaciones básicas
        if(username.length < 3){
            this.setState({ error: 'El nombre de usuario debe tener al menos 3 caracteres.' })
            return
        }
        if(!email.includes('@')){
            this.setState({ error: 'El email no es válido.' })
            return
        }
        if(password.length < 6){
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' })
            return
        }}}