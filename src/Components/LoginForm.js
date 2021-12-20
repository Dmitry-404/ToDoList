import React, { Component } from 'react'
import {setCookie} from '../Connection/setCookie.js'
import {getToken} from './RegistrationForm.js'

var parent
export default class LoginForm extends Component {
    constructor(props){
        super(props)
        parent = props.parent 
    }
    render() {
        return (
            <div className="mb-3 LoginForm">
                <div className="bg-primary text-white card-header LoginFormName">
                    <h1>Вход</h1>
                </div>
                <div className="LoginFormForm">
                    <div className='authorizationForm'>
                        <input className='form-control userInput' id="login" placeholder="Введите логин"></input>
                        <input className='form-control userInput' type="password" id="password" placeholder="Введите пароль"></input>
                        <button className= 'formButton' onClick={login}>Войти</button>
                    </div>
                </div>   
            </div>
        )
    }
}

const token = '	3878ea14a5bf6b86ae22e12a360d981155d3e657'

function login(){
    let login = document.getElementById("login").value
    let password = document.getElementById("password").value
    if(login.length <= 0 || password.length <= 0){
        alert("Заполните все поля")
    }
    else{
        setCookie('token', token)
        getToken(login, password)
        .then(token =>{
            setCookie('token', token.token)
            setCookie('isLogined', 'true')
            parent.setState({logined: true})

        })
        .catch( err =>{
            alert("Неправильный логин или пароль!")
            document.getElementById("login").value = ''
            document.getElementById("password").value = ''
        })
    }
}
