import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwriteSdk/config";

function PostCard({
  $id,
  title,
  subtitle,
  featuredImages,
  tag,
  isOwner,     // boolean prop
  onDelete,    // callback prop
}) {
  const getImageUrl = () => {
    if (!featuredImages) return null;
    try {
      return appwriteService.getFileView(featuredImages);
    } catch {
      return null;
    }
  };
  const imageUrl = getImageUrl();

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-200 relative group">
      <Link to={`/post/${$id}`} className="block focus:outline-none">
      <div className="relative aspect-[1/1] w-full rounded mb-4 overflow-hidden bg-gray-100">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt={title}
      className="object-contain w-full h-full transition-transform group-hover:scale-105"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
      No Image
    </div>
  )}
</div>

        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
      </Link>
    </div>
  );
}

export default PostCard;

