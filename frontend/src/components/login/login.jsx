import React, { Component, useEffect, useState } from 'react';

//import jwt decorder
import jwt from 'jwt-decode';

//import login style
import login from './login.module.scss';

//import axios
import axios from 'axios';

//import useHistory
import { useHistory } from 'react-router-dom';

//import toast msg
import { toastMsg } from '../toast';

function Login() {

    //use History
    const history = useHistory();

    //initializing variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get token
    useEffect(() => {
        //check if user exists
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            user.accountType === 'student' ? history.push('/addNote') : history.push('/getUsers');
        }
    }, () => { })

    //handle email onchange
    function handleEmail(event) {
        setEmail(event.target.value);
    }

    //handle password onchange
    function handlePassword(event) {
        setPassword(event.target.value);
    }

    //handle submit
    function handleSubmit(e) {
        e.preventDefault();

        //set email and password to data
        const data = {
            email,
            password
        };

        //login post
        axios.post("http://localhost:8000/api/users/login", data).then((res) => {

            toastMsg('Login success.');
            //set token to a variable
            const token = res.data.data;

            //store user token in localstorage
            localStorage.setItem('user', JSON.stringify(jwt(token)));
            localStorage.setItem('Token', token);

            const { status, accountType } = jwt(token);
            if (status === false) {
                history.push('/updateUser');
            } else {
                if (accountType === 'student') {
                    history.push("/addNote");
                } else {
                    history.push("/getUsers");
                }
            }
        }).catch(err => {
            //error handling
            if (err.response.data.status === false) {
                toastMsg(err.response.data.msg, 'error')
            }
        })
    }

    return (
        <div className={login.login_container}>
            <div className={login.loginform_container}>
                <div className={login.form_container}>
                    <form className={login.form} onSubmit={handleSubmit}>
                        <h1>LogIn</h1>
                        <input
                            type='text'
                            placeholder='Email'
                            name='email'
                            onChange={handleEmail}
                            required
                            className={login.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handlePassword}
                            required
                            className={login.input}
                        />
                        <button type='submit' className={login.greenBtn}>LogIn</button>
                    </form>
                </div>
            </div>
        </div >

    )
}

export default Login;