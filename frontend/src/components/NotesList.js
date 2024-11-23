import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './noteslist.css'

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/notes").then((res) => setNotes(res.data));
  }, []);

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div >
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/add">Add Note</Link>
      <div >
      <ul >
        {filteredNotes.map((note) => (
          <li key={note.id} className="notes-container">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <p>{note.category}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <Link to={`/edit/${note.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default NotesList;
