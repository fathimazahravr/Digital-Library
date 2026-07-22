const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    toggleBookStatus,
    toggleFavorite
} = require("../controllers/bookController");

router.get("/", protect, getBooks);

router.post("/", protect, addBook);

router.put("/:id", protect, updateBook);

router.delete("/:id", protect, deleteBook);

router.patch("/:id/status", protect, toggleBookStatus);

router.patch("/:id/favorite", protect, toggleFavorite);

module.exports = router;