import axios from 'axios';
import React, { useEffect, useState } from 'react';

//import bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';
import Popup from '../popup/popup';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import Navbar from './adminNavbar/navbar';
import { createHeader } from './createHeader';
import view from './viewUsers.module.scss';

function ViewUsers() {

    //popup variable
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

    //set first Name
    const [firstName, setFirstName] = useState('');

    //set user details
    const [data, setData] = useState([]);

    //initializing loading variablr
    const [loading, setLoading] = useState(true);

    //seraching
    const [search, setSearch] = useState('');

    const [pData, setPdata] = useState();

    useEffect(() => {
        const { firstName } = JSON.parse(localStorage.getItem('user'));

        setFirstName(firstName);

        const headers = createHeader();

        axios.get("http://localhost:8000/api/users/", headers).then(res => {
            setData(res.data.all);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })

        setOpenModal(false);

    }, [])

    function handlePopup(user) {
        setOpenModal(true);

        setPdata({ user });
    }



    return (
        <div>
            <Navbar firstName={firstName} />
            {!loading ? <div className={view.view_container}>
                <h1>View All Users</h1>
                <input type="text" placeholder='Search...' onChange={(event) => { setSearch(event.target.value) }} style={{ marginBottom: "1rem" }} />
                <div className={view.table}>
                    <table class="table table-light">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.filter(value => {
                                if (search === "") {
                                    return value;
                                } else if (value.firstName.toLowerCase().includes(search.toLowerCase())) {
                                    return value;
                                }
                                return null;
                            }).map((user, index) => (
                                <tr id={view.viewList} onClick={() => handlePopup(user)}>
                                    <th scope="row">{++index}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td style={{ color: "green" }}>{`${user.status}`}</td>

                                </tr>
                            ))}


                        </tbody>
                    </table>

                    {openModal && <Modal
                        show={openModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>First Name: {pData.user.firstName}</h5>
                            <h5>Last Name: {pData.user.lastName}</h5>
                            <h5>Email: {pData.user.email}</h5>
                            <h5>Date Of Birth: {pData.user.dateOfBirth}</h5>
                            <h5>Mobile: {pData.user.mobile}</h5>
                            <h5>Account Type: {pData.user.accountType}</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </div>

            </div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "100px" }}>
                <Spinner animation="border" variant="primary" />
            </div>}
        </div>

    )
}

export default ViewUsers;