import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwriteSdk/config'
import authService from '../appwriteSdk/auth'
import { Query } from 'appwrite'

export default function YourPosts() {
  const [user, setUser] = useState(undefined)
  const [posts, setPosts] = useState([])

  // Get current user
  useEffect(() => {
    authService.getCurrentUser().then(setUser)
  }, [])

  // Fetch only the user's posts once we have their ID
  useEffect(() => {
    if (user) {
      appwriteService
        .getPosts([Query.equal('userId', user.$id)])
        .then((res) => {
          if (res && res.documents) {
            setPosts(res.documents)
          }
        })
    }
  }, [user])

  // Delete post from list after successful deletion
  const removePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.$id !== id))
  }

  if (user === undefined) return null

  return (
    <div className="w-full py-8 bg-white">
      <Container>
        <h1 className="text-4xl font-bold mb-6">Your Posts</h1>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImages={post.featuredImages}
                isOwner={true}   // Enables edit/delete controls
                onDelete={removePost} // Callback to update UI after delete
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}


// // src/Pages/YourPosts.jsx

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
//               />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   )
// }
