import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error while fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // accept id directly and update local state after successful delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/delete-book/${id}`);
      console.log("delete response:", res.data);
      // reload the browser upon successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting book:", error);
    }
  };

  return (
    <div>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            {book.cover && (
              <img src={book.cover} alt={book.title} width="300px" />
            )}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>Price: ${book.price}</span>
            <br />
            <br />
            <button>
              <Link to={`/update-book/${book.id}`}>Update</Link>
            </button>
            <br />
            <br />
            {/* changed: use a button and call handler on click (no Link) */}
            <button onClick={() => handleDelete(book.id)}>Delete</button>

            <hr />
          </div>
        ))}
      </div>
      <button>
        <Link to="/add-book">Add Book</Link>
      </button>
      {books.length === 0 && <p>No books available</p>}
    </div>
  );
};

export default Books;
// ...existing code...
