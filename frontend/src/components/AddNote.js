import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './addnote.css'

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/notes/${id}`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { title, description, category };

    if (id) {
      axios.put(`http://localhost:5000/notes/${id}`, note).then(() => navigate("/"));
    } else {
      axios.post("http://localhost:5000/notes", note).then(() => navigate("/"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit Note" : "Add Note"}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddNote;
