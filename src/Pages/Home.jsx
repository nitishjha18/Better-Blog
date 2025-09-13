// src/Pages/Home.jsx

import React, { useEffect, useState } from "react";
import appwriteService from "../appwriteSdk/config.js";
import authService from "../appwriteSdk/auth.js";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { ArrowRight, Edit3, Users, Eye } from "react-feather";
import Button from "../components/Button";

function Home() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      appwriteService.getPosts().then((res) => {
        if (res && res.documents) setPosts(res.documents);
      });
    }
  }, [user]);

  if (user === undefined) return null;

  // LOGGED-OUT VIEW
  if (!user) {
    return (
      <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-50 responsive-container min-h-screen">
        {/* Hero */}
        <main className="py-14 px-4 sm:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="responsive-heading mb-6 font-bold leading-tight">
              Share Your Learnings with the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                World
              </span>
            </h1>
            <p className="responsive-text mb-10 text-gray-600">
              Create, publish, and share your thoughts with our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 py-3 border-2 bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 py-3 border-2 text-gray-800"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Features Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-blue-100 rounded-lg">
                  <Edit3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Rich Editor</h3>
                <p className="text-gray-600">
                  Write with our powerful editor featuring formatting tools and
                  image uploads.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Connect with fellow writers and readers in our vibrant
                  community.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-yellow-100 rounded-lg">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">
                  Track your post performance and engage with your audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-blue-100 px-4">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our community of writers and start sharing your stories
              today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <Link to="/login">
                <span className="text-blue-600 hover:underline font-medium text-lg">
                  Login
                </span>
              </Link>
              <span className="text-gray-500 hidden sm:block">or</span>
              <Link to="/signup">
                <span className="text-blue-600 hover:underline font-medium text-lg">
                  Sign up
                </span>
              </Link>
              <span className="text-gray-500 hidden sm:block">
                to read posts
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // LOGGED-IN VIEW
  return (
    <div className="w-full bg-white responsive-container min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="responsive-heading font-bold mb-6 leading-tight text-center sm:text-left">
          Community
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Feed
          </span>
        </h1>
        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImages={post.featuredImages}
              isOwner={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
