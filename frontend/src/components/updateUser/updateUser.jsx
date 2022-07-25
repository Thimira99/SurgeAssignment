import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import createStyles from './updateUser.module.scss';


function UpdateUser() {

    const history = useHistory();

    //initializing Variables
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [accountType, setAccountType] = useState('');

    //useEffect
    useEffect(() => {
        //set user Details from local Stirage
        const { id, firstName, lastName, email, dateOfBirth, mobile, password, status, accountType } = JSON.parse(localStorage.getItem('user'));

        //set Details to Variables
        setId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setDateOfBirth(dateOfBirth);
        setMobile(mobile);
        setPassword(password);
        setStatus(status);
        setAccountType(accountType);
    }, []);

    function handleFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleLastName(event) {
        setLastName(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handleDateOfBirth(event) {
        setDateOfBirth(event.target.value);
    }

    function handleMobile(event) {
        setMobile(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            id,
            firstName,
            lastName,
            email,
            dateOfBirth,
            mobile,
            password,
            status,
            accountType
        }

        console.log(data);
        axios.put("http://localhost:8000/api/users", data).then((res) => {
            if (res.data.status === true) {
                history.push('/login');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <div className={createStyles.form_container}>
                <form className={createStyles.form} onSubmit={handleSubmit} >
                    <h1>Update Account</h1>
                    <input
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        value={firstName}
                        onChange={handleFirstName}
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        onChange={handleLastName}
                        value={lastName}
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleEmail}
                        value={email}
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='date'
                        placeholder='Date Of Birth'
                        name='date'
                        onChange={handleDateOfBirth}
                        value={dateOfBirth}
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='text'
                        placeholder='Mobile Number'
                        name='mobile'
                        onChange={handleMobile}
                        value={mobile}
                        required
                        className={createStyles.input}
                    />
                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        onChange={handlePassword}
                        value={password}
                        required
                        className={createStyles.input}
                    />
                    <button type='submit' className={createStyles.greenBtn}>Create</button>
                </form>
            </div>

        </div>

    )
}

export default UpdateUser;