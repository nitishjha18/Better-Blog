import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
            className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
          >
            Home
          </Link>

          {/* Authenticated user's links & Logout */}
          {authStatus && (
            <>
              <Link 
                to="/your-posts"
                className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
              >
                Your Posts
              </Link>
              <Link 
                to="/add-post"
                className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
              >
                Add Post
              </Link>
              <LogoutBtn className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-red-100 hover:text-red-600 transition-all duration-200 shadow-md cursor-pointer" />
            </>
          )}

          {/* Login/Signup for unauthenticated users */}
          {!authStatus && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  </header>
)




//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='flex items-center justify-between'>
//             <Link to='/' className='flex-shrink-0'>
//              <img src={logo} alt="Logo" className="h-12 w-auto" />
//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

}
export default Header