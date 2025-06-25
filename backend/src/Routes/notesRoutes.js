import express from "express";
import { delNote, getNoteById, getNotes, postNote, putNote } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", postNote);

router.put("/:id", putNote);

router.delete("/:id",delNote);


export default router;