# Netflix Clone - Complete Setup Guide

## Quick Start Guide

Follow these steps to get the Netflix clone running on your local machine.

### Step 1: Prerequisites Check

Make sure you have Node.js installed:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

If you don't have Node.js, download it from: https://nodejs.org/

### Step 2: Navigate to Project

```bash
cd netflix-clone
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- React Router DOM 6
- Tailwind CSS 3
- Vite 5
- All required dev dependencies

### Step 4: Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

### Step 6: Login

Use these exact credentials (case-sensitive):
- **Email**: `demo@netflix.com`
- **Password**: `123456`

Click "Sign In" and you'll be redirected to the home page!

---

## Available Scripts

### Development Mode
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).
Changes you make will automatically refresh the browser.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally to test before deployment.

---

## Project Overview

### What's Included

✅ **Login System**
- Hardcoded authentication
- Form validation
- Error messages
- Persistent login (localStorage)

✅ **Protected Routes**
- Auto-redirect if not logged in
- Auto-redirect to home if already logged in

✅ **Netflix-Style UI**
- Dark theme
- Smooth animations
- Responsive design

✅ **Featured Banner**
- Large hero section
- Play and More Info buttons
- Gradient overlays

✅ **Movie Rows**
- Horizontal scrolling
- 4 categories: Trending, Popular, Action, Comedy
- Hover effects on cards

✅ **Movie Modal**
- Click any movie to view details
- Close on backdrop click or close button
- Smooth animations

✅ **Navigation**
- Sticky navbar
- Transparent when at top, solid when scrolled
- Logout functionality

---

## File Structure Explained

```
netflix-clone/
│
├── public/                      # Static assets
│   └── netflix-icon.svg         # Favicon
│
├── src/                         # Source code
│   │
│   ├── components/              # Reusable components
│   │   ├── Banner.jsx           # Hero banner with featured movie
│   │   ├── MovieCard.jsx        # Individual movie card
│   │   ├── MovieModal.jsx       # Popup for movie details
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── ProtectedRoute.jsx   # Route wrapper for auth
│   │   └── Row.jsx              # Horizontal scroll movie row
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.jsx             # Main home page
│   │   └── Login.jsx            # Login page
│   │
│   ├── utils/                   # Utility functions and data
│   │   ├── auth.js              # Authentication logic
│   │   └── movieData.js         # Hardcoded movie data
│   │
│   ├── App.jsx                  # Main app with routing
│   ├── index.css                # Global styles + Tailwind
│   └── main.jsx                 # Entry point
│
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
└── README.md                    # Documentation
```

---

## How Authentication Works

### Login Flow
1. User enters email and password
2. Form validation checks if fields are filled
3. `login()` function in `auth.js` checks credentials
4. If valid: sets `netflix_auth: true` in localStorage
5. React Router redirects to `/home`
6. If invalid: shows error message

### Protected Routes
- `ProtectedRoute.jsx` wraps the Home page
- Checks `isAuthenticated()` before rendering
- If not authenticated: redirects to login (`/`)
- If authenticated: renders children (Home page)

### Logout Flow
1. User clicks "Logout" in Navbar
2. `logout()` removes `netflix_auth` from localStorage
3. React Router redirects to `/`

### Persistent Login
- Authentication state stored in localStorage
- Survives page refreshes
- Cleared only on logout or browser data clear

---

## Customization Guide

### Change Login Credentials

Edit `src/utils/auth.js`:
```javascript
const VALID_EMAIL = 'your-email@example.com';
const VALID_PASSWORD = 'your-password';
```

### Add More Movies

Edit `src/utils/movieData.js`:
```javascript
{
  id: 26,
  title: "Your Movie Title",
  image: "https://your-image-url.com",
  description: "Your movie description"
}
```

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  netflix: {
    red: '#E50914',        // Change Netflix red
    'red-dark': '#B20710',
    black: '#141414',      // Change background
    // ...
  }
}
```

### Modify Animations

Edit animation durations in components or `tailwind.config.js`:
```javascript
animation: {
  'fade-in': 'fadeIn 0.6s ease-in-out',  // Change duration
}
```

---

## Troubleshooting

### Problem: "Cannot find module..."
**Solution**: Run `npm install` to install all dependencies.

### Problem: Port 5173 already in use
**Solution**: Kill the process on that port or specify a different port:
```bash
npm run dev -- --port 3000
```

### Problem: Login not working
**Solution**: 
- Check credentials are exactly: `demo@netflix.com` and `123456`
- Both are case-sensitive
- Check browser console for errors

### Problem: Images not loading
**Solution**: 
- Check internet connection (images are from Unsplash)
- Replace image URLs in `movieData.js` with your own

### Problem: Page won't redirect after login
**Solution**:
- Clear localStorage: `localStorage.clear()` in browser console
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Problem: Styles not applying
**Solution**:
- Make sure Tailwind is properly configured
- Check that `index.css` is imported in `main.jsx`
- Try clearing browser cache

---

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Performance Tips

1. **Lazy Loading**: Images lazy load by default
2. **Code Splitting**: React Router handles route-based splitting
3. **Production Build**: Use `npm run build` for optimized bundle
4. **Caching**: Browser caches static assets automatically

---

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag the `dist` folder to Netlify's deploy page

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## FAQ

**Q: Is this connected to a real backend?**
A: No, all data is hardcoded. No API calls or database needed.

**Q: Can I add real video playback?**
A: You can integrate video players like React Player or Video.js.

**Q: Can I use real Netflix API?**
A: Netflix doesn't provide a public API. Use TMDB API for real movie data.

**Q: How do I add more user accounts?**
A: Currently supports one hardcoded account. You'd need to implement a user database or array for multiple accounts.

**Q: Can I modify this for commercial use?**
A: This is for educational purposes. Netflix and its branding are trademarked.

---

## Need Help?

If you encounter issues:
1. Check this guide carefully
2. Review the README.md
3. Check browser console for errors
4. Ensure all dependencies are installed
5. Try clearing localStorage and cache

---

## Next Steps

Once everything is running, you can:
- Explore the code to understand how it works
- Modify styles and colors to make it your own
- Add new features like search or filters
- Integrate with a real movie API (TMDB)
- Add video playback functionality
- Create user profiles
- Implement a real backend with authentication

Happy coding! 🎬
