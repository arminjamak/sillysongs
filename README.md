# Silly Songs Website

A fun, interactive website featuring a 3D rotating dinosaur and an audio player for "Attracted to Narcissists".

## Features

- 🦖 **Interactive 3D Dinosaur** - Rotatable 3D model with auto-rotation
- 🎵 **Audio Player** - Beautiful gradient play/pause button
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Clean Design** - White background with colorful accents

## Live Demo

Visit the live site: [Silly Songs](https://sillysongs.netlify.app) *(will be available after Netlify deployment)*

## Deployment

### Deploy to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select this repository
4. Netlify will auto-detect the settings from `netlify.toml`
5. Click "Deploy site"

The site will be automatically deployed and you'll get a URL!

### Manual Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/arminjamak/sillysongs.git
   cd sillysongs
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   python3 -m http.server 8080
   ```

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - 3D model viewer and audio player logic
- `dinosaur.glb` - 3D dinosaur model (70MB)
- `song.wav` - "Attracted to Narcissists" audio file
- `silly-songs-logo.png` - Top logo
- `armin-signature.png` - Bottom right signature
- `netlify.toml` - Netlify deployment configuration

## Technologies

- **Three.js** - 3D graphics library
- **HTML5 Audio** - Native audio playback
- **CSS3** - Modern styling with gradients and flexbox
- **Vanilla JavaScript** - No frameworks needed

## Credits

- Song: "Attracted to Narcissists" by Armin
- 3D Model: Dinosaur GLB model
