import React from 'react'
import appwriteService from "../appwriteSdk/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImages}) {
    console.log("PostCard received featuredImages:", featuredImages); // Debug
    
    const getImageUrl = () => {
        if (!featuredImages || featuredImages === '' || featuredImages === 'null') {
            console.log("No valid image ID"); // Debug
            return null;
        }
        
        try {
            const url = appwriteService.getFileView(featuredImages);
                        // const url = appwriteService.getFilePreview(featuredImages);

            console.log("Image URL:", url); // Debug
            return url;
        } catch (error) {
            console.log("Error generating preview:", error);
            return null;
        }
    }

    const imageUrl = getImageUrl();

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt={title}
                            className='rounded-xl w-full h-48 object-cover'
                            onError={(e) => {
                                console.log("Image failed to load:", e.target.src);
                                e.target.style.display = 'none';
                            }}
                            onLoad={() => console.log("Image loaded successfully")}
                        />
                    ) : (
                        <div className='w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center'>
                            <span className="text-gray-500">No Image Available</span>
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
