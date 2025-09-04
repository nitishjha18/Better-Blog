import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwriteSdk/config';
import authService from '../appwriteSdk/auth';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';

export default function YourPosts() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      appwriteService
        .getPosts([Query.equal('userId', user.$id)])
        .then((res) => {
          if (res && res.documents) {
            setPosts(res.documents);
          }
        });
    }
  }, [user]);

  // Remove deleted post from UI
  const removePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== id));
  };

  if (user === undefined) return null;

  return (
    <div className="py-6 bg-white min-h-screen">
      <Container>
        <h1 className="responsive-heading text-center md:text-left font-bold mb-6">
          Your Posts
        </h1>
        {posts.length === 0 ? (
          <div className="max-w-xs sm:max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center mt-8">
            <h2 className="text-base sm:text-lg font-semibold mb-4">No posts yet</h2>
            <Link
              to="/add-post"
              className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-2 font-medium"
            >
              Add Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImages={post.featuredImages}
                isOwner={true} // Enables edit/delete controls
                onDelete={removePost} // Callback to update UI after delete
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
