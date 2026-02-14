import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Scene } from './Scene';
import { SCENES, STORY_CONFIG } from './story-config';
import { Star } from './Decorations';

export const DiwaliStory: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFF8DC' }}>
      {/* Title card */}
      <Sequence from={0} durationInFrames={90}>
        <TitleCard />
      </Sequence>

      {/* Story scenes */}
      {SCENES.map((scene) => {
        const sceneStart = currentFrame + 90; // Add 90 frames for title card
        currentFrame += scene.duration;
        
        return (
          <Sequence
            key={scene.id}
            from={sceneStart}
            durationInFrames={scene.duration}
          >
            <Scene scene={scene} sceneStartFrame={sceneStart} />
          </Sequence>
        );
      })}

      {/* End card with moral */}
      <Sequence from={currentFrame + 90} durationInFrames={120}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  
  const titleOpacity = interpolate(frame, [0, 20, 70, 90], [0, 1, 1, 0]);
  const titleScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FF6B35',
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      }}
    >
      {/* Decorative stars */}
      <Star x={100} y={100} size={40} delay={0} />
      <Star x={1100} y={150} size={35} delay={10} />
      <Star x={200} y={600} size={30} delay={5} />
      <Star x={1000} y={550} size={38} delay={15} />
      <Star x={600} y={100} size={32} delay={8} />
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
            margin: 0,
            marginBottom: 20,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {STORY_CONFIG.title}
        </h1>
        
        <div
          style={{
            fontSize: 32,
            fontFamily: 'Arial, sans-serif',
            color: '#FFF8DC',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '15px 40px',
            borderRadius: '25px',
            marginTop: 20,
          }}
        >
          A Story About {STORY_CONFIG.theme}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0]);
  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#9B59B6',
        background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
      }}
    >
      {/* Decorative stars */}
      <Star x={150} y={120} size={35} delay={0} />
      <Star x={1050} y={180} size={40} delay={8} />
      <Star x={250} y={550} size={32} delay={5} />
      <Star x={950} y={600} size={38} delay={12} />
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#FFD700',
            marginBottom: 30,
            textAlign: 'center',
          }}
        >
          The Moral of the Story
        </div>
        
        <div
          style={{
            fontSize: 56,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#FFFFFF',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: '30px 60px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.4,
          }}
        >
          "{STORY_CONFIG.moral}"
        </div>
        
        <div
          style={{
            fontSize: 28,
            fontFamily: 'Arial, sans-serif',
            color: '#FFF8DC',
            marginTop: 50,
          }}
        >
          Happy Diwali! 🪔✨
        </div>
      </div>
    </AbsoluteFill>
  );
};
