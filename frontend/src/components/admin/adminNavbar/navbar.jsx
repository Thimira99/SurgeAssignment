import React, { Component } from 'react';



function Navbar({ firstName }) {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/getUsers">User List</a>
                    <a class="nav-item nav-link" href="/createUser">Create User</a>
                    <a style={{ marginLeft: "70rem" }} class="nav-item nav-link" href="#">Hello {firstName}</a>

                </div>
            </div>
        </nav >
    )
}

export default Navbar;