# Abdullah - Portfolio Website

A modern, responsive portfolio website built with React, showcasing projects, skills, and experience. Features smooth animations, dark/light theme toggle, and interactive components.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach, works flawlessly on all devices
- **Theme Toggle**: Light/Dark mode with localStorage persistence
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Interactive Elements**: Hover effects, modal dialogs, and carousels
- **Form Validation**: Real-time validation with regex patterns
- **Draft Saving**: Contact form drafts saved to localStorage

### Sections
1. **Header**: Typewriter effect with interactive avatar and parallax mouse effects
2. **Navbar**: Sticky navigation with scroll progress indicator and hide/show behavior
3. **About**: Expandable bio with statistics and resume download
4. **Skills**: Animated progress bars with tooltips and technology stack
5. **Education**: Timeline design with achievement highlights
6. **Experience**: Professional timeline with company links and tech stacks
7. **Projects**: Grid layout with modal details and image carousels
8. **Testimonials**: Customer testimonials with carousel functionality
9. **Contact**: Form with real-time validation and draft saving
10. **Footer**: Social links and quick navigation

### Technical Features
- **Scroll Progress**: Visual scroll progress indicator
- **Scroll to Top**: Floating button with circular progress
- **Section Detection**: Active navigation highlighting based on scroll position
- **Performance Optimized**: Lazy loading and optimized animations
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with Hooks and functional components
- **Vite**: Fast build tool and development server
- **Styled Components**: CSS-in-JS for component-scoped styling
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Beautiful icon library

### Styling & UI
- **CSS Grid & Flexbox**: Modern layout techniques
- **Google Fonts**: Inter font family for clean typography
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: CSS keyframes and transform animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdullah/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Development
The development server runs on `http://localhost:5173/` with hot module replacement for real-time updates.

### Customization

#### Personal Information
Update the following files with your information:
- `src/components/Header.jsx` - Name and job titles
- `src/components/About.jsx` - Bio and statistics
- `src/components/ContactUs.jsx` - Contact details
- `src/components/Footer.jsx` - Social links and contact info

#### Projects
Modify `src/components/Projects.jsx` to add your projects:
```javascript
const projectsData = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Short description",
    longDescription: "Detailed description",
    technologies: ["React", "Node.js"],
    github: "https://github.com/username/project",
    demo: "https://project-demo.com"
  }
];
```

#### Skills
Update `src/components/Skills.jsx` to reflect your skill levels:
```javascript
const skills = [
  { name: 'Your Skill', percentage: 90, icon: <FiCode /> }
];
```

#### Theme Colors
Customize colors in `src/styles/themes.js`:
```javascript
export const lightTheme = {
  colors: {
    primary: '#667eea',     
    secondary: '#f093fb',   
  }
  }
};
```

### Assets
- Replace placeholder images in the `public` folder
- Add your resume as `public/resume.pdf`
- Update favicon and social media images

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Hero section with typewriter
│   ├── Navbar.jsx      # Navigation with scroll progress
│   ├── About.jsx       # About section
│   ├── Skills.jsx      # Skills with progress bars
│   ├── Education.jsx   # Education timeline
│   ├── Experience.jsx  # Work experience timeline
│   ├── Projects.jsx    # Projects grid with modals
│   ├── Customers.jsx   # Testimonials carousel
│   ├── ContactUs.jsx   # Contact form
│   ├── Footer.jsx      # Footer with links
│   ├── ScrollToTopButton.jsx  # Floating scroll button
│   └── ThemeToggle.jsx # Theme switcher
├── styles/             # Styling
│   ├── GlobalStyles.js # Global styles
│   └── themes.js       # Light/dark themes
├── App.jsx            # Main app component
└── main.jsx          # Entry point
```

## 🎨 Customization Guide

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Modifying Animations
Animations use Framer Motion. Example:
```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content
</motion.div>
```

### Theme Customization
Add new theme properties in `src/styles/themes.js` and use them in styled-components:
```javascript
const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.yourNewColor};
`;
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel
1. Connect your repository to Vercel
2. Vercel automatically detects Vite configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/portfolio"`
3. Add deploy scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`
4. Deploy: `npm run deploy`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Framer Motion for smooth animations
- Styled Components for elegant styling solutions
- React Icons for beautiful icons
- Vite for fast development experience

## 📞 Contact

- **Email**: abdullah@example.com
- **LinkedIn**: [linkedin.com/in/abdullah](https://linkedin.com/in/abdullah)
- **GitHub**: [github.com/abdullah](https://github.com/abdullah)
- **Portfolio**: [abdullah-portfolio.com](https://abdullah-portfolio.com)

---

Made with ❤️ by Abdullah+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
