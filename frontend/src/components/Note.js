import React, { useEffect, useState } from 'react';
import axios from "axios";
import {BiEditAlt} from "react-icons/bi";
import {MdDelete} from "react-icons/md";

const Note = () => {

    const [notes, setNotes] = useState("");
    const [create, setCreate] = useState({
        title: "",
        body: ""
    });
    const [update, setUpdate] = useState({
        _id: null,
        title: "",
        body: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5001/api/notes");
            console.log(res.data);
            setNotes(res.data);
        }
        fetchData();
    }, []);

    const createNote = (e) => {
        const { name, value } = e.target;

        setCreate({
            ...create,
            [name]: value
        });
    };

    const noteSubmit = async (e) => {
        e.preventDefault();
        //create note
        const res = await axios.post("http://localhost:5001/api/notes", create);
        console.log(res.data);
        //update state
        setNotes([...notes, res.data]);
        //clear form state
        setCreate({ title: "", body: "" })
    }

    const deleteNote = async (_id) => {
        // Delete note
        await axios.delete(`http://localhost:5001/api/notes/${_id}`);
        // update state
        const newNote = [...notes].filter((note) => {
            return note._id !== _id
        })
        setNotes(newNote)
    }

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setUpdate({
            ...update,
            [name]: value,
        })
    };

    const toggleUpdate = (note) => {
        // Get Current Value
        setUpdate({ title: note.title, body: note.body, _id: note._id })
        //set state on update form
    }

    const updateSubmit = async (e) => {
        e.preventDefault();
        const { title, body } = update;
        // update
        const res = await axios.put(`http://localhost:5001/api/notes/${update._id}`, { title, body })
        //update state
        const newNote = [...notes];
        const noteIndex = notes.findIndex((note) => {
            return note._id === update._id;
        })
        newNote[noteIndex] = res.data;

        setNotes(newNote);

        //clear form
        setUpdate({
            _id: null,
            title: "",
            body: ""
        })
    }

    return (
        <>
            <header>
                <h2 className='heading'>Note App</h2>
                <form className='form' onSubmit={noteSubmit}>
                    <input type='text' className='name' value={create.title} name='title' onChange={createNote} placeholder='Enter Title...' />
                    <button type='submit'>Add Item</button>
                    <textarea type='text' className='email' value={create.body} name='body' onChange={createNote} placeholder='Enter Desc...' />
                </form>
            </header>
            {update._id &&
                <div className='updateData'>
                    <h2>Update Note</h2>
                    <form onSubmit={updateSubmit}>
                        <input type='text' value={update.title} name='title' onChange={handleUpdate} placeholder='Enter Title...' />
                        <button type='submit'>Update Note</button>
                        <textarea type='text' value={update.body} name='body' onChange={handleUpdate} placeholder='Enter desc...' />
                    </form>
                </div>
            }
            <ul className='container'>
                {notes && notes.map((note) => (
                    <div key={note._id} id={note._id} className='item'>
                        <h3 className='title'>{note.title}
                        <div>
                            <BiEditAlt className='icon' size={25} color='red' onClick={() => toggleUpdate(note)}/>
                            <MdDelete size={25} color='red' onClick={() => deleteNote(note._id)}/>
                            </div>
                        </h3>
                        <p className='desc'>{note.body}</p>
                    </div>
                ))}
            </ul>

        </>
    )
}

export default Note
