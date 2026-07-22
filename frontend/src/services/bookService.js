import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all books
export const getBooks = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data;
};

// Add a new book
export const addBook = async (book) => {
  const response = await axios.post(API_URL, book, getAuthConfig());
  return response.data;
};

// Update a book
export const updateBook = async (id, book) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    book,
    getAuthConfig()
  );
  return response.data;
};

// Delete a book
export const deleteBook = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
  return response.data;
};

// Toggle book status
export const toggleBookStatus = async (id) => {
  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    {},
    getAuthConfig()
  );
  return response.data;
};

// Toggle favorite
export const toggleFavorite = async (id) => {
  const response = await axios.patch(
    `${API_URL}/${id}/favorite`,
    {},
    getAuthConfig()
  );
  return response.data;
};