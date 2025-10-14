import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
