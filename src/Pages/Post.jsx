import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwriteSdk/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImages);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-200 relative group">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
        {isAuthor && (
            <div className="flex gap-3 mt-4 justify-center ">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-blue-500" className="hover:shadow-xl transition duration-200">Edit</Button>
              </Link>
              <Button bgColor="bg-blue-500 " className="hover:shadow-xl transition duration-200" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          
      </Container>
      
    </div>
  ) : null;
}
