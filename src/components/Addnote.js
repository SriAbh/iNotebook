import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import noteContext from "../context/notes/noteContext"; 

const Addnote = (props) => {
    const context = useContext(noteContext);
  const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) =>{
        setnote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    
    <div className='container'>
      <h2 className='my-3'>This is Home</h2>
      <Form className='container my-3'>
      <Form.Group className="mb-3" controlId="title" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" onChange={onChange} value={note.title} name='title' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={onChange} value={note.description} name='description'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tag">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" placeholder="Tag" onChange={onChange} value={note.tag} name='tag'/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick}>
        Add Note
      </Button>
    </Form>

    </div>
    </>
  )
};

export default Addnote;
