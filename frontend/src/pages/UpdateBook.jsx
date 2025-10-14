import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  const Navigate = useNavigate();
  const { id } = useParams();

  // Update the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:4000/books/update/" + id, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Navigate("/");
    } catch (error) {
      console.log("error while updating a book", error);
    }
  };

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1>Update The Book</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
