import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwriteSdk/config";

function PostCard({
  $id,
  title,
  subtitle,
  featuredImages,
  author,
  date,
  tag,
  isOwner,
  onDelete,
}) {
  // Generate image URL
  const getImageUrl = () => {
    if (!featuredImages) return null;
    try {
      return appwriteService.getFileView(featuredImages);
    } catch {
      return null;
    }
  };
  const imageUrl = getImageUrl();

  // Delete handler

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-200 relative group">
      <Link to={`/post/${$id}`} className="className=block focus:outline-none">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-40 object-cover rounded mb-4 transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {tag && (
            <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded shadow-sm">
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-700 transition-colors">
          <Link
            to={`/post/${$id}`}
            className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            {title}
          </Link>
        </h3>
        {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
      </Link>
    </div>
  );
}

export default PostCard;
