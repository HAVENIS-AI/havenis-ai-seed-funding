# Team Section Integration Guide

## Overview
Professional team section component showcasing HAVENIS AI's core team with CEO Danilo Kuss prominently featured.

## File Location
`src/components/TeamSection.tsx`

## Usage

### Import the Component
```tsx
import { TeamSection } from './components';
// or
import TeamSection from './components/TeamSection';
```

### Add to Your App
```tsx
// In App.tsx or your main page component
import TeamSection from './components/TeamSection';

export default function App() {
  return (
    <>
      {/* Other sections */}
      <UseOfFundsChart />
      <TeamSection />  {/* Add Team Section */}
      {/* Other sections */}
    </>
  );
}
```

## Features
✓ **Responsive Design** - Works on mobile, tablet, desktop
✓ **Dark Theme** - Matches HAVENIS AI branding
✓ **Gradient Effects** - Cyan & Blue gradient accents
✓ **CEO Featured** - Danilo Kuss prominently displayed
✓ **Hover Effects** - Professional interactive design
✓ **Team Management** - Easy to add/edit team members

## Customization

### Add Team Members
Edit the `teamMembers` array in `TeamSection.tsx`:

```tsx
const teamMembers: TeamMember[] = [
  {
    name: "New Member",
    role: "Position",
    description: "Brief bio...",
    image: "/images/member.jpg",  // Optional
    expertise: "Areas of expertise"
  },
  // ... more members
];
```

### Update Colors
Modify Tailwind classes:
- Primary Color: `cyan-400` / `cyan-500`
- Secondary Color: `blue-500`
- Background: `from-black via-gray-900 to-black`

### Update CTA Email
Change the email in the button:
```tsx
<a href="mailto:your-email@domain.com">
```

## Styling
- Uses Tailwind CSS
- Responsive grid (1 col → 3 cols)
- Glass-morphism effect
- Gradient text & backgrounds

## Deployment
- Automatically deployed via Vercel
- Changes to `main` branch trigger new deployment
- Component is production-ready

## Image Optimization
For team member photos:
1. Place images in `public/images/`
2. Update `image` property in component
3. Recommended size: 200x200px+
4. Format: JPG or PNG

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Readable color contrast
- Responsive text sizing

## Related Files
- App component
- Tailwind configuration
- Constants and theme settings

---
*Last updated: 2025-10-29*
