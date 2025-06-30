# Copilot Instructions for React Portfolio SPA

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React-based Single Page Application (SPA) for a personal portfolio with the following key characteristics:

### Technology Stack
- **Framework**: React 18 with Vite
- **Styling**: Styled Components for component-scoped styling
- **Animations**: Framer Motion for smooth animations and transitions
- **Icons**: React Icons library
- **Layout**: CSS Grid and Flexbox extensively used
- **Fonts**: Google Fonts integration
- **Theme**: Light/Dark mode toggle with LocalStorage persistence

### Component Architecture
The application follows a component-based architecture with these main components:
- Header (with typewriter effect and interactive avatar)
- Navbar (sticky with scroll progress indicator)
- About, Skills, Education, Experience, Projects, Customers, ContactUs
- Footer, ScrollToTopButton, ThemeToggle

### Key Features to Implement
1. **Responsive Design**: Mobile-first approach, works on all devices
2. **Animations**: Transform animations, CSS keyframes, scroll-triggered animations
3. **Interactive Elements**: Hover effects, modal dialogs, carousels
4. **Form Validation**: Real-time validation with regex patterns
5. **LocalStorage**: Theme preferences and form draft saving
6. **Smooth Scrolling**: Navigation between sections
7. **Progress Indicators**: Skill bars and scroll progress

### Coding Standards
- Use React Hooks (useState, useEffect, useRef) appropriately
- Implement proper prop passing and component composition
- Use styled-components for all styling needs
- Ensure accessibility with proper ARIA labels
- Optimize performance with React.memo where appropriate
- Follow modern ES6+ JavaScript practices
