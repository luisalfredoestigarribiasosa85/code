# Luis Estigarribia - Portfolio Website

A minimal, modern bilingual (EN/ES) portfolio website built with Next.js, React, Tailwind CSS, and shadcn/ui.

## Features

- **Bilingual Support**: Full English and Spanish translations with persistent language preference
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Design**: Optimized for all screen sizes (320px to 2560px+)
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance**: Lighthouse 90+ scores across all metrics
- **Modern Stack**: Next.js 16, React 19, Tailwind CSS v4, TypeScript

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── globals.css         # Global styles and Tailwind config
│   └── projects/
│       └── [slug]/
│           └── page.tsx    # Dynamic project case study pages
├── components/
│   ├── container.tsx       # Responsive container wrapper
│   ├── navigation.tsx      # Header with navigation
│   ├── footer.tsx          # Footer component
│   ├── hero-section.tsx    # Hero section
│   ├── projects-section.tsx # Projects grid
│   ├── about-section.tsx   # About section
│   ├── contact-section.tsx # Contact form
│   ├── project-detail-client.tsx # Project case study layout
│   ├── theme-toggle.tsx    # Dark mode toggle
│   ├── language-toggle.tsx # Language switcher
│   └── ui/                 # shadcn/ui components
├── contexts/
│   └── language-context.tsx # Language state management
├── lib/
│   ├── i18n.ts             # Translation dictionaries
│   ├── projects.ts         # Project data
│   ├── check-translations.ts # Translation parity checker
│   └── utils.ts            # Utility functions
└── scripts/
    └── check-translations.ts # CLI translation checker
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Check translation parity
npm run check-translations

# Build for production
npm run build
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Design System

### Layout & Spacing

- **Container**: Max-width of 72rem (1152px) with responsive padding
- **Vertical Rhythm**: Consistent spacing using `py-16 sm:py-20 lg:py-24`
- **Grid System**: Responsive 1/2/3 column grid for projects

### Typography

- **Fluid Scaling**: Uses CSS `clamp()` for responsive typography
  - H1: `clamp(1.75rem, 3vw, 2.5rem)`
  - H2: `clamp(1.5rem, 2.5vw, 2rem)`
- **Line Length**: Max-width of `prose` (~65ch) for optimal readability
- **Font**: Inter for sans-serif, Geist Mono for monospace

### Colors

- **Neutral Grayscale**: Primary color palette
- **Accent**: Blue (#3b82f6) for interactive elements
- **Dark Mode**: Automatic theme switching with proper contrast

### Components

- **Cards**: `rounded-2xl` with subtle shadows
- **Buttons**: Consistent sizing and hover states
- **Focus States**: Visible focus rings for accessibility

## Internationalization (i18n)

### Language Detection Priority

1. Saved preference in localStorage
2. Browser language detection
3. Default to English

### Translation Management

All translations are stored in `lib/i18n.ts` with full type safety. The translation parity checker ensures both English and Spanish have matching keys.

Run the checker:
\`\`\`bash
npm run check-translations
\`\`\`

### Adding New Translations

1. Add the key to both `en` and `es` objects in `lib/i18n.ts`
2. Run `npm run check-translations` to verify parity
3. Use the translation in components via `const { t } = useLanguage()`

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Semantic HTML with proper ARIA labels
- **Skip Links**: "Skip to content" link for keyboard users
- **Focus Management**: Visible focus indicators on all interactive elements
- **Color Contrast**: WCAG 2.1 AA compliant contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

## Performance Optimizations

- **Responsive Images**: Proper sizing and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: Next.js font optimization
- **Static Generation**: Pre-rendered pages for fast loading
- **Analytics**: Vercel Analytics for performance monitoring

## Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+
- **Ultra-wide**: 2560px+

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

© 2025 Luis Estigarribia. All rights reserved.
