# Dip Club Amsterdam Style Guide
*Inspired by Wayo Adventure Travel Template*

## Design Philosophy
**Adventure meets wellness** | **Bold yet approachable** | **Image-forward storytelling** | **Clean and modern**

## Color Palette

### Primary Colors
- **Deep Teal**: `#2C5F5D` (primary brand, cold water depth)
- **Ice Blue**: `#4A90A4` (secondary, refreshing cold)
- **Warm Coral**: `#E8735C` (accent, warmth after cold)

### Neutral Colors
- **Charcoal**: `#2B2B2B` (headings, primary text)
- **Slate Gray**: `#5A5A5A` (body text)
- **Light Gray**: `#F8F9FA` (backgrounds, subtle sections)
- **White**: `#FFFFFF` (clean space)

### Functional Colors
- **Success Green**: `#4CAF50` (CTA hover states)
- **Alert Orange**: `#FF6B35` (urgency, limited spots)

## Typography

### Font Families
**Primary**: Inter or DM Sans (clean, modern sans-serif)
**Accent**: Playfair Display or Lora (elegant serif for emphasis words)

### Hierarchy
```
H1 (Hero): 56-72px, Bold, 110% line-height
H2 (Section): 40-48px, SemiBold, 120% line-height  
H3 (Cards): 24-32px, SemiBold, 130% line-height
Body Large: 18-20px, Regular, 160% line-height
Body: 16-18px, Regular, 170% line-height
Small: 14-16px, Regular, 150% line-height
```

### Type Styling
- Use **italic serif** for emphasis words ("stories", "journey", "tribe")
- UPPERCASE for small labels and categories
- Letter-spacing: 0.02em for uppercase text

## Grid System

### Layout Grid
- **Container Max Width**: 1320px
- **Columns**: 12-column grid
- **Gutter**: 24px (mobile), 32px (desktop)

### Breakpoints
```
Mobile: 375px - 767px
Tablet: 768px - 1023px  
Desktop: 1024px - 1439px
Large Desktop: 1440px+
```

### Spacing System (8px base)
```
XXS: 8px
XS: 16px
S: 24px
M: 32px
L: 48px
XL: 64px
XXL: 96px
XXXL: 128px
```

## Component Styles

### Buttons

**Primary CTA**
```css
Background: #2C5F5D
Color: #FFFFFF
Padding: 16px 32px
Border-radius: 8px
Font: 16px, SemiBold
Hover: Scale 1.02, darken 10%
Transition: all 0.3s ease
```

**Secondary CTA**
```css
Background: transparent
Border: 2px solid #2C5F5D
Color: #2C5F5D
Padding: 14px 30px
Border-radius: 8px
Hover: Fill with #2C5F5D, color white
```

### Cards (Package/Pillar Style)
```css
Background: #FFFFFF
Border-radius: 16px
Box-shadow: 0 4px 12px rgba(0,0,0,0.08)
Padding: 0 (image full-bleed)
Overflow: hidden
Hover: translateY(-8px), shadow 0 8px 24px rgba(0,0,0,0.12)
Transition: all 0.4s ease
```

**Card Image**
- Aspect ratio: 4:3
- Object-fit: cover
- Overlay gradient for text readability

**Card Content**
- Padding: 24px (mobile), 32px (desktop)
- Title: H3 style
- Description: Body style
- Meta info: Small style, #5A5A5A

### Navigation

**Desktop**
```css
Position: sticky, top: 0
Background: rgba(255,255,255,0.95)
Backdrop-filter: blur(10px)
Height: 80px
Border-bottom: 1px solid rgba(0,0,0,0.05)
```

**Mobile**
- Hamburger menu
- Full-screen overlay menu
- Large touch targets (48px minimum)

## Image Guidelines

### Hero Images
- **Dimensions**: 1920x1080px minimum
- **Style**: Wide landscape, group shots, authentic moments
- **Overlay**: Dark gradient (bottom to top) for text readability
- **Format**: WebP with JPG fallback

### Card Images  
- **Dimensions**: 600x450px minimum
- **Style**: Action shots, nature, ice baths, community
- **Treatment**: Slight desaturation, high contrast
- **Border-radius**: 16px (top corners only for cards)

### Photo Tone
- Natural lighting preferred
- Cold blue tones with warm highlights
- High energy, genuine expressions
- Avoid overly polished stock photos

## UI Patterns

### Section Layout
```
Padding: 96px 24px (mobile), 128px 48px (desktop)
Max-width: 1320px centered
Alternating backgrounds: white / light gray
```

### Text Overlays on Images
```css
Color: #FFFFFF
Text-shadow: 0 2px 8px rgba(0,0,0,0.3)
Background: linear-gradient(180deg, transparent, rgba(0,0,0,0.6))
```

### Testimonial Cards
```css
Background: #F8F9FA
Border-left: 4px solid #2C5F5D
Padding: 32px
Border-radius: 8px
Italic serif for quote
```

### Stats Display
```css
Large number: 48px Bold, #2C5F5D
Label: 14px Uppercase, #5A5A5A, letter-spacing 0.08em
Alignment: Center
```

## Animation & Interaction

### Scroll Animations
- Fade-in from bottom (20px translate)
- Duration: 0.6s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Stagger: 0.1s between elements

### Hover States
- Cards: lift + shadow
- Buttons: scale + color shift
- Links: underline slide-in
- Images: subtle zoom (1.05x)

## Voice & Tone

### Writing Style
- **Conversational**: "You'll feel like you're dying for 30 seconds"
- **Direct**: "Stop Thinking. Start Dipping."
- **Inclusive**: "All levels welcome"
- **Energetic**: Short sentences. Action verbs. Movement!
- **Honest**: Don't sugarcoat the discomfort

### Copy Patterns
- Questions engage: "Will you join us?"
- Numbers build credibility: "200+ Brave Souls"
- Action-oriented CTAs: "Join", "Take the Plunge", "Claim Your Spot"
- Community language: "we", "our tribe", "together"

## Accessibility

- Color contrast ratio: minimum 4.5:1 for text
- Focus states: 3px outline, high contrast
- Alt text for all images
- Semantic HTML structure
- Keyboard navigation support
- Touch targets: minimum 44x44px

## Do's and Don'ts

✅ **Do:**
- Use real photos of actual community members
- Maintain generous white space
- Keep CTAs above the fold
- Use card layouts for scannable content
- Emphasize community over individual

❌ **Don't:**
- Use generic stock photos
- Clutter sections with too much text
- Hide CTAs in footer
- Use more than 3 fonts
- Overpromise comfort - be honest about challenge