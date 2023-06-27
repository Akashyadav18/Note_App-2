const asyncHandler = require("express-async-handler");
const Note = require("../models/noteSchema")

const getAllData = asyncHandler (async (req, res) => {
    const note = await Note.find()
    res.status(200).send(note)
});

const createData = asyncHandler (async(req, res) => {
    const {title, body} = req.body;
    if(!title || !body){
        res.status(400);
        throw new Error("All Fields are mandatory...");
    }
    const note = await Note.create({
        title,
        body
    });
    res.status(201).json(note)
});

const getSingleData =asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(404);
        throw new Error("Note nOt Found...")
    }
    res.status(200).json(note)
});

const updateData = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(404);
        throw new Error("Note nOt Found...")
    }
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedNote)
});

const deleteData = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(404);
        throw new Error("Note not Found...")
    }
    const deletedNote = await Note.findByIdAndDelete(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(deletedNote)
});

module.exports = {getAllData, createData, getSingleData, updateData, deleteData}