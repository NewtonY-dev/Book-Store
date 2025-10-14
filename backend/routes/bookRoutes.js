import express from "express";
import { connectToDatabase } from "../lib/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Authentication middleware
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET all books (protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [books] = await db.query("SELECT * FROM books");
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error });
  }
});

// POST add book (protected)
router.post("/add", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { title, description, price, cover } = req.body;
    await db.query(
      "INSERT INTO books (title, description, price, cover) VALUES (?, ?, ?, ?)",
      [title, description, price, cover]
    );
    return res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding book", error });
  }
});

// PUT update book (protected)
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const { title, description, price, cover } = req.body;
    await db.query(
      "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?",
      [title, description, price, cover, id]
    );
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error });
  }
});

// DELETE book (protected)
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    await db.query("DELETE FROM books WHERE id = ?", [id]);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
