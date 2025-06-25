import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimit.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;    


app.use(cors({
    origin:["http://localhost:5173","http://127.0.0.1:5173"],
}));


app.use(express.json());

app.use(rateLimiter);


app.use("/api/notes",notesRoutes);


connectDB().then( ()=>{
    app.listen(PORT, () => {
    console.log("server started");
});
});


