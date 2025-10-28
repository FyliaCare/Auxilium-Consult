# Logo Information

## Current Logo Location
The Auxilium Consult logo is currently located at:
`c:\Users\Jay Monty\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\TempState\5BA91A75EF8E503D9466E9B5701AD35D\WhatsApp Image 2025-10-25 at 11.06.40_f2a980f6.jpg`

## To Add Logo to Website

1. Copy the logo file to the `public` folder:
   - Recommended location: `public/logo.png` or `public/logo.svg`
   - Ensure the file is in a web-optimized format (PNG, SVG, or WebP)

2. Update the Header component (`src/components/Header.tsx`) to use the logo:
   ```tsx
   import Image from 'next/image'
   
   // In the Header component:
   <Image 
     src="/logo.png" 
     alt="Auxilium Consult Logo" 
     width={150} 
     height={60}
     priority
   />
   ```

3. Also consider adding the logo to:
   - Favicon: `public/favicon.ico`
   - App icons: `public/icon.png`, `public/apple-icon.png`
   - Open Graph image for social sharing: `public/og-image.png`

## Logo Design Notes
The logo features:
- An "AC" monogram with a distinctive design
- Navy blue (#002244 or similar) and light blue (#00A0DC or similar) colors
- "Auxilium Consults" text beneath the monogram
- Professional, corporate aesthetic suitable for business advisory firm

## Recommended Actions
- [ ] Copy logo file to `public/logo.png`
- [ ] Create favicon versions
- [ ] Update Header component
- [ ] Update metadata with logo for social sharing
- [ ] Test responsive display across devices
