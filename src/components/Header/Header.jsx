import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Home, FileText, Plus, LogOut, User } from 'lucide-react'
import logo from '../../assets/logo.png';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "YourPosts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-4 px-6">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img 
              src={logo} 
              alt="Better Blog Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Better Blog</span>
          </Link>

          {/* Center/Right: Navigation and Auth */}
          <div className="flex items-center space-x-4">
            {/* Home link - always visible */}
            <Link 
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>

            {/* Authenticated user's links & Logout */}
            {authStatus && (
              <>
                <Link 
                  to="/your-posts"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Your Posts
                </Link>
                <Link 
                  to="/add-post"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Post
                </Link>
                <LogoutBtn className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-red-100 hover:text-red-600 transition-all duration-200 shadow-md cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                </LogoutBtn>
              </>
            )}

            {/* Login/Signup for unauthenticated users */}
            {!authStatus && (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
