import Note from "../models/Note.js"

export async function getNotes(req, res){
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getting Notes controller");
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNoteById(req,res){
    try {
        console.log("Requested note ID:", req.params.id);
        const note = await Note.findById(req.params.id);
        if (!note) res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteByID controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function postNote(req,res){
    try {
        const {title,content}=req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully"});
    } catch (error) {
        console.error("Error in posting controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function putNote(req,res){
    try {
        const {title,content}=req.body;
        const updatedNode = await Note.findByIdAndUpdate(req.params.id,{title,content});
        if (!updatedNode) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note updated successfully"}); 
    } catch (error) {
        console.error("Error in putNote controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function delNote(req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        console.error("Error in delNote controller");
        res.status(500).json({message:"Internal server error"});
    }
}