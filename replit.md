# Diroj Khanal Portfolio Website

## Overview

This is a personal portfolio website for Diroj Khanal, a Frontend Developer. The project is a static website built with vanilla HTML, CSS, and JavaScript, showcasing a modern, responsive design with interactive features. The site includes sections for home, about, projects, certificates, and contact information.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript without any framework dependencies
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Component-Based CSS**: Modular CSS architecture using BEM-like naming conventions
- **Interactive Elements**: Vanilla JavaScript for dynamic functionality

### Design System
- **CSS Custom Properties**: Centralized design tokens for colors, typography, spacing, and shadows
- **Typography**: Inter font family from Google Fonts for consistent text rendering
- **Icon System**: Font Awesome 6.0 for scalable vector icons
- **Color Palette**: Professional blue and gray color scheme with accent colors

## Key Components

### 1. Navigation System
- **Mobile-First Navigation**: Hamburger menu for mobile devices
- **Responsive Header**: Fixed header with smooth scrolling navigation
- **Active Link Highlighting**: Dynamic navigation state management

### 2. CSS Architecture
- **Design Tokens**: Comprehensive CSS custom properties system
- **Modular Styling**: Organized CSS with clear separation of concerns
- **Responsive Breakpoints**: Mobile-first responsive design approach

### 3. JavaScript Functionality
- **Mobile Menu Toggle**: Show/hide mobile navigation menu
- **Smooth Scrolling**: Navigation links with smooth scroll behavior
- **Interactive Elements**: Form handling and user interaction management

### 4. Content Sections
- **Hero Section**: Personal introduction and call-to-action
- **About Section**: Professional background and skills
- **Projects Portfolio**: Showcase of development work
- **Certificates**: Professional certifications display
- **Contact Form**: Direct communication interface

## Data Flow

### Client-Side Interactions
1. **Navigation**: User clicks navigation links → JavaScript handles smooth scrolling and menu state
2. **Mobile Menu**: User toggles mobile menu → JavaScript shows/hides navigation
3. **Form Submission**: User submits contact form → JavaScript handles form validation and submission
4. **Scroll Events**: User scrolls page → JavaScript updates active navigation states

### Content Management
- **Static Content**: All content is hardcoded in HTML
- **Styling**: CSS custom properties provide consistent theming
- **Assets**: External dependencies loaded via CDN (fonts, icons)

## External Dependencies

### CDN Dependencies
- **Google Fonts**: Inter font family for typography
- **Font Awesome**: Version 6.0 for icons and visual elements

### Third-Party Services
- **Font Hosting**: Google Fonts CDN for web font delivery
- **Icon Library**: Font Awesome CDN for scalable vector icons

## Deployment Strategy

### Static Hosting
- **Deployment Type**: Static website hosting (suitable for Netlify, Vercel, GitHub Pages)
- **Build Process**: No build step required - direct file serving
- **Asset Optimization**: Manual optimization of images and resources

### Performance Considerations
- **CDN Usage**: External resources loaded from CDNs for better performance
- **Minimal Dependencies**: Lightweight approach with no framework overhead
- **Responsive Images**: Optimized for different screen sizes

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Development Notes

### File Structure
- `index.html`: Main HTML structure and content
- `style.css`: Complete CSS styling with design system
- `script.js`: Interactive JavaScript functionality

### Key Features
- Mobile-responsive design with hamburger menu
- Smooth scrolling navigation
- Professional color scheme and typography
- Contact form with validation
- Back-to-top functionality
- Modern CSS with custom properties

### Expansion Opportunities
- Blog section integration
- Dynamic project loading
- Contact form backend integration
- Performance analytics
- SEO optimization enhancements