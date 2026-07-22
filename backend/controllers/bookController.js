const Book = require("../models/Book");

// GET all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({
            user: req.user.id,
        });

        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// ADD a new book
const addBook = async (req, res) => {
    try {
        const book = await Book.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
// DELETE a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE a book
const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Toggle Book Status
const toggleBookStatus = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        book.status =
            book.status === "Available"
                ? "Borrowed"
                : "Available";

        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Toggle Favorite
const toggleFavorite = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        book.favorite = !book.favorite;

        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    toggleBookStatus,
    toggleFavorite,
};