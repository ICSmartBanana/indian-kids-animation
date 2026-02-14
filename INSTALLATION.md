# Installation & Getting Started

## Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- A code editor (VS Code recommended)
- Basic understanding of command line

Check your Node version:
```bash
node --version  # Should be 18.0.0 or higher
```

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd indian-kids-animation
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Remotion (video generation framework)
- React (UI components)
- TypeScript (type safety)
- All necessary dependencies

**First install may take 2-3 minutes**

### 3. Verify Installation

```bash
npm start
```

This should:
1. Start the Remotion Studio
2. Open your browser automatically to `http://localhost:3000`
3. Show the "Diwali Story" composition

**If browser doesn't open**, manually navigate to `http://localhost:3000`

## First Run - What You'll See

### Remotion Studio Interface

1. **Left Sidebar**: Composition selector
   - Shows "DiwaliStory" composition
   - Duration: ~50 seconds

2. **Center**: Video preview
   - Shows the current frame
   - Title card → 8 story scenes → End card

3. **Bottom Timeline**:
   - Scrub through the video
   - See scene boundaries
   - Adjust playback speed

4. **Right Panel**: Controls
   - Play/Pause
   - Render options
   - Settings

### Exploring the Story

**Try these actions:**

1. **Play the video**: Click the Play button or press Space
2. **Scrub timeline**: Drag the playhead to jump to any frame
3. **View individual scenes**: Look for scene numbers in top-right corner
4. **Check timing**: Each scene is 3-6 seconds long

## Project Structure Overview

```
indian-kids-animation/
├── src/
│   ├── index.ts              # Entry point - don't modify
│   ├── Root.tsx              # Registers compositions - rarely modify
│   ├── Video.tsx             # Main video with title/end cards
│   ├── Scene.tsx             # Scene renderer - modify for new backgrounds
│   ├── Character.tsx         # Character visuals - modify for new char types
│   ├── Decorations.tsx       # Diya, Rangoli, etc. - add new decorations here
│   └── story-config.ts       # ⭐ YOUR MAIN FILE - Edit stories here
├── public/
│   └── assets/               # Add images, audio here (if needed)
├── create-story.js           # CLI tool to generate new stories
├── package.json              # Dependencies
└── README.md                 # Full documentation
```

## Your First Customization

### Easy: Change the Story Text

1. Open `src/story-config.ts`
2. Find the `SCENES` array
3. Modify the `dialogue` or `narrator` text
4. Save the file
5. Remotion Studio will automatically refresh!

Example:
```typescript
{
  id: 1,
  // ... other properties
  dialogue: "Dadi, look at all these treats!", // Changed!
  narrator: "It was a beautiful Diwali evening.", // Changed!
}
```

### Medium: Adjust Character Positions

In `story-config.ts`, change character positions:

```typescript
characters: [
  { 
    name: "ravi", 
    position: { x: 40, y: 50 }, // Move character
    expression: "excited", 
    size: 100 
  }
]
```

- `x`: 0 (left) to 100 (right)
- `y`: 0 (top) to 100 (bottom)

### Advanced: Create a New Story

Use the CLI tool:

```bash
node create-story.js
```

Follow the prompts to create a new story configuration!

## Common Tasks

### Preview Your Video

```bash
npm start
```

### Render Video to MP4

```bash
# Default quality
npm run build

# High quality
npm run build -- --quality=90

# Custom output location
npm run build -- --output=/path/to/output.mp4
```

The rendered video will be saved in the `out/` folder.

### Check for Errors

If you see errors:

1. **Check Node version**: `node --version` (needs 18+)
2. **Reinstall dependencies**: 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. **Check TypeScript errors**: Look in the terminal output

## Performance Tips

### Preview Mode
- **Use preview quality**: Remotion Studio uses lower quality for faster preview
- **Scrub don't play**: Scrubbing is faster than playing through
- **Close other apps**: Video rendering is CPU-intensive

### Rendering
- **First render is slow**: Remotion needs to compile everything (~2-5 min)
- **Subsequent renders are faster**: Caching helps
- **Lower quality for testing**: Use `--quality=50` for quick tests

## Troubleshooting

### "Cannot find module 'remotion'"

```bash
npm install
```

### "Port 3000 already in use"

```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill

# On Windows:
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <PID> /F
```

### Video doesn't play in browser

- Try a different browser (Chrome recommended)
- Check browser console for errors (F12)
- Ensure you're on `http://localhost:3000` not `https://`

### Rendering fails

- Check available disk space (>2GB recommended)
- Close memory-intensive apps
- Try rendering a shorter segment first:
  ```bash
  npm run build -- --frames=0-90
  ```

## Next Steps

Now that you're set up:

1. ✅ You've successfully run the template
2. 📖 Read `QUICK_START.md` for creating your first story
3. 🎨 Explore `README.md` for customization options
4. 🚀 Check `FRAMEWORK_ARCHITECTURE.md` for scaling info

## Need Help?

- **Remotion Docs**: https://remotion.dev/docs
- **React Docs**: https://react.dev
- **TypeScript Handbook**: https://typescriptlang.org/docs

## Quick Reference Commands

```bash
# Preview
npm start

# Render video
npm run build

# Create new story (interactive)
node create-story.js

# Upgrade Remotion
npm run upgrade
```

---

**You're all set! 🎬**

Start by modifying `src/story-config.ts` to create your own stories about Indian culture for kids!
