// Story: "Ravi Shares His Diwali Sweets"
// Moral: Sharing brings joy to everyone

export interface Scene {
  id: number;
  duration: number; // in frames (30 fps)
  background: string;
  characters: Character[];
  dialogue: string;
  narrator: string;
  action: string;
}

export interface Character {
  name: string;
  position: { x: number; y: number };
  expression: 'happy' | 'sad' | 'excited' | 'thinking' | 'surprised';
  size: number;
}

export const STORY_CONFIG = {
  title: "Ravi Shares His Diwali Sweets",
  theme: "Diwali - Festival of Lights",
  moral: "Sharing brings happiness to everyone",
  duration: 120, // 2 minutes
  fps: 30,
  language: "English" // Can be extended to Hindi
};

export const CHARACTERS = {
  ravi: {
    name: "Ravi",
    age: 8,
    description: "Curious and kind boy",
    defaultOutfit: "kurta",
    color: "#FF6B35" // Orange kurta
  },
  dadi: {
    name: "Dadi",
    age: 65,
    description: "Loving grandmother",
    defaultOutfit: "saree",
    color: "#9B59B6" // Purple saree
  },
  neighbor: {
    name: "Mrs. Sharma",
    age: 40,
    description: "Friendly neighbor",
    defaultOutfit: "salwar",
    color: "#E74C3C" // Red salwar kameez
  }
};

export const SCENES: Scene[] = [
  {
    id: 1,
    duration: 120, // 4 seconds
    background: "home_living_room",
    characters: [
      { name: "ravi", position: { x: 30, y: 50 }, expression: "excited", size: 100 },
      { name: "dadi", position: { x: 70, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "Dadi, look! So many sweets for Diwali!",
    narrator: "It was Diwali evening. Ravi's grandmother had made delicious sweets.",
    action: "Ravi looks at a plate full of colorful Indian sweets"
  },
  {
    id: 2,
    duration: 120,
    background: "home_living_room",
    characters: [
      { name: "ravi", position: { x: 40, y: 50 }, expression: "thinking", size: 100 },
      { name: "dadi", position: { x: 65, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "These are all for you, beta. You've been a good boy!",
    narrator: "Dadi smiled warmly at Ravi.",
    action: "Dadi hands the plate to Ravi"
  },
  {
    id: 3,
    duration: 150,
    background: "home_window_view",
    characters: [
      { name: "ravi", position: { x: 50, y: 50 }, expression: "thinking", size: 100 }
    ],
    dialogue: "But Dadi, what about Mrs. Sharma? She lives alone...",
    narrator: "Ravi looked out the window at his neighbor's house.",
    action: "Ravi thoughtfully looks out the window"
  },
  {
    id: 4,
    duration: 120,
    background: "home_living_room",
    characters: [
      { name: "ravi", position: { x: 35, y: 50 }, expression: "excited", size: 100 },
      { name: "dadi", position: { x: 70, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "Can I share some sweets with her?",
    narrator: "Ravi had an idea!",
    action: "Ravi eagerly asks Dadi"
  },
  {
    id: 5,
    duration: 150,
    background: "home_living_room",
    characters: [
      { name: "dadi", position: { x: 50, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "What a wonderful thought! Sharing makes Diwali even more special.",
    narrator: "Dadi's eyes sparkled with pride.",
    action: "Dadi hugs Ravi"
  },
  {
    id: 6,
    duration: 150,
    background: "neighbor_door",
    characters: [
      { name: "ravi", position: { x: 30, y: 50 }, expression: "happy", size: 100 },
      { name: "neighbor", position: { x: 70, y: 50 }, expression: "surprised", size: 105 }
    ],
    dialogue: "Happy Diwali, Mrs. Sharma! We brought sweets for you!",
    narrator: "Ravi knocked on Mrs. Sharma's door.",
    action: "Ravi offers a plate of sweets"
  },
  {
    id: 7,
    duration: 150,
    background: "neighbor_door",
    characters: [
      { name: "ravi", position: { x: 30, y: 50 }, expression: "happy", size: 100 },
      { name: "neighbor", position: { x: 70, y: 50 }, expression: "happy", size: 105 }
    ],
    dialogue: "Oh Ravi! This is so sweet of you. Happy Diwali!",
    narrator: "Mrs. Sharma's face lit up with joy.",
    action: "Mrs. Sharma accepts the sweets gratefully"
  },
  {
    id: 8,
    duration: 180,
    background: "home_living_room_diya",
    characters: [
      { name: "ravi", position: { x: 40, y: 50 }, expression: "happy", size: 100 },
      { name: "dadi", position: { x: 65, y: 50 }, expression: "happy", size: 110 }
    ],
    dialogue: "Sharing made me happier than eating all the sweets myself!",
    narrator: "That night, as the diyas glowed, Ravi learned that sharing brings the greatest joy.",
    action: "Ravi and Dadi light diyas together"
  }
];

export const BACKGROUND_COLORS = {
  home_living_room: "#FFF8DC", // Warm cream
  home_window_view: "#E6F3FF", // Light blue sky
  neighbor_door: "#FFE5CC", // Warm peach
  home_living_room_diya: "#FFF5E1" // Warm glow
};
