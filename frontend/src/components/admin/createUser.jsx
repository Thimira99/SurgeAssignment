import React, { Component, useEffect, useState } from 'react';

import createStyles from './createUser.module.scss';

import Navbar from './adminNavbar/navbar';

function CreateUser() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    const [LfirstName, setLFirstName] = useState('');

    useEffect(() => {
        const { firstName } = JSON.parse(localStorage.getItem('user'));
        setLFirstName(firstName);
    }, [])

    return (
        <div>
            <Navbar firstName={LfirstName} />
            <div className={createStyles.form_container}>
                <form className={createStyles.form} >
                    <h1>Create Account</h1>
                    <input
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='date'
                        placeholder='Date Of Birth'
                        name='date'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='text'
                        placeholder='Mobile Number'
                        name='mobile'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='text'
                        placeholder='Account Type'
                        name='mobile'
                        required
                        className={createStyles.input}
                    />
                    <button type='submit' className={createStyles.greenBtn}>Create</button>
                </form>
            </div>

        </div>

    )
}

export default CreateUser;