function Dashboard({
  totalBooks,
  favoriteBooks,
  availableBooks,
  borrowedBooks,
  progress,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

      {/* Total Books */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 text-center">
        <h2 className="text-lg text-[#8B6B4A] font-semibold">
          📚 Total Books
        </h2>

        <p className="text-4xl font-bold text-[#3F342C] mt-3">
          {totalBooks}
        </p>
      </div>

      {/* Favorites */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 text-center">
        <h2 className="text-lg text-[#8B6B4A] font-semibold">
          ❤️ Favorites
        </h2>

        <p className="text-4xl font-bold text-[#3F342C] mt-3">
          {favoriteBooks}
        </p>
      </div>

      {/* Available */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 text-center">
        <h2 className="text-lg text-[#8B6B4A] font-semibold">
          ✅ Available
        </h2>

        <p className="text-4xl font-bold text-[#3F342C] mt-3">
          {availableBooks}
        </p>
      </div>

      {/* Borrowed */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 text-center">
        <h2 className="text-lg text-[#8B6B4A] font-semibold">
          ❌ Borrowed
        </h2>

        <p className="text-4xl font-bold text-[#3F342C] mt-3">
          {borrowedBooks}
        </p>
      </div>

      {/* Reading Progress */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl shadow-sm p-6 text-center">
        <h2 className="text-lg text-[#8B6B4A] font-semibold">
          📖 Reading Progress
        </h2>

        <p className="text-4xl font-bold text-[#3F342C] mt-3">
          {progress}%
        </p>

        <div className="w-full bg-[#EFE7DE] rounded-full h-3 mt-4">
          <div
            className="bg-[#8B6B4A] h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;