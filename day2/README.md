# Modern Web Design - Day2 Project

A modern, responsive web design project built with HTML5, CSS3, and served with Deno 2.

## ✨ Features

- **Modern Design**: Gradient backgrounds, smooth animations, and professional styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Deno 2 Server**: Fast and secure development server
- **Professional Components**: Forms, alerts, cards, and navigation
- **Accessibility**: Semantic HTML and proper ARIA labels

## 📁 Project Structure

```
day2/
├── index.html      - Main landing page
├── index1.html     - Contact form page
├── index2.html     - TechBootcamp showcase
├── styles.css      - Main stylesheet
├── st.css          - Additional styles
├── sty.css         - Bootstrap styles
├── server.ts       - Deno server configuration
└── deno.json       - Deno configuration
```

## 🚀 Getting Started

### Prerequisites
- Deno 2.x installed ([Download](https://deno.land/))

### Installation

1. Navigate to the day2 directory:
```bash
cd day2
```

2. Start the development server:
```bash
deno task dev
```

Or run the production server:
```bash
deno task serve
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## 📄 Available Pages

- **Home** (`http://localhost:3000/`) - Main landing page with features overview
- **Contact Form** (`http://localhost:3000/index1.html`) - Modern contact form
- **TechBootcamp** (`http://localhost:3000/index2.html`) - Showcase page with alerts

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: #6366f1 (Indigo)
  - Secondary: #8b5cf6 (Purple)
  - Background: Light and professional

- **Animations**:
  - Smooth transitions on hover
  - Gradient text effects
  - Slide-in animations on page load

- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🛠️ Customization

### Changing Colors
Edit the `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Modifying Styles
All styles are organized and commented in `styles.css` for easy customization.

## 📱 Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to modify and improve this project!

---

**Built with ❤️ using Deno 2**
