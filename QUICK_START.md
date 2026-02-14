# Quick Story Creation Guide

## Create Your First Story in 10 Minutes

### Step 1: Plan Your Story (2 minutes)

Answer these questions:
1. **What's the moral/lesson?** (e.g., "Honesty is important")
2. **What's the setting?** (Home, school, market, festival)
3. **Who are the characters?** (2-3 main characters)
4. **What happens?** (Beginning, middle, end in 3-4 sentences)

### Step 2: Open story-config.ts (1 minute)

```typescript
export const STORY_CONFIG = {
  title: "YOUR TITLE HERE",
  theme: "YOUR THEME",
  moral: "YOUR MORAL",
  duration: 120,
  fps: 30,
  language: "English"
};
```

### Step 3: Create 6-8 Scenes (5 minutes)

Use this template for each scene:

```typescript
{
  id: 1, // Scene number
  duration: 120, // 4 seconds (120 frames at 30fps)
  background: "home_living_room", // Choose from list below
  characters: [
    { 
      name: "ravi",           // Character name
      position: { x: 40, y: 50 }, // Left=0, Right=100, Top=0, Bottom=100
      expression: "happy",    // happy, excited, thinking, surprised
      size: 100              // 100 for kids, 110 for adults
    }
  ],
  dialogue: "What the character says",
  narrator: "What the narrator describes",
  action: "Brief action description (for your reference)"
}
```

### Available Backgrounds
- `home_living_room` - Indoor family scene
- `home_window_view` - Looking out window
- `neighbor_door` - At someone's door
- `home_living_room_diya` - Diwali decorated room

### Scene Duration Guide
- Short scene: 90-120 frames (3-4 seconds)
- Medium scene: 120-150 frames (4-5 seconds)
- Long scene: 150-180 frames (5-6 seconds)

### Step 4: Test It (2 minutes)

```bash
npm start
```

Watch your story in the preview!

## Example: "Arjun Helps His Mother"

```typescript
export const STORY_CONFIG = {
  title: "Arjun Helps His Mother",
  theme: "Helping at Home",
  moral: "Small acts of kindness make a big difference",
  duration: 120,
  fps: 30,
  language: "English"
};

export const SCENES: Scene[] = [
  {
    id: 1,
    duration: 120,
    background: "home_living_room",
    characters: [
      { name: "ravi", position: { x: 50, y: 50 }, expression: "thinking", size: 100 }
    ],
    dialogue: "Mama looks tired today...",
    narrator: "After school, Arjun noticed his mother was very tired.",
    action: "Arjun observes his mother"
  },
  {
    id: 2,
    duration: 150,
    background: "home_living_room",
    characters: [
      { name: "ravi", position: { x: 35, y: 50 }, expression: "excited", size: 100 },
      { name: "dadi", position: { x: 70, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "Mama, let me help you with dinner!",
    narrator: "Arjun had an idea!",
    action: "Arjun offers to help"
  },
  // Add 4-6 more scenes following the story arc
];
```

## Story Structure Template

### 8-Scene Story Arc

1. **Opening**: Introduce character and setting
2. **Problem/Situation**: Show what's happening
3. **Character's Thought**: Show them thinking
4. **Decision**: Character decides to act
5. **Action**: Character does something
6. **Result**: What happens
7. **Reaction**: How others respond
8. **Lesson**: Moral is reinforced

## Common Story Patterns

### Pattern 1: Problem Solving
1. Normal day → 2. Problem appears → 3. Character worries → 4. Gets idea → 
5. Tries solution → 6. Solution works → 7. Everyone happy → 8. Lesson learned

### Pattern 2: Sharing/Kindness
1. Character has something → 2. Sees someone in need → 3. Thinks about it → 
4. Decides to share → 5. Shares happily → 6. Recipient grateful → 
7. Character feels good → 8. Lesson about sharing

### Pattern 3: Overcoming Fear
1. Character faces challenge → 2. Feels scared → 3. Elder encourages → 
4. Tries despite fear → 5. Makes progress → 6. Succeeds → 
7. Celebrates → 8. Lesson about courage

## Character Position Guide

```
Screen Layout (x, y percentages):

Top Left (20, 30)        Top Center (50, 30)      Top Right (80, 30)

Middle Left (20, 50)     Center (50, 50)          Middle Right (80, 50)

Bottom Left (20, 70)     Bottom Center (50, 70)   Bottom Right (80, 70)
```

### Two Characters:
- Left: (35, 50), Right: (70, 50)
- Left: (30, 50), Right: (75, 50)

### Three Characters:
- Left: (25, 50), Center: (50, 50), Right: (75, 50)

## Quick Customization Checklist

- [ ] Changed story title
- [ ] Updated moral/theme
- [ ] Created 6-8 scenes
- [ ] Set character positions (not overlapping)
- [ ] Wrote narrator text for each scene
- [ ] Wrote dialogue for each scene
- [ ] Set appropriate expressions
- [ ] Tested duration (4-6 seconds per scene)
- [ ] Previewed with `npm start`
- [ ] Adjusted timing if needed

## Pro Tips

1. **Keep It Simple**: Start with 6 scenes, expand later
2. **Show Emotions**: Use character expressions to show feelings
3. **Clear Positions**: Don't overlap characters (keep 20% apart)
4. **Balanced Duration**: Most scenes 120-150 frames
5. **Test Early**: Preview after every 2-3 scenes
6. **Iterate**: Adjust text and timing based on preview

## Need Help?

### Common Issues

**Characters overlapping?**
→ Increase distance between x positions (minimum 20% apart)

**Scene too short/long?**
→ Adjust duration: 30 frames = 1 second at 30fps

**Text not visible?**
→ Check opacity timing in Scene.tsx (already configured)

**Want different background?**
→ Create new background in Scene.tsx or reuse existing ones

---

Now start creating! Your story will help teach values to children through engaging animation.
