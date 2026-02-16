# Netflix Clone - React + Vite + Tailwind CSS

A fully functional Netflix-inspired web application built with React, Vite, and Tailwind CSS. Features include authentication, movie browsing, and a sleek, responsive UI.

## 🎬 Features

- **Login System**: Hardcoded credentials authentication
  - Email: `demo@netflix.com`
  - Password: `123456`
- **Protected Routes**: Automatic redirect based on authentication status
- **Netflix-Style UI**: Dark theme with smooth animations
- **Hero Banner**: Featured movie with gradient overlays
- **Movie Categories**: Horizontal scrolling rows (Trending, Popular, Action, Comedy)
- **Interactive Movie Cards**: Hover effects and enlarge on hover
- **Movie Modal**: Click any movie to view details in a popup
- **Persistent Login**: localStorage keeps users logged in after refresh
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Fade-in, slide-up, and scale effects

## 📁 Project Structure

```
netflix-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── Banner.jsx          # Hero banner component
│   │   ├── MovieCard.jsx       # Individual movie card
│   │   ├── MovieModal.jsx      # Movie detail popup
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── ProtectedRoute.jsx  # Route protection wrapper
│   │   └── Row.jsx             # Movie row with horizontal scroll
│   ├── pages/
│   │   ├── Home.jsx            # Home page with all movies
│   │   └── Login.jsx           # Login page
│   ├── utils/
│   │   ├── auth.js             # Authentication utilities
│   │   └── movieData.js        # Hardcoded movie data
│   ├── App.jsx                 # Main app with routing
│   ├── index.css               # Global styles and Tailwind
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd netflix-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design Features

### Color Palette
- **Netflix Red**: `#E50914`
- **Netflix Red Dark**: `#B20710`
- **Background Black**: `#141414`
- **Light Black**: `#2F2F2F`
- **Gray**: `#808080`

### Fonts
- **Display**: Bebas Neue (Netflix logo style)
- **Body**: Inter (clean, modern)

### Animations
- Fade-in effects on page load
- Slide-up animations for content
- Scale animations for modals
- Hover effects on cards and buttons
- Smooth scroll navigation

## 🔐 Authentication

The app uses a simple hardcoded authentication system:

**Login Credentials:**
- Email: `demo@netflix.com`
- Password: `123456`

Authentication state is stored in localStorage, so users remain logged in after page refresh.

## 📱 Responsive Design

- **Mobile**: Optimized for small screens with touch-friendly elements
- **Tablet**: Adjusted spacing and layout
- **Desktop**: Full Netflix-style experience with all features

## 🎯 Key Components

### Login Page (`Login.jsx`)
- Full-screen dark background
- Centered login card
- Form validation
- Error handling
- Auto-redirect if already logged in

### Home Page (`Home.jsx`)
- Sticky navigation bar
- Hero banner section
- Multiple movie categories
- Movie modal integration

### Navbar (`Navbar.jsx`)
- Becomes solid on scroll
- Netflix logo
- Navigation links
- Profile and logout

### Banner (`Banner.jsx`)
- Featured movie display
- Play and More Info buttons
- Gradient overlays
- Responsive layout

### Row (`Row.jsx`)
- Horizontal scroll
- Navigation arrows (on hover)
- Multiple movie categories
- Smooth scrolling

### MovieCard (`MovieCard.jsx`)
- Hover enlarge effect
- Image lazy loading
- Gradient overlay on hover
- Click to open modal

### MovieModal (`MovieModal.jsx`)
- Full movie details
- Action buttons (Play, Add, Like)
- Close on backdrop click
- Smooth animations

## 🛠️ Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router DOM 6**: Client-side routing
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 📝 Notes

- All movie data is hardcoded in `src/utils/movieData.js`
- Images use Unsplash for demo purposes
- No backend or API calls required
- No database needed
- All state managed with React hooks
- localStorage for authentication persistence

## 🎭 Demo Credentials Reminder

Make sure to use these exact credentials to log in:
- **Email**: demo@netflix.com
- **Password**: 123456

Case-sensitive! Any other credentials will show "Invalid credentials" error.

## 🌟 Future Enhancements

Possible additions for future versions:
- Search functionality
- Filter by genre
- Video playback
- User profiles
- Continue watching section
- My List management
- Multi-language support

## 📄 License

This is a demo project for educational purposes. Netflix and its logo are trademarks of Netflix, Inc.

---

Built with ❤️ using React, Vite, and Tailwind CSS
