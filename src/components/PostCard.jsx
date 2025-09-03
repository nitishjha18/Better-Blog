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
        {/* <div className="relative aspect-[4/3] w-full rounded mb-4 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {tag && (
            <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded shadow-sm">
              {tag}
            </span>
          )}
        </div> */}<div className="relative aspect-[4/3] w-full rounded mb-4 overflow-hidden bg-gray-100">
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

      {isOwner && (
        <div className="mt-3 flex justify-center gap-3">
          <Link
            to={`/edit-post/${$id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete($id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;


// import React from "react";
// import { Link } from "react-router-dom";
// import appwriteService from "../appwriteSdk/config";

// function PostCard({
//   $id,
//   title,
//   subtitle,
//   featuredImages,
//   tag,
//   isOwner,     // boolean prop
//   onDelete,    // callback prop
// }) {
//   // Generate image URL
//   const getImageUrl = () => {
//     if (!featuredImages) return null;
//     try {
//       return appwriteService.getFileView(featuredImages);
//     } catch {
//       return null;
//     }
//   };
//   const imageUrl = getImageUrl();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-200 relative group">
//       <Link to={`/post/${$id}`} className="block focus:outline-none">
//         <div className="relative">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={title}
//               className="w-full h-40 object-cover rounded mb-4 transition-transform group-hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//           {tag && (
//             <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded shadow-sm">
//               {tag}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-700 transition-colors">
//           {title}
//         </h3>
//         {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
//       </Link>

//       {isOwner && (
//         <div className="mt-3 flex justify-center gap-3">
//           <Link
//             to={`/edit-post/${$id}`}
//             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={() => onDelete($id)}
//             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PostCard;

