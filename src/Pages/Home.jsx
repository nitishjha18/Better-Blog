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

  // Fetch current user on mount
  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  // Fetch all posts once logged in
  useEffect(() => {
    if (user) {
      appwriteService.getPosts().then((res) => {
        if (res && res.documents) setPosts(res.documents);
      });
    }
  }, [user]);

  // Loading user state
  if (user === undefined) return null;

  // Logged-out view: header + hero + features + CTA
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        {/* Hero */}
        <main className="py-20 px-6">
          <Container className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Share Your Stories with the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                World
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Create, publish, and share your thoughts with our community.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="px-6 py-4 border-2 bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-6 py-4 border-2 text-gray-800">
                  Sign In
                </Button>
              </Link>
            </div>
          </Container>
        </main>

        {/* Features Grid */}
        <section className="py-16 px-6">
          <Container className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-12">
              {/* Rich Editor */}
              <div className="flex-1 bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-blue-100 rounded-lg">
                  <Edit3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rich Editor</h3>
                <p className="text-gray-600">
                  Write with our powerful editor featuring formatting tools and image uploads.
                </p>
              </div>
              {/* Community */}
              <div className="flex-1 bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Connect with fellow writers and readers in our vibrant community.
                </p>
              </div>
              {/* Analytics */}
              <div className="flex-1 bg-white rounded-xl shadow hover:shadow-md transition text-center p-6">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center bg-yellow-100 rounded-lg">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">
                  Track your post performance and engage with your audience.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 px-6">
          <Container className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Writing?</h2>
            <p className="text-gray-600 mb-6">
              Join our community of writers and start sharing your stories today.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <span className="text-blue-600 hover:underline font-medium text-lg">Login</span>
              </Link>
              <span className="text-gray-500">or</span>
              <Link to="/signup">
                <span className="text-blue-600 hover:underline font-medium text-lg">Sign up</span>
              </Link>
              <span className="text-gray-500">to read posts</span>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  // Logged-in view: Community Feed
  return (
    <div className="min-h-screen bg-white py-8">
      <Container>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Community {" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Feed
          </span>
        </h1>

        {/* TODO: Add search / sort controls here */}

        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImages={post.featuredImages}
                isOwner={false} // Hide edit/delete buttons
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

