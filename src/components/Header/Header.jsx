import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Home, FileText, Plus, LogOut, User, Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nav items (main links)
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

  // Helper to render nav links
  const renderNavLinks = () => (
    <>
      {navItems.map(
        (item) =>
          item.active && (
            <Link
              key={item.slug}
              to={item.slug}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
              onClick={() => setIsMobileMenuOpen(false)} // close mobile menu on click
            >
              {item.name === 'Home' && <Home className="h-4 w-4 mr-2" />}
              {item.name === 'YourPosts' && <FileText className="h-4 w-4 mr-2" />}
              {item.name === 'Add Post' && <Plus className="h-4 w-4 mr-2" />}
              {item.name === 'Login' && <User className="h-4 w-4 mr-2" />}
              {item.name === 'Signup' && <Plus className="h-4 w-4 mr-2" />}
              {item.name}
            </Link>
          )
      )}
      {authStatus && (
        <LogoutBtn
          className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-red-100 hover:text-red-600 transition-all duration-200 shadow-md cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
        </LogoutBtn>
      )}
    </>
  );

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-4 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img
              src={logo}
              alt="Better Blog Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Scholar Circle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">{renderNavLinks()}</nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Sheet */}
        {isMobileMenuOpen && (
          <nav className="md:hidden px-4 pb-4 pt-2 space-y-2 flex flex-col bg-white border-t shadow-lg rounded-b z-40">
            {renderNavLinks()}
          </nav>
        )}
      </Container>
    </header>
  )
}

export default Header
