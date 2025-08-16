import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Posts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      title: "First Post",
      excerpt: "This is a short description of the first post...",
      date: "2025-08-15",
    },
    {
      id: 2,
      title: "Second Post",
      excerpt: "This is a short description of the second post...",
      date: "2025-08-14",
    },
    {
      id: 3,
      title: "Third Post",
      excerpt: "This is a short description of the third post...",
      date: "2025-08-13",
    },
  ];

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Create Post Button */}
        <button
          onClick={() => navigate("/create-post")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Create Post
        </button>
      </div>

      {/* Posts Grid */}
      <div className="">
        {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{post.excerpt}</p>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      )}
      </div>
    </div>
  );
}

export default Posts