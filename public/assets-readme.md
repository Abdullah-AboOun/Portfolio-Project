# Portfolio Assets Placeholder

This directory contains placeholder assets for the portfolio. Replace these with your actual assets:

## Required Assets

### Images
- **Profile/Avatar Images**: Replace `/api/placeholder/` URLs in components with actual images
- **Project Screenshots**: Add your project images and update the paths in `Projects.jsx`
- **Customer/Testimonial Photos**: Add real customer photos

### Documents
- **resume.pdf**: Add your actual resume file here

### Social Media
- **og-image.jpg**: Social media sharing image (1200x630px recommended)
- **favicon**: Update the favicon in the root directory

## Image Specifications

### Profile/Avatar Images
- **Header Avatar**: 350x350px (circular crop)
- **About Image**: 400x400px
- **Customer Testimonials**: 80x80px (circular crop)

### Project Images
- **Project Cards**: 400x250px (16:10 aspect ratio)
- **Project Details**: Multiple screenshots for carousel

### Social Media
- **Open Graph Image**: 1200x630px
- **Twitter Card**: 1200x675px

## Updating Image Paths

Replace the placeholder URLs in these components:
- `src/components/Header.jsx` - Avatar image
- `src/components/About.jsx` - About section image
- `src/components/Projects.jsx` - Project images array
- `src/components/Customers.jsx` - Customer photos

Example:
```javascript
<img src="/api/placeholder/350/350" alt="Profile" />

<img src="/images/profile.jpg" alt="Profile" />
```

## Resume

Add your resume as `public/resume.pdf` and update the download link in the About component if needed.
