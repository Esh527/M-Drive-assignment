import React, { useEffect, useState } from 'react';
import { api } from '../api';

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get('/notes').then((response) => setNotes(response.data));
  }, []);

  return (
    <div className="home-container">
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <span>Category: {note.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
