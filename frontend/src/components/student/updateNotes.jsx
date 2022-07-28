import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//import bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';

import updateNote from './updateNotes.module.scss';
import { toastMsg } from '../toast';

function UpdateNotes() {

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/getById/${id}`).then(res => {
            setLoading(false);
            setTitle(res.data.data[0].title);
            setDescription(res.data.data[0].description);
        }).catch(err => {
            alert(err)
            setLoading(false);
        })


    }, [])


    function handleTitle(event) {
        setTitle(event.target.value);
    }

    function handleDescription(event) {
        setDescription(event.target.value);

    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            title,
            description
        }

        axios.put(`http://localhost:8000/api/notes//updateById/${id}`, data).then(res => {
            if (res.data.status === true) {
                history.push("/addNote");
                toastMsg('update successfully.');

            }
        }).catch(err => {
            toastMsg(err.response.data.msg, 'error');

        })
    }

    return (
        <div>
            {!loading ? <div className={updateNote.add_container}>
                <div className={updateNote.addform_container}>
                    <div className={updateNote.form_container}>
                        <form className={updateNote.form} onSubmit={handleSubmit}>
                            <h1>Update Note</h1>
                            <input
                                type='text'
                                placeholder='Title'
                                name='title'
                                value={title}
                                onChange={handleTitle}
                                required
                                className={updateNote.input}
                            />
                            <label>Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                name="comment"
                                value={description}
                                onChange={handleDescription}
                                className={updateNote.input}
                                placeholder='Description'>

                            </textarea>
                            <button type='submit' className={updateNote.greenBtn}>Update</button>
                        </form>
                    </div>
                </div>
            </div > : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>}

        </div>
    )
}

export default UpdateNotes;