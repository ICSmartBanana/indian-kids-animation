# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name:** `indian-kids-animation`
   - **Description:** "Professional 2D animation framework for Indian kids' educational content - Land Before Time style"
   - **Visibility:** Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands in your project directory:

```bash
cd indian-kids-animation

# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/indian-kids-animation.git

# Push the initial commit
git push -u origin main
```

## Step 3: Verify Connection

```bash
# Check remote is set correctly
git remote -v

# You should see:
# origin  https://github.com/YOUR_USERNAME/indian-kids-animation.git (fetch)
# origin  https://github.com/YOUR_USERNAME/indian-kids-animation.git (push)
```

## Step 4: Set Up GitHub Authentication

### Option A: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Indian Kids Animation Project"
4. Select scopes:
   - ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)
7. When pushing, use the token as your password

### Option B: SSH Key

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Add this key to GitHub:
# GitHub Settings → SSH and GPG keys → New SSH key
```

Then change remote to use SSH:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/indian-kids-animation.git
```

## Daily Workflow

### Making Changes

```bash
# 1. Make changes to your files

# 2. Check what changed
git status

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "Add parallax background system"

# 5. Push to GitHub
git push
```

### Good Commit Message Examples

```bash
# Feature additions
git commit -m "Add character rigging system with bone animations"
git commit -m "Implement lip sync with phoneme mapping"

# Bug fixes
git commit -m "Fix character depth sorting in scenes"
git commit -m "Resolve animation timing issues"

# Improvements
git commit -m "Improve walk cycle smoothness with better easing"
git commit -m "Optimize background layer rendering performance"

# Documentation
git commit -m "Update style guide with color palette examples"
git commit -m "Add character design tutorial"
```

## Branch Strategy

### Main Branch
- Keep `main` branch stable and working
- Only push tested, working code to main

### Feature Branches (Recommended for larger features)

```bash
# Create a new branch for a feature
git checkout -b feature/character-expressions

# Work on the feature...
git add .
git commit -m "Add facial expression system"

# Push the branch
git push -u origin feature/character-expressions

# When ready, merge back to main
git checkout main
git merge feature/character-expressions
git push
```

### Common Branches

- `main` - Production-ready code
- `develop` - Development work
- `feature/character-rigging` - New character system
- `feature/backgrounds` - Background improvements
- `feature/audio-sync` - Audio integration
- `bugfix/scene-transitions` - Fix bugs

## Collaboration

### If working with others:

```bash
# Before starting work, get latest changes
git pull

# After making changes
git add .
git commit -m "Your changes"
git push
```

### Handling Conflicts

If someone else pushed changes:
```bash
git pull
# If conflicts, edit files to resolve
git add .
git commit -m "Resolve merge conflicts"
git push
```

## Useful Git Commands

```bash
# View commit history
git log --oneline --graph

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.ts

# See what changed in a file
git diff filename.ts

# Create a tag for versions
git tag -a v1.0.0 -m "First working version"
git push --tags
```

## .gitignore Already Set Up

The following are already ignored:
- `node_modules/` - Dependencies (don't commit)
- `.env` - API keys and secrets (**never commit**)
- `/out` - Rendered videos (optional)
- IDE files (.vscode, .idea)

## Important: Protecting Secrets

**NEVER commit:**
- API keys (Claude API, ElevenLabs, etc.)
- Passwords or tokens
- Private configuration files

Keep these in `.env` file:
```bash
# .env (this file is already in .gitignore)
ANTHROPIC_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
```

## GitHub Repository Settings (Recommended)

Once repo is created:

1. **Add description and topics:**
   - Topics: `animation`, `remotion`, `2d-animation`, `kids-content`, `indian-culture`, `typescript`, `react`

2. **Enable Issues** for tracking:
   - Create issues for features needed
   - Track bugs
   - Plan improvements

3. **Add README badges** (optional but looks professional):
   ```markdown
   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
   ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
   ![Remotion](https://img.shields.io/badge/Remotion-00B4D8?logo=video&logoColor=white)
   ```

## Next Steps After GitHub Setup

1. ✅ Repository created and connected
2. ⏭️ Set up professional character rigging system
3. ⏭️ Build parallax background layers
4. ⏭️ Implement animation principles
5. ⏭️ Create first Land Before Time quality scene

## Quick Reference Card

```bash
# Daily workflow
git pull                           # Get latest changes
# ... make changes ...
git add .                          # Stage all changes
git commit -m "Description"        # Commit with message
git push                           # Upload to GitHub

# Create feature branch
git checkout -b feature/name       # Create and switch to branch
# ... work on feature ...
git checkout main                  # Switch back to main
git merge feature/name             # Merge feature into main

# Emergency undo
git reset --hard HEAD              # Discard ALL local changes (careful!)
git revert HEAD                    # Undo last commit (safer)
```

---

**You're now ready to start building professional animations and tracking everything in GitHub!**
