import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import Dashboard from "../components/Dashboard";

import {
  getBooks,
  addBook,
  updateBook,
  deleteBook as deleteBookService,
  toggleBookStatus as toggleBookStatusService,
  toggleFavorite as toggleFavoriteService,
} from "../services/bookService";

function Library() {
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [favoriteFilter, setFavoriteFilter] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchBooks();
}, []);

  // Dashboard values
  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) => book.status === "Available"
  ).length;

  const borrowedBooks = books.filter(
    (book) => book.status === "Borrowed"
  ).length;

  const favoriteBooks = books.filter(
    (book) => book.favorite
  ).length;

  const readingProgress =
    totalBooks === 0
      ? 0
      : Math.round((borrowedBooks / totalBooks) * 100);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBookService(id);
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // Borrow / Return
  const toggleBookStatus = async (id) => {
    try {
      const book = books.find((b) => b._id === id);

      await toggleBookStatusService(id);

      if (book.status === "Available") {
        toast.success("Book borrowed successfully!");
      } else {
        toast.success("Book returned successfully!");
      }

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // Favorite
  const toggleFavorite = async (id) => {
    try {
      const book = books.find((b) => b._id === id);

      await toggleFavoriteService(id);

      if (book.favorite) {
        toast.success("Removed from favorites.");
      } else {
        toast.success("Added to favorites!");
      }

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully!");

  navigate("/login");
};
  // Edit book
  const editBook = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
    });

    setEditingId(book._id);
    setIsEditing(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateBook(editingId, formData);
        toast.success("Book updated successfully!");

        setIsEditing(false);
        setEditingId(null);
      } else {
        await addBook(formData);
        toast.success("Book added successfully!");
      }

      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
      });

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5F2] to-[#EFE7DE] p-8">
     <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
  <div>
    <h1 className="text-5xl font-extrabold text-[#5A4634]">
      📚 Digital Library
    </h1>

    <p className="mt-3 text-lg text-gray-600">
      Welcome, <span className="font-semibold">{user?.name}</span> 👋
    </p>
  </div>

  <button
    onClick={logout}
    className="bg-[#8B6B4A] text-white px-5 py-3 rounded-xl hover:bg-[#75563A] transition shadow-md"
  >
    🚪 Logout
  </button>
</div>

      <Dashboard
        totalBooks={totalBooks}
        favoriteBooks={favoriteBooks}
        availableBooks={availableBooks}
        borrowedBooks={borrowedBooks}
        progress={readingProgress}
      />

      <BookForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      {/* Search, Filter & Sort Toolbar */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E5DDD5] rounded-xl px-4 py-3 bg-[#FCFAF8] focus:outline-none focus:ring-2 focus:ring-[#B08968] transition"
          />

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border border-[#E5DDD5] rounded-xl px-4 py-3 bg-[#FCFAF8] focus:outline-none focus:ring-2 focus:ring-[#B08968] transition"
          >
            <option>All</option>
            <option>Self Help</option>
            <option>Fantasy</option>
            <option>Programming</option>
            <option>Science</option>
            <option>Novel</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-[#E5DDD5] rounded-xl px-4 py-3 bg-[#FCFAF8] focus:outline-none focus:ring-2 focus:ring-[#B08968] transition"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Title (A-Z)</option>
            <option>Title (Z-A)</option>
          </select>

          <select
            value={favoriteFilter}
            onChange={(e) => setFavoriteFilter(e.target.value)}
            className="border border-[#E5DDD5] rounded-xl px-4 py-3 bg-[#FCFAF8] focus:outline-none focus:ring-2 focus:ring-[#B08968] transition"
          >
            <option value="All">📚 All Books</option>
            <option value="Favorites">❤️ Favorites Only</option>
          </select>
        </div>
      </div>

      {/* Books */}
      {books.length === 0 ? (
        <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📚</div>

          <h2 className="text-2xl text-[#3F342C] mb-2">
            Your library is empty
          </h2>

          <p className="text-[#6B5B4D]">
            Add your first book to start building your personal library.
          </p>
        </div>
      ) : (
        [...books]
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter(
            (book) =>
              genreFilter === "All" || book.genre === genreFilter
          )
          .filter(
            (book) =>
              favoriteFilter === "All" || book.favorite
          )
          .sort((a, b) => {
            switch (sortOption) {
              case "Newest":
                return new Date(b.createdAt) - new Date(a.createdAt);

              case "Oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);

              case "Title (A-Z)":
                return a.title.localeCompare(b.title);

              case "Title (Z-A)":
                return b.title.localeCompare(a.title);

              default:
                return 0;
            }
          })
        .map((book) => (
            <BookCard
              key={book._id}
              book={book}
              editBook={editBook}
              deleteBook={deleteBook}
              toggleBookStatus={toggleBookStatus}
              toggleFavorite={toggleFavorite}
            />
          ))
      )}
      <footer className="mt-12 text-center text-[#8B6B4A] text-sm">
        Digital Library © {new Date().getFullYear()} • Built with React, Node.js, Express & MongoDB
      </footer>
    </div>
  );
}

export default Library;