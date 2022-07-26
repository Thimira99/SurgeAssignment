import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

//import css
import styles from './adminNavbar.module.scss';

function Navbar({ firstName }) {

    const history = useHistory();

    //logout
    const logout = () => {
        localStorage.removeItem('user');
        history.push('/login')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id={styles.mainNav}>
            <a class="navbar-brand" href="#">Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav" id={styles.navbarNavAltMarkup}>
                    <a class="nav-item nav-link active" href="/getUsers">User List</a>
                    <a class="nav-item nav-link" href="/createUser">Create User</a>
                    <div className={styles.logout}>
                        <span class="nav-item nav-link">Hello {firstName}</span>
                        <button onClick={logout} className='btn btn-outline-danger' style={{ marginLeft: "1rem" }}>Logout</button>
                    </div>

                </div>
            </div>
        </nav >
    )
}

export default Navbar;