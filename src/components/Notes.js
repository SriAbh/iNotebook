import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext"; 
import NoteItems from "./NoteItems";
import Addnote from "./Addnote";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; 
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  let transfer = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()

    } else{
      transfer("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentnote) =>{
    ref.current.click()
    setnote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
  }


const handleClick = () => {
  editNote(note.id, note.etitle, note.edescription, note.etag)
  refClose.current.click()
  props.showAlert("Updated Successfully", "success");
}

const onChange = (e) =>{
  setnote({...note, [e.target.name]: e.target.value})
}


const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <>
    <Addnote showAlert = {props.showAlert}/>

    <Button variant="primary" onClick={handleShow} ref={ref} className="d-none">
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='container my-3'>
      <Form.Group className="mb-3" controlId="etitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" onChange={onChange} name='etitle' value={note.etitle} minLength={5} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="edescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={onChange} name='edescription' value={note.edescription} minLength={5} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="etag">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" placeholder="Tag" onChange={onChange} name='etag' value={note.etag} minLength={5} required />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" ref={refClose} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container mx-1">
      {notes.length===0 && "No Note to display"}
      </div>
      {notes.map((note) => {
        return <NoteItems key = {note._id} updateNote={updateNote} showAlert = {props.showAlert} note={note}/>
      })}
      </div>
    </>
  );
};

export default Notes;
