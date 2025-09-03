

import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwriteSdk/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost



// import React, { useEffect, useState } from 'react';
// import { Container, PostForm } from '../components';
// import appwriteService from "../appwriteSdk/config";
// import { useNavigate, useParams } from 'react-router-dom';

// function EditPost() {
//   const [post, setPost] = useState(null);
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((fetchedPost) => {
//         if (fetchedPost) {
//           setPost(fetchedPost);
//         } else {
//           navigate('/');
//         }
//       });
//     } else {
//       navigate('/');
//     }
//   }, [slug, navigate]);

//   return post ? (
//     <div className='py-8'>
//       <Container>
//         {/* Ensure PostForm is receiving post.slug and uses it properly */}
//         <PostForm post={post} />
//       </Container>
//     </div>
//   ) : null;
// }

// export default EditPost;

