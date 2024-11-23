import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/add" element={<AddNote />} />
      <Route path="/edit/:id" element={<AddNote />} />
    </Routes>
  </Router>
);

export default App;
