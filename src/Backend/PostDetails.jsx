import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10 animate-pulse">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-center text-gray-500 mt-10">Post not found.</p>;
  }

  return (
    <div className="min-h-screen min-w-[82.3vw] bg-gradient-to-b from-gray-900 via-gray-800 to-black px-6 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/posts")}
          className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 
            text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition transform"
        >
          ← Back to Posts
        </button>

        {/* Post Card */}
        <article className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-72 object-cover rounded-xl mb-6 shadow-md"
            />
          )}

          <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-snug">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between text-gray-400 text-sm mb-6">
            <span>
              ✍ By <span className="font-medium text-white">{post.author?.username || "Unknown"}</span>
            </span>
            <span>📅 {formatDate(post.createdAt)}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full shadow"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{post.description}</p>

          
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default PostDetails;
