import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimit.jsx';
import axios from "axios"
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard.jsx';
import api from "../lib/axios.js";
import NotesNotFound from '../components/NotesNotFound.jsx';
import { LoaderIcon } from 'lucide-react';

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response && error.response.status===429){
          setRateLimited(true);
        }else{
          toast.error("Failed to load notes");
        }
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[])

  return (
    <div className='min-h-screen flex flex-col'>
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6 flex-grow'>
        {loading && <div className=' flex py-10 items-center justify-center'> <LoaderIcon className='animate-spin size-10' />   Loading notes... </div>}

        {notes.length===0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - Made by Shaswot</p>
  </aside>
</footer>
    </div>
    
  )
}

export default HomePage;
