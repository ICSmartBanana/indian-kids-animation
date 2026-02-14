# Framework Architecture for Scaling

This document outlines how to transform this template into a production framework for automated video generation.

## Current State: Template-Based

```
Developer → Edits story-config.ts → Runs Remotion → MP4 Video
```

## Target State: Configuration-Driven Framework

```
User → UI/API Input → Auto-generated Config → Render Engine → MP4 Video
```

---

## Phase 1: Configuration Abstraction (Week 1-2)

### Goal: Separate content from code

#### 1.1 JSON Configuration Format

Create `stories/diwali-sharing.json`:

```json
{
  "metadata": {
    "title": "Ravi Shares His Diwali Sweets",
    "theme": "Diwali - Festival of Lights",
    "moral": "Sharing brings happiness to everyone",
    "language": "en",
    "tags": ["diwali", "sharing", "kindness"],
    "ageGroup": "5-8"
  },
  "settings": {
    "duration": 120,
    "fps": 30,
    "resolution": "1280x720"
  },
  "characters": [
    {
      "id": "char_ravi",
      "template": "boy_8yr",
      "name": "Ravi",
      "customization": {
        "skinTone": "#FFD4A3",
        "clothingColor": "#FF6B35",
        "clothingStyle": "kurta"
      }
    },
    {
      "id": "char_dadi",
      "template": "grandmother",
      "name": "Dadi",
      "customization": {
        "skinTone": "#F4C9A0",
        "clothingColor": "#9B59B6",
        "clothingStyle": "saree"
      }
    }
  ],
  "scenes": [
    {
      "id": "scene_1",
      "duration": 4.0,
      "background": "home_living_room",
      "characters": [
        {
          "characterId": "char_ravi",
          "position": [30, 50],
          "expression": "excited",
          "size": 100
        },
        {
          "characterId": "char_dadi",
          "position": [70, 50],
          "expression": "happy",
          "size": 110
        }
      ],
      "dialogue": {
        "speaker": "char_ravi",
        "text": "Dadi, look! So many sweets for Diwali!",
        "voiceId": "child_boy_hindi_1"
      },
      "narration": {
        "text": "It was Diwali evening. Ravi's grandmother had made delicious sweets.",
        "voiceId": "narrator_neutral_1"
      },
      "decorations": [
        {
          "type": "sweet_plate",
          "position": [50, 60],
          "size": 120
        }
      ]
    }
  ]
}
```

#### 1.2 Configuration Loader

Create `src/config-loader.ts`:

```typescript
interface StoryConfig {
  metadata: StoryMetadata;
  settings: VideoSettings;
  characters: CharacterDefinition[];
  scenes: SceneDefinition[];
}

export class ConfigLoader {
  static async loadStory(path: string): Promise<StoryConfig> {
    const config = await fetch(path).then(r => r.json());
    return this.validateAndParse(config);
  }
  
  static validateAndParse(config: any): StoryConfig {
    // Validation logic
    // Type conversion
    // Default values
    return config;
  }
}
```

#### 1.3 Dynamic Component Generator

```typescript
export class SceneGenerator {
  static generateScene(sceneConfig: SceneDefinition, characters: CharacterDefinition[]): React.FC {
    return () => {
      // Dynamically create scene based on config
      // Load characters, positions, decorations
      // Apply animations
    };
  }
}
```

---

## Phase 2: Character Management System (Week 3-4)

### 2.1 Character Template Library

```
characters/
├── templates/
│   ├── boy_8yr.json
│   ├── girl_8yr.json
│   ├── grandmother.json
│   ├── grandfather.json
│   ├── mother.json
│   ├── father.json
│   ├── teacher.json
│   └── friend.json
├── customizations/
│   ├── skin-tones.json
│   ├── clothing-styles.json
│   ├── expressions.json
│   └── accessories.json
└── instances/
    └── user_created/
        └── ravi_v1.json
```

### 2.2 Character Builder

```typescript
interface CharacterTemplate {
  id: string;
  type: 'child' | 'adult' | 'elder';
  baseSize: number;
  ageRange: [number, number];
  defaultClothing: string[];
  availableExpressions: string[];
  customizableFeatures: string[];
}

class CharacterBuilder {
  constructor(private template: CharacterTemplate) {}
  
  customize(params: CustomizationParams): CharacterInstance {
    // Apply customizations
    // Generate unique ID
    // Save to instances
    return characterInstance;
  }
  
  generateSVG(expression: string, size: number): SVGElement {
    // Dynamic SVG generation
    // Apply customizations
    return svg;
  }
}
```

### 2.3 Consistency System

```typescript
class CharacterConsistencyManager {
  private characterVersions: Map<string, CharacterVersion[]>;
  
  createCharacter(config: CharacterConfig): CharacterInstance {
    const version = this.getLatestVersion(config.id) || 0;
    const character = this.buildCharacter(config);
    
    // Save snapshot for consistency
    this.saveVersion(character, version + 1);
    
    return character;
  }
  
  getCharacter(id: string, version?: number): CharacterInstance {
    // Retrieve exact version for consistency across videos
    return this.characterVersions.get(id)?.[version || -1];
  }
}
```

---

## Phase 3: AI Integration (Week 5-6)

### 3.1 Story Generation with Claude API

```typescript
class StoryGenerator {
  constructor(private apiKey: string) {}
  
  async generateStory(prompt: StoryPrompt): Promise<StoryConfig> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: this.buildPrompt(prompt)
        }]
      })
    });
    
    const story = await response.json();
    return this.parseStoryToConfig(story);
  }
  
  private buildPrompt(prompt: StoryPrompt): string {
    return `
      Create a children's story with the following parameters:
      - Theme: ${prompt.theme}
      - Moral: ${prompt.moral}
      - Characters: ${prompt.characterCount}
      - Duration: ${prompt.durationMinutes} minutes
      - Age group: ${prompt.ageGroup}
      - Cultural context: Indian
      
      Format the response as a JSON configuration with:
      1. Story title and metadata
      2. Character descriptions
      3. 6-8 scenes with dialogue and narration
      4. Scene settings and character positions
      
      Each scene should:
      - Be 3-6 seconds long
      - Have clear character positions
      - Include both dialogue and narration
      - Show appropriate expressions
      - Advance the story meaningfully
    `;
  }
}
```

### 3.2 Voice Synthesis Integration

```typescript
class VoiceSynthesizer {
  private elevenlabs: ElevenLabsAPI;
  
  async generateVoiceover(scene: SceneDefinition): Promise<AudioBuffer> {
    const dialogueAudio = await this.elevenlabs.textToSpeech({
      text: scene.dialogue.text,
      voiceId: scene.dialogue.voiceId,
      settings: {
        stability: 0.5,
        similarityBoost: 0.75
      }
    });
    
    const narrationAudio = await this.elevenlabs.textToSpeech({
      text: scene.narration.text,
      voiceId: scene.narration.voiceId,
      settings: {
        stability: 0.7,
        similarityBoost: 0.8
      }
    });
    
    return this.mixAudio(dialogueAudio, narrationAudio);
  }
}
```

---

## Phase 4: Rendering Pipeline (Week 7-8)

### 4.1 Batch Processing System

```typescript
class BatchRenderer {
  private queue: RenderJob[] = [];
  
  async addJob(storyConfig: StoryConfig): Promise<string> {
    const jobId = generateId();
    
    this.queue.push({
      id: jobId,
      config: storyConfig,
      status: 'queued',
      priority: 'normal'
    });
    
    this.processQueue();
    
    return jobId;
  }
  
  private async processQueue() {
    const job = this.queue.find(j => j.status === 'queued');
    if (!job) return;
    
    job.status = 'rendering';
    
    try {
      const video = await this.renderVideo(job.config);
      await this.saveVideo(video, job.id);
      job.status = 'completed';
    } catch (error) {
      job.status = 'failed';
      job.error = error;
    }
    
    this.processQueue(); // Process next
  }
  
  private async renderVideo(config: StoryConfig): Promise<VideoFile> {
    // Use Remotion's renderMedia API
    const { video } = await renderMedia({
      composition: this.generateComposition(config),
      codec: 'h264',
      outputLocation: `output/${config.metadata.title}.mp4`
    });
    
    return video;
  }
}
```

### 4.2 Template Variants System

```typescript
class TemplateVariantGenerator {
  generateVariants(baseConfig: StoryConfig, count: number): StoryConfig[] {
    const variants: StoryConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const variant = {
        ...baseConfig,
        characters: this.varyCharacters(baseConfig.characters),
        scenes: this.varySceneBackgrounds(baseConfig.scenes),
        metadata: {
          ...baseConfig.metadata,
          title: `${baseConfig.metadata.title} - Variant ${i + 1}`
        }
      };
      
      variants.push(variant);
    }
    
    return variants;
  }
  
  private varyCharacters(characters: CharacterDefinition[]): CharacterDefinition[] {
    // Change colors, clothing styles while maintaining character identity
    return characters.map(char => ({
      ...char,
      customization: {
        ...char.customization,
        clothingColor: this.selectRandomColor(char.customization.clothingStyle)
      }
    }));
  }
}
```

---

## Phase 5: User Interface (Week 9-10)

### 5.1 Web-Based Story Builder

```typescript
// Next.js/React frontend
const StoryBuilder: React.FC = () => {
  const [storyConfig, setStoryConfig] = useState<StoryConfig>();
  
  return (
    <div>
      <MetadataEditor onChange={updateMetadata} />
      <CharacterSelector 
        onCharacterAdd={addCharacter}
        templates={characterTemplates}
      />
      <SceneBuilder 
        characters={storyConfig.characters}
        onSceneAdd={addScene}
      />
      <PreviewPanel config={storyConfig} />
      <RenderButton onClick={submitRender} />
    </div>
  );
};
```

### 5.2 API Endpoints

```typescript
// Express/Next.js API
app.post('/api/stories', async (req, res) => {
  const { theme, moral, characters, duration } = req.body;
  
  // Generate story using AI
  const story = await storyGenerator.generateStory({
    theme,
    moral,
    characterCount: characters,
    durationMinutes: duration
  });
  
  // Save configuration
  const storyId = await db.stories.create(story);
  
  res.json({ storyId, config: story });
});

app.post('/api/render/:storyId', async (req, res) => {
  const { storyId } = req.params;
  const story = await db.stories.findById(storyId);
  
  // Add to render queue
  const jobId = await batchRenderer.addJob(story);
  
  res.json({ jobId, status: 'queued' });
});

app.get('/api/render/:jobId/status', async (req, res) => {
  const { jobId } = req.params;
  const status = await renderQueue.getStatus(jobId);
  
  res.json(status);
});
```

---

## Phase 6: Style System (Week 11-12)

### 6.1 Style Presets

```typescript
interface AnimationStyle {
  id: string;
  name: string;
  colorPalette: ColorPalette;
  characterStyle: 'flat' | '3d' | 'sketch' | 'watercolor';
  backgroundStyle: 'minimal' | 'detailed' | 'abstract';
  transitions: TransitionStyle;
  textStyle: TextStyle;
}

const STYLE_PRESETS: AnimationStyle[] = [
  {
    id: 'traditional_indian',
    name: 'Traditional Indian',
    colorPalette: {
      primary: ['#FF6B35', '#FFA500', '#FFD700'],
      secondary: ['#9B59B6', '#E74C3C'],
      backgrounds: ['#FFF8DC', '#FFE5CC']
    },
    characterStyle: 'flat',
    backgroundStyle: 'minimal',
    // ...
  },
  {
    id: 'modern_vibrant',
    name: 'Modern Vibrant',
    // Different style parameters
  }
];
```

### 6.2 Style Applicator

```typescript
class StyleApplicator {
  applyStyle(config: StoryConfig, style: AnimationStyle): StoryConfig {
    return {
      ...config,
      characters: config.characters.map(char => 
        this.applyCharacterStyle(char, style)
      ),
      scenes: config.scenes.map(scene =>
        this.applySceneStyle(scene, style)
      )
    };
  }
  
  private applyCharacterStyle(char: CharacterDefinition, style: AnimationStyle) {
    return {
      ...char,
      renderStyle: style.characterStyle,
      colorMapping: this.mapColorsToP alette(char.customization, style.colorPalette)
    };
  }
}
```

---

## Complete Tech Stack

### Core
- **Remotion**: Video rendering engine
- **React**: UI components
- **TypeScript**: Type safety
- **Node.js**: Backend processing

### AI Services
- **Claude API**: Story generation
- **ElevenLabs**: Voice synthesis
- **Stable Diffusion** (optional): Asset generation

### Storage & Database
- **PostgreSQL**: Story configurations, user data
- **S3/Cloud Storage**: Rendered videos, assets
- **Redis**: Render queue management

### Frontend
- **Next.js**: Web application
- **Tailwind CSS**: Styling
- **Zustand/Redux**: State management

### Deployment
- **Docker**: Containerization
- **AWS/GCP**: Cloud infrastructure
- **GitHub Actions**: CI/CD

---

## Cost Estimation (Per Video)

### Minimal Setup
- Claude API (story): $0.50
- ElevenLabs (voice): $0.30
- Compute (rendering): $0.20
- **Total: ~$1.00/video**

### Premium Setup
- Claude API: $0.50
- ElevenLabs (premium voices): $0.80
- Stable Diffusion (custom assets): $1.00
- Compute: $0.50
- **Total: ~$2.80/video**

### At Scale (1000 videos/month)
- Development: Mostly automated
- Rendering: Batch processing overnight
- Cost per video: $0.50-$1.00 (economies of scale)

---

## Next Steps

1. **Immediate**: Implement JSON configuration loader
2. **Week 1-2**: Build character management system
3. **Week 3-4**: Integrate Claude API for story generation
4. **Week 5-6**: Add voice synthesis
5. **Week 7-8**: Create batch rendering pipeline
6. **Week 9-10**: Build web UI
7. **Week 11-12**: Implement style system

This architecture allows you to:
- Generate videos programmatically
- Maintain character consistency
- Scale to 100s of videos
- Customize styles per client/brand
- Support multiple languages
- A/B test content variations
