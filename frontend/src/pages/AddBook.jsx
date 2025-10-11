import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/add-book", book);
      Navigate("/");
    } catch (error) {
      console.log("error while adding books", error);
    }
  };

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="cover"
          name="cover"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
