import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import noteContext from "../context/notes/noteContext";

const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;
  return (
    
    <div className='col-md-3'>
      <Card className='my-3'>
      <Card.Body>
        <div className="d-flex align-items-baseline">
        <Card.Title>{note.title}</Card.Title>
        <div className="float-right">
        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}} style={{cursor: "pointer"}} ></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}} style={{cursor: "pointer"}} ></i>
        </div>
        </div> 
        <Card.Text>
          {note.description}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>

  )
}

export default NoteItems
