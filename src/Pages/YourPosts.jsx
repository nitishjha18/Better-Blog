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
    <div className="w-full py-8 bg-white">
      <Container>
        <h1 className="text-4xl font-bold mb-6">Your Posts</h1>
        {posts.length === 0 ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center mt-8">
            <h2 className="text-lg font-semibold mb-4">No posts yet</h2>
            <Link
              to="/add-post"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-2"
            >
              Add Post
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {posts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <PostCard
                  $id={post.$id}
                  title={post.title}
                  featuredImages={post.featuredImages}
                  isOwner={true} // Enables edit/delete controls
                  onDelete={removePost} // Callback to update UI after delete
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}



// import React, { useState, useEffect } from 'react'
// import { Container, PostCard } from '../components'
// import appwriteService from '../appwriteSdk/config'
// import authService from '../appwriteSdk/auth'
// import { Query } from 'appwrite'

// export default function YourPosts() {
//   const [user, setUser] = useState(undefined)
//   const [posts, setPosts] = useState([])

//   // Get current user
//   useEffect(() => {
//     authService.getCurrentUser().then(setUser)
//   }, [])

//   // Fetch only the user's posts once we have their ID
//   useEffect(() => {
//     if (user) {
//       appwriteService
//         .getPosts([Query.equal('userId', user.$id)])
//         .then((res) => {
//           if (res && res.documents) {
//             setPosts(res.documents)
//           }
//         })
//     }
//   }, [user])

//   // Delete post from list after successful deletion
//   const removePost = (id) => {
//     setPosts((prevPosts) => prevPosts.filter(post => post.$id !== id))
//   }

//   if (user === undefined) return null

//   return (
//     <div className="w-full py-8 bg-white">
      
//       <Container>
//         <h1 className="text-4xl font-bold mb-6">Your Posts</h1>
//         <div className="flex flex-wrap -mx-2">
//           {posts.map((post) => (
//             <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
//               <PostCard
//                 $id={post.$id}
//                 title={post.title}
//                 featuredImages={post.featuredImages}
//                 isOwner={true}   // Enables edit/delete controls
//                 onDelete={removePost} // Callback to update UI after delete
//               />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   )
// }

