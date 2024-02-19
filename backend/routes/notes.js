const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Get all notes using GET "/api/notes/fetchallnotes". Login required
router.get('/getallnotes', fetchuser, async (req, res)=>{
    try {
        
    const notes = await Notes.find({user: req.user.id});
    res.json(notes)

}catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error occured");
  }
})

// Add a new note using POST "/api/notes/addnote". Login required
router.post("/addnotes", fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description atleast be 5 char long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);

}catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error occured");
  }
})

// Update an exsisting note using PUT "/api/notes/updatenotes". Login required
router.put("/updatenotes/:id", fetchuser,
  async (req, res) => {
    try {
    const{title, description, tag} = req.body;
    //  Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //  Fine the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")}

      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
      res.json({note})
      
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error occured");
    }

})

// Delete an exsisting note using DELETE "/api/notes/deletenotes". Login required
router.delete("/deletenotes/:id", fetchuser,
  async (req, res) => {

    try {
    //  Fine the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")}

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({"Success": "Note has been delete", note: note})
      
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error occured");
    }

})

module.exports = router;