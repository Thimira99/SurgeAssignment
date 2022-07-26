import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { toastMsg } from '../../toast';

//import css
import styles from './studentNavbar.module.scss';



function Navbar({ firstName }) {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('user');
        history.push('/login')
        toastMsg('Logged out successfully.', 'info');

    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id={styles.mainNav}>
            <span class="navbar-brand">Student</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" >
                <div class="navbar-nav" id={styles.navbarNavAltMarkup}>
                    <span class="nav-item nav-link active">Add Notes</span>
                    <div className={styles.logout}>
                        <span class="nav-item nav-link">Hello {firstName}</span>
                        <button onClick={logout} className='btn btn-outline-danger'>Logout</button>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;