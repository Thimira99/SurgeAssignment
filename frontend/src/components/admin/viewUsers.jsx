import React, { useEffect, useState } from 'react';

import data from '../data.json';
import Navbar from './adminNavbar/navbar';
import view from './viewUsers.module.scss';

function ViewUsers() {

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const { id, firstName, lastName } = JSON.parse(localStorage.getItem('user'));

        setId(id);
        setFirstName(firstName);
        setLastName(lastName);
    }, [])

    return (
        <div>
            <Navbar firstName={firstName} />
            <div className={view.view_container}>
                <h1>View All Users</h1>
                <div className={view.table}>
                    <table class="table table-dark">
                        <thead class="dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">DateOfBirth</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Status</th>
                                <th scope="col">Password</th>
                                <th scope="col">AccontType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr>
                                    <th scope="row">{++index}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.status}</td>
                                    <td>{user.password}</td>
                                    <td>{user.accontType}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}

export default ViewUsers;