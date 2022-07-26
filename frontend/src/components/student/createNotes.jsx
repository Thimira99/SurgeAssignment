import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toastMsg } from '../toast';

import addNote from './createNotes.module.scss';

function CreateNotes() {

    const history = useHistory();

    const [userId, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        //get id and firstname from localstorage
        const { id } = JSON.parse(localStorage.getItem('user'));

        setId(id);
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
            userId,
            title,
            description
        }

        axios.post("http://localhost:8000/api/notes/add", data).then(res => {
            if (res.data.status === true) {
                toastMsg("Note added Successfully")
                history.push('/addNote')
            }
        }).catch(({ response }) => {
            toastMsg(response.data.msg, 'error')

        })
    }

    return (
        <div>
            <div className={addNote.add_container}>
                <div className={addNote.addform_container}>
                    <div className={addNote.form_container}>
                        <form className={addNote.form} onSubmit={handleSubmit}>
                            <h1>Add Note</h1>
                            <input
                                type='text'
                                placeholder='Title'
                                name='title'
                                onChange={handleTitle}
                                required
                                className={addNote.input}
                            />
                            <label>Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                name="comment"
                                onChange={handleDescription}
                                className={addNote.input}
                                placeholder='Description'>

                            </textarea>
                            <button type='submit' className={addNote.greenBtn}>Create Note</button>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default CreateNotes;