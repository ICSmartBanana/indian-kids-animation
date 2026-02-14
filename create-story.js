#!/usr/bin/env node

/**
 * Story Generator CLI Tool
 * 
 * Usage: node create-story.js
 * 
 * This interactive CLI helps you create a new story configuration quickly.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

const BACKGROUNDS = [
  'home_living_room',
  'home_window_view',
  'neighbor_door',
  'home_living_room_diya'
];

const EXPRESSIONS = ['happy', 'excited', 'thinking', 'surprised', 'sad'];

const CHARACTER_TEMPLATES = {
  'boy': { name: 'Boy', color: '#FF6B35', type: 'Character' },
  'girl': { name: 'Girl', color: '#E91E63', type: 'Character' },
  'grandmother': { name: 'Dadi', color: '#9B59B6', type: 'GrandmotherCharacter' },
  'mother': { name: 'Mother', color: '#E74C3C', type: 'Character' },
  'father': { name: 'Father', color: '#3498DB', type: 'Character' },
  'friend': { name: 'Friend', color: '#2ECC71', type: 'Character' }
};

async function main() {
  console.log('\n🎬 Indian Kids Animation - Story Creator\n');
  console.log('This tool will help you create a new story configuration.\n');

  // Story metadata
  const title = await question('Story Title: ');
  const theme = await question('Theme (e.g., Diwali, School, Family): ');
  const moral = await question('Moral/Lesson: ');
  const sceneCount = parseInt(await question('Number of scenes (6-8 recommended): '));

  // Character selection
  console.log('\n📝 Available character templates:');
  Object.keys(CHARACTER_TEMPLATES).forEach((key, i) => {
    console.log(`  ${i + 1}. ${key}`);
  });
  
  const charCount = parseInt(await question('\nHow many main characters? (2-3 recommended): '));
  const characters = [];
  
  for (let i = 0; i < charCount; i++) {
    console.log(`\nCharacter ${i + 1}:`);
    const charType = await question('  Template (boy/girl/grandmother/mother/father/friend): ');
    const charName = await question('  Name: ');
    
    characters.push({
      id: `char_${charName.toLowerCase().replace(/\s/g, '_')}`,
      template: charType,
      name: charName,
      ...CHARACTER_TEMPLATES[charType]
    });
  }

  // Generate scenes
  const scenes = [];
  
  console.log('\n🎞️  Creating scenes...\n');
  
  for (let i = 0; i < sceneCount; i++) {
    console.log(`Scene ${i + 1}/${sceneCount}:`);
    
    const duration = parseInt(await question('  Duration in seconds (3-6): ')) || 4;
    
    console.log('  Available backgrounds:');
    BACKGROUNDS.forEach((bg, idx) => console.log(`    ${idx + 1}. ${bg}`));
    const bgIndex = parseInt(await question('  Background (1-4): ')) - 1;
    
    const narrator = await question('  Narrator text: ');
    const dialogue = await question('  Dialogue (or press Enter to skip): ');
    
    // Simple character placement
    const sceneChars = [];
    const charInScene = parseInt(await question(`  How many characters in this scene? (1-${characters.length}): `));
    
    for (let j = 0; j < charInScene; j++) {
      console.log(`\n  Character ${j + 1} in scene:`);
      characters.forEach((c, idx) => console.log(`    ${idx + 1}. ${c.name}`));
      const charIdx = parseInt(await question('  Select character: ')) - 1;
      
      console.log('  Expressions:', EXPRESSIONS.join(', '));
      const expression = await question('  Expression: ') || 'happy';
      
      // Auto-position based on count
      const positions = charInScene === 1 
        ? [[50, 50]]
        : charInScene === 2
        ? [[35, 50], [70, 50]]
        : [[25, 50], [50, 50], [75, 50]];
      
      sceneChars.push({
        name: characters[charIdx].id.replace('char_', ''),
        position: { x: positions[j][0], y: positions[j][1] },
        expression,
        size: 100
      });
    }
    
    scenes.push({
      id: i + 1,
      duration: duration * 30, // Convert to frames
      background: BACKGROUNDS[bgIndex],
      characters: sceneChars,
      dialogue: dialogue || undefined,
      narrator,
      action: `Scene ${i + 1} action`
    });
    
    console.log('  ✓ Scene created\n');
  }

  // Generate the TypeScript configuration
  const config = generateConfig(title, theme, moral, characters, scenes);
  
  // Save to file
  const filename = `${title.toLowerCase().replace(/\s/g, '-')}-config.ts`;
  const filepath = path.join(__dirname, 'src', filename);
  
  fs.writeFileSync(filepath, config);
  
  console.log(`\n✅ Story created successfully!`);
  console.log(`📄 Configuration saved to: src/${filename}`);
  console.log(`\nNext steps:`);
  console.log(`1. Review the generated file: src/${filename}`);
  console.log(`2. Update src/Video.tsx to import your new story`);
  console.log(`3. Run 'npm start' to preview`);
  console.log(`4. Adjust timing, positions, or text as needed\n`);
  
  rl.close();
}

function generateConfig(title, theme, moral, characters, scenes) {
  const charExports = characters.map(c => `  ${c.id}: {
    name: "${c.name}",
    description: "Character in the story",
    defaultOutfit: "traditional",
    color: "${c.color}"
  }`).join(',\n');

  const sceneExports = scenes.map(s => `  {
    id: ${s.id},
    duration: ${s.duration},
    background: "${s.background}",
    characters: [
${s.characters.map(c => `      { name: "${c.name}", position: { x: ${c.position.x}, y: ${c.position.y} }, expression: "${c.expression}", size: ${c.size} }`).join(',\n')}
    ],
    dialogue: ${s.dialogue ? `"${s.dialogue}"` : '""'},
    narrator: "${s.narrator}",
    action: "${s.action}"
  }`).join(',\n');

  return `// Generated Story Configuration
// Story: ${title}

import { Scene, Character } from './story-config';

export const STORY_CONFIG = {
  title: "${title}",
  theme: "${theme}",
  moral: "${moral}",
  duration: 120,
  fps: 30,
  language: "English"
};

export const CHARACTERS = {
${charExports}
};

export const SCENES: Scene[] = [
${sceneExports}
];

export const BACKGROUND_COLORS = {
  home_living_room: "#FFF8DC",
  home_window_view: "#E6F3FF",
  neighbor_door: "#FFE5CC",
  home_living_room_diya: "#FFF5E1"
};
`;
}

main().catch(console.error);
