# Better Blog - Where every story matters

A modern, full-featured blogging platform built with React and powered by Appwrite backend services. Better Blog enables users to create, publish, and share their stories with a vibrant community of writers and readers.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure sign-up and login system with Appwrite authentication
- **Rich Text Editor**: Powerful TinyMCE integration for creating formatted blog posts
- **Community Feed**: Browse and discover posts from the entire community
- **Personal Dashboard**: Manage your own posts with "Your Posts" section
- **Post Management**: Create, edit, and delete blog posts with ease
- **Image Uploads**: Featured image support for blog posts
- **Responsive Design**: Mobile-friendly interface that works across all devices

### User Experience
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates**: Dynamic content loading and state management
- **SEO-Friendly**: Slug-based URLs for better search engine optimization
- **Fast Performance**: Built with Vite for lightning-fast development and production builds

## 🚀 Live Demo
Visit the live application: [better-blog-six.vercel.app](https://better-blog-six.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing and navigation
- **Lucide React** - Beautiful, customizable icons

### State Management
- **Redux Toolkit** - Predictable state container for JavaScript apps
- **React Redux** - Official React bindings for Redux

### Rich Text Editor
- **TinyMCE** - Professional-grade WYSIWYG editor
- **HTML React Parser** - Convert HTML strings to React components

### Backend & Database
- **Appwrite** - Open-source backend-as-a-service platform
  - Authentication services
  - Database management
  - File storage and management

### Form Handling
- **React Hook Form** - Performant, flexible forms with easy validation

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS post-processing
- **Autoprefixer** - Automatic CSS vendor prefixing

## 📁 Project Structure

```
src/
├── Pages/           # Application pages/routes
│   ├── Home.jsx     # Community feed and landing page
│   ├── AddPost.jsx  # Create new blog posts
│   ├── EditPost.jsx # Edit existing posts
│   ├── Post.jsx     # Individual post view
│   ├── YourPosts.jsx# Personal post management
│   ├── Login.jsx    # User authentication
│   └── Signup.jsx   # User registration
├── components/      # Reusable UI components
│   ├── Header/      # Navigation and header components
│   ├── Footer/      # Footer components
│   ├── container/   # Layout containers
│   ├── post-form/   # Post creation/editing forms
│   ├── AuthLayout.jsx # Authentication wrapper
│   ├── Button.jsx   # Reusable button component
│   ├── Input.jsx    # Form input components
│   ├── Login.jsx    # Login form component
│   ├── PostCard.jsx # Post preview cards
│   ├── RTE.jsx      # Rich text editor component
│   ├── Select.jsx   # Dropdown select component
│   └── Signup.jsx   # Registration form component
├── appwriteSdk/     # Appwrite service integrations
│   ├── auth.js      # Authentication services
│   └── config.js    # Database and storage services
├── store/           # Redux store configuration
├── conf/            # Application configuration
├── assets/          # Static assets (images, icons)
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Appwrite account and project setup
- TinyMCE API key

### 1. Clone the Repository
```bash
git clone https://github.com/nitishjha18/Better-Blog.git
cd Better-Blog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your credentials:
```
VITE_APPWRITE_URL='your-appwrite-endpoint'
VITE_APPWRITE_PROJECT_ID='your-project-id'
VITE_APPWRITE_DATABASE_ID='your-database-id'
VITE_APPWRITE_COLLECTION_ID='your-collection-id'
VITE_APPWRITE_BUCKET_ID='your-storage-bucket-id'
VITE_TINYMCE_API_KEY='your-tinymce-api-key'
```

### 4. Appwrite Setup
- Create an Appwrite project
- Set up a database with appropriate collections for blog posts
- Configure storage bucket for image uploads
- Set up authentication providers
- Configure CORS settings for your domain

### 5. Start Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🌐 Deployment

The application is deployed on Vercel and can be easily deployed to other platforms:

### Vercel Deployment 
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch


## 👨‍💻 Author

**Nitish Jha**
- GitHub: [@nitishjha18](https://github.com/nitishjha18)
- Project Link: [https://github.com/nitishjha18/Better-Blog](https://github.com/nitishjha18/Better-Blog)


## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for providing excellent backend services
- [TinyMCE](https://www.tiny.cloud/) for the powerful rich text editor
- React and Vite communities for amazing developer tools
- [Tailwind CSS](https://tailwindcss.com/) for making styling effortless
- [Vercel](https://vercel.com/) for seamless deployment platform
