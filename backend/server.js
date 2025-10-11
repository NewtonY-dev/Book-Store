import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.SERVER_PORT;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// check db connection
db.connect((err) => {
  if (err) {
    return console.error("Error connecting to the database:", err);
  }
  console.log("Connected to the MySQL database.");
});

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// select all books from db
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json("error while fetching books", err);
    }
    console.log("books fetched successfully");
    return res.status(200).json(data);
  });
});

// insert a book into db
app.post("/add-book", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json("error while adding book", err);
    }
    return res.status(200).json("book added successfully", data);
  });
});

// update a book
app.put("/update-book/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      return res.status(500).json("error while updating book", err);
    }
    return res.status(200).json("book updated successfully", data);
  });
});

// delete a book
app.delete("/delete-book/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.status(500).json("error while deleting book", err);
    }
    return res.status(200).json("book deleted successfully", data);
  });
});

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
