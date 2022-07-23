import React, { Component } from 'react';
import login from './login.module.scss';


function Login() {

    return (
        <div className={login.login_container}>
            <div className={login.loginform_container}>
                <div className={login.form_container}>
                    <form className={login.form} >
                        <h1>Log In</h1>
                        <input
                            type='text'
                            placeholder='Student Email'
                            name='email'
                            required
                            className={login.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
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