function BookCard({
  book,
  editBook,
  deleteBook,
  toggleBookStatus,
  toggleFavorite,
}) {
  return (
    <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 mb-6">
      <h2 className="text-3xl text-[#3F342C] mb-4">
        {book.title}
      </h2>

      <p className="text-[#6B5B4D] mb-2">
        <span className="font-semibold text-[#8B6B4A]">
          Author:
        </span>{" "}
        {book.author}
      </p>

      <p className="text-[#6B5B4D] mb-2">
        <span className="font-semibold text-[#8B6B4A]">
          Genre:
        </span>{" "}
        {book.genre}
      </p>

      <p className="text-[#6B5B4D] leading-7 mt-4">
        {book.description}
      </p>

      <p className="text-[#6B5B4D] mt-4">
        <span className="font-semibold text-[#8B6B4A]">
          Status:
        </span>{" "}
        {book.status === "Available"
          ? "✅ Available"
          : "❌ Borrowed"}
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        {/* Favorite */}
        <button
          onClick={() => toggleFavorite(book._id)}
          className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-medium shadow-sm ${
            book.favorite
              ? "bg-[#8B6B4A] text-white hover:bg-[#75563A]"
              : "bg-[#EFE7DE] text-[#3F342C] hover:bg-[#E2D7CB]"
          }`}
        >
          {book.favorite ? "❤️ Favorite" : "🤍 Favorite"}
        </button>

        {/* Edit */}
        <button
          onClick={() => editBook(book)}
          className="bg-[#B08968] text-white px-5 py-2.5 rounded-xl hover:bg-[#9A7457] transition-all duration-300 shadow-sm"
        >
          ✏ Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => deleteBook(book._id)}
          className="border border-[#D8CFC6] bg-white text-[#6B5B4D] px-5 py-2.5 rounded-xl hover:bg-[#F7F3EF] transition-all duration-300 shadow-sm"
        >
          🗑 Delete
        </button>

        {/* Borrow / Return */}
        <button
          onClick={() => toggleBookStatus(book._id)}
          className={`px-5 py-2.5 rounded-xl text-white transition-all duration-300 shadow-sm ${
            book.status === "Available"
              ? "bg-[#8B6B4A] hover:bg-[#75563A]"
              : "bg-[#6F8A5E] hover:bg-[#5C734D]"
          }`}
        >
          {book.status === "Available"
            ? "📖 Borrow Book"
            : "↩ Return Book"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;