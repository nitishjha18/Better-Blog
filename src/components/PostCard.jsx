// PostCard.jsx - Version 1 (Null Check)
import React from 'react'
import appwriteService from "../appwriteSdk/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    // Safe image URL generation with null check
    const getImageUrl = () => {
        if (!featuredImage || featuredImage.trim() === '') {
            return null; // No image available
        }
        try {
            return appwriteService.getFilePreview(featuredImage);
        } catch (error) {
            console.log("Error getting image preview:", error);
            return null;
        }
    }

    const imageUrl = getImageUrl();

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                {/* Conditional image rendering */}
                {imageUrl ? (
                    <div className='w-full justify-center mb-4'>
                        <img 
                            src={imageUrl} 
                            alt={title}
                            className='rounded-xl w-full h-48 object-cover'
                        />
                    </div>
                ) : (
                    <div className='w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center'>
                        <span className='text-gray-500'>No Image</span>
                    </div>
                )}
                
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
