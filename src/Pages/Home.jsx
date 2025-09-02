import React, { useEffect, useState } from "react";
import appwriteService from "../appwriteSdk/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Change the condition check
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center justify-centerr">
        <Container>
          <div className="flex flex-wrap ">
            <div className="w-full py-8 mt-4 flex items-center justify-center min-h-[300px]">
              <h1 className="text-4xl font-bold text-center">
                <Link
                  to="/login"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Login
                </Link>
                {" or "}
                <Link
                  to="/signup"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Signup
                </Link>
                {" to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
