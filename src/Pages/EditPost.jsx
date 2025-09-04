import React, { useEffect, useState } from 'react';
import { PostForm } from '../components';
import appwriteService from "../appwriteSdk/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-2xl mobile-container">
        <PostForm post={post} />
      </div>
    </div>
  ) : null;
}

export default EditPost;