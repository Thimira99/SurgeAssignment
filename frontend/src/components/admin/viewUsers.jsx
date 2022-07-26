import axios from 'axios';
import React, { useEffect, useState } from 'react';

//import bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';

import Navbar from './adminNavbar/navbar';
import { createHeader } from './createHeader';
import view from './viewUsers.module.scss';

function ViewUsers() {

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');

    const [data, setData] = useState([]);

    //initializing loading variablr
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id, firstName } = JSON.parse(localStorage.getItem('user'));

        setId(id);
        setFirstName(firstName);

        const headers = createHeader();

        axios.get("http://localhost:8000/api/users/", headers).then(res => {
            setData(res.data.all);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })

    }, [])

    return (
        <div>
            <Navbar firstName={firstName} />
            {!loading ? <div className={view.view_container}>
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
                                    <td>{user.status.JSON}</td>
                                    <td>{user.accountType}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

            </div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "100px" }}>
                <Spinner animation="border" variant="primary" />
            </div>}

        </div>

    )
}

export default ViewUsers;