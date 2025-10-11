import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
