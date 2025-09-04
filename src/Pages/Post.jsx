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
    <div className="py-8 bg-white min-h-screen">
      <Container>
        <article className="prose prose-sm md:prose-lg max-w-none w-full bg-white p-4 sm:p-8 rounded-lg shadow hover:shadow-xl transition duration-200 relative">
          <header>
            <h1 className="responsive-heading mb-4">{post.title}</h1>
            {/* You could show author, date, etc. here */}
          </header>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </article>
        {isAuthor && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-blue-500" className="hover:shadow-xl w-full sm:w-auto transition duration-200">Edit</Button>
            </Link>
            <Button bgColor="bg-blue-500" className="hover:shadow-xl w-full sm:w-auto transition duration-200" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}
