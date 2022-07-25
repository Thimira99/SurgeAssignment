import React, { Component, useEffect, useState } from 'react';

import Navbar from './studentNavbar/studentNavbar';

function AddNotes() {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const { id, firstName } = JSON.parse(localStorage.getItem('user'));

        setId(id);
        setFirstName(firstName);
    }, [])

    return (
        <div>
            <Navbar firstName={firstName} />
            <h1>My Notes</h1>
        </div>
    )
}

export default AddNotes;