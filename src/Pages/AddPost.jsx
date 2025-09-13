


import React from "react";
import PostForm from "../components/post-form/PostForm";

function AddPost() {
  return (
    <div className=" flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-2xl responsive-container mobile-container">
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
