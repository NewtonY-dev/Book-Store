import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("http://localhost:4000/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error while fetching books:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchBooks();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/books/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting book:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Books Library</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
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
