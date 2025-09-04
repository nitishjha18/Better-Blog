import React from "react";
import PostForm from "../components/post-form/PostForm";

function AddPost() {
  return (
    <div className="py-8 flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-2xl mobile-container">
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
