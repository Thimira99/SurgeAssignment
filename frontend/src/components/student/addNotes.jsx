import React, { Component, useEffect, useState } from 'react';

//import axios
import axios from 'axios';

//import css
import styles from './addNotes.module.scss';

//import react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import image
import image from '../../images/monophy.gif'

//import Navbar
import Navbar from './studentNavbar/studentNavbar';
import { Link } from 'react-router-dom';

function AddNotes() {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        //get id and firstname from localstorage
        const { id, firstName } = JSON.parse(localStorage.getItem('user'));

        setId(id);
        setFirstName(firstName);

        //get notes by student id
        console.log(id)
        axios.get(`http://localhost:8000/api/notes/getByUserId/${id}`).then(res => {
            if (res.data.data.length === 0) {
                alert("You Dont Have Notes")
            } else {
                setNotes(res.data.data);
            }
        })
    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:8000/api/notes//deleteById/${id}`).then(res => {
            if (res.data.status === true) {
                alert("Successfullt Deleted");
                window.location.reload();
            }
        }).catch(err => {
            alert(err)
        })
    }

    return (
        <div >
            <Navbar firstName={firstName} />
            <h1>My Notes</h1>

            <Link to='/craeteNotes'>
                <button className='btn btn-primary'>Add Notes</button>
            </Link>


            <div className={styles.notes}>
                {notes.map((value) => (
                    <Card style={{ width: '15rem', display: "flex" }}>
                        <Card.Img variant="top" style={{ width: "250px", height: "200px" }} src={image} />
                        <Card.Body>
                            <Card.Title>{value.title}</Card.Title>
                            <Card.Text>{value.description}
                            </Card.Text>
                            <Link to={`/updateNotes/${value._id}`}><Button variant="primary">Update</Button></Link>

                            <Button style={{ marginLeft: "3rem" }} variant="danger" onClick={() => handleDelete(value._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default AddNotes;