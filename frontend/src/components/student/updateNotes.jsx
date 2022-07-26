import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//import bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';

import addNote from './createNotes.module.scss';
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
            {!loading ? <div className={addNote.add_container}>
                <div className={addNote.addform_container}>
                    <div className={addNote.form_container}>
                        <form className={addNote.form} onSubmit={handleSubmit}>
                            <h1>Update Note</h1>
                            <input
                                type='text'
                                placeholder='Title'
                                name='title'
                                value={title}
                                onChange={handleTitle}
                                required
                                className={addNote.input}
                            />
                            <label>Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                name="comment"
                                value={description}
                                onChange={handleDescription}
                                className={addNote.input}
                                placeholder='Description'>

                            </textarea>
                            <button type='submit' className={addNote.greenBtn}>Update</button>
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