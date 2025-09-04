import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById } from "../services/blogService";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { FiClock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);
        console.log("the blog data", blogData)
      } catch (error) {
        toast.error(error.message);
        navigate("/blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!blog) return (
    <div className="text-center py-20 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
      <button
        onClick={() => navigate("/blogs")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Blogs
      </button>
    </div>
  );

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <FiArrowLeft className="text-lg" />
        <span>Back to Blogs</span>
      </button>

      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-500" />
            <span>{blog.author.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-gray-500" />
            <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {blog.authorRole}
          </span>
        </div>
      </header>

      {/* Featured Image - Fixed with proper error handling */}
      <div className="mb-8 rounded-lg overflow-hidden bg-gray-100">
        {imageError ? (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        ) : (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-[400px] object-contain mx-auto"
            onError={() => setImageError(true)}
            loading="eager"
          />
        )}
      </div>

      {/* Blog Content - Stable rendering */}
      <article className="prose prose-lg max-w-none mx-auto">
        <div
          dangerouslySetInnerHTML={createMarkup(blog.body)}
          className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mt-8 [&>h2]:mb-4
                    [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-700 [&>h3]:mt-6 [&>h3]:mb-3
                    [&>p]:text-gray-700 [&>p]:mb-4 [&>p]:leading-relaxed
                    [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4
                    [&>table]:w-full [&>table]:my-6 [&>table]:border-collapse
                    [&>table>thead>tr]:border-b [&>table>thead>tr]:border-gray-200
                    [&>table>tbody>tr]:border-b [&>table>tbody>tr]:border-gray-100
                    [&>table>th]:px-4 [&>table>th]:py-3 [&>table>th]:text-left
                    [&>table>td]:px-4 [&>table>td]:py-3"
        />
      </article>

      {/* Social Sharing - Fixed positioning */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this post</h3>
        <div className="flex gap-4">
          <FacebookShareButton url={window.location.href} title={blog.title}>
            <FaFacebook size={24} className="text-blue-600 hover:text-blue-800 transition-colors" />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={blog.title}>
            <FaTwitter size={24} className="text-blue-400 hover:text-blue-600 transition-colors" />
          </TwitterShareButton>
          <PinterestShareButton url={window.location.href} media={blog.imageUrl} description={blog.title}>
            <FaPinterest size={24} className="text-red-600 hover:text-red-800 transition-colors" />
          </PinterestShareButton>
        </div>
      </div>

      {/* Author Bio - Stable layout */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={blog.author.avatar || "/default-avatar.jpg"}
                alt={blog.author.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-avatar.jpg";
                }}
              />
            </div>
          </div> */}
          <div>
            <h4 className="font-bold text-lg text-gray-900">{blog.author.fullName}</h4>
            <p className="text-gray-600 mb-2">{blog.authorRole}</p>
            {/* <p className="text-gray-700">
              {blog.author.bio || "Professional baker with years of experience in creating delicious desserts and sharing baking knowledge."}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple share button components to replace social media links
const FacebookShareButton = ({ url, title, children }) => (
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
  >
    {children}
  </a>
);

const TwitterShareButton = ({ url, title, children }) => (
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
  >
    {children}
  </a>
);

const PinterestShareButton = ({ url, media, description, children }) => (
  <a
    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(description)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
  >
    {children}
  </a>
);

export default BlogDetails;