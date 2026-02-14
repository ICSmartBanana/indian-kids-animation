import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { Character, GrandmotherCharacter } from './Character';
import { Diya, Rangoli, SweetPlate, Star } from './Decorations';
import { Scene as SceneType, CHARACTERS, BACKGROUND_COLORS } from './story-config';

interface SceneProps {
  scene: SceneType;
  sceneStartFrame: number;
}

export const Scene: React.FC<SceneProps> = ({ scene, sceneStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - sceneStartFrame;

  // Background color
  const bgColor = BACKGROUND_COLORS[scene.background as keyof typeof BACKGROUND_COLORS] || '#FFF8DC';

  // Text animations
  const narratorOpacity = interpolate(localFrame, [0, 15, scene.duration - 15, scene.duration], [0, 1, 1, 0]);
  const dialogueOpacity = interpolate(localFrame, [20, 35, scene.duration - 10, scene.duration], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Background decorations based on scene */}
      {scene.background === 'home_living_room_diya' && (
        <>
          <Diya x={50} y={500} size={60} />
          <Diya x={150} y={510} size={50} />
          <Diya x={1150} y={500} size={60} />
          <Diya x={1050} y={510} size={50} />
          <Rangoli x={500} y={600} size={150} />
          <Star x={200} y={100} size={30} delay={10} />
          <Star x={1000} y={150} size={25} delay={20} />
          <Star x={600} y={80} size={20} delay={15} />
        </>
      )}

      {scene.background === 'home_living_room' && scene.id === 1 && (
        <SweetPlate x={600} y={400} size={120} />
      )}

      {scene.background === 'neighbor_door' && (
        <>
          {/* Door frame */}
          <div
            style={{
              position: 'absolute',
              right: '15%',
              top: '20%',
              width: '200px',
              height: '400px',
              backgroundColor: '#8B4513',
              border: '4px solid #654321',
              borderRadius: '8px',
            }}
          />
          {/* Door knob */}
          <div
            style={{
              position: 'absolute',
              right: '17%',
              top: '50%',
              width: '20px',
              height: '20px',
              backgroundColor: '#FFD700',
              borderRadius: '50%',
            }}
          />
        </>
      )}

      {scene.background === 'home_window_view' && (
        <>
          {/* Window */}
          <div
            style={{
              position: 'absolute',
              right: '10%',
              top: '15%',
              width: '300px',
              height: '250px',
              backgroundColor: '#87CEEB',
              border: '6px solid #8B4513',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '4px',
              padding: '4px',
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ backgroundColor: '#B0E0E6', border: '2px solid #8B4513' }} />
            ))}
          </div>
          {/* Small house in distance */}
          <div
            style={{
              position: 'absolute',
              right: '13%',
              top: '30%',
              width: '80px',
              height: '60px',
              backgroundColor: '#DEB887',
              border: '2px solid #8B4513',
            }}
          />
        </>
      )}

      {/* Characters */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {scene.characters.map((char, index) => {
          const characterConfig = CHARACTERS[char.name as keyof typeof CHARACTERS];
          
          if (char.name === 'dadi') {
            return (
              <GrandmotherCharacter
                key={`${scene.id}-${char.name}-${index}`}
                name={characterConfig.name}
                position={char.position}
                expression={char.expression}
                size={char.size}
                delay={index * 10}
              />
            );
          } else if (char.name === 'neighbor') {
            return (
              <Character
                key={`${scene.id}-${char.name}-${index}`}
                name="Mrs. Sharma"
                position={char.position}
                expression={char.expression}
                size={char.size}
                color="#E74C3C"
                delay={index * 10}
              />
            );
          } else {
            return (
              <Character
                key={`${scene.id}-${char.name}-${index}`}
                name={characterConfig.name}
                position={char.position}
                expression={char.expression}
                size={char.size}
                color={characterConfig.color}
                delay={index * 10}
              />
            );
          }
        })}
      </div>

      {/* Narrator text (top) */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          right: '10%',
          padding: '20px 40px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          border: '3px solid #FF6B35',
          opacity: narratorOpacity,
        }}
      >
        <p
          style={{
            fontSize: 24,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#2C1810',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {scene.narrator}
        </p>
      </div>

      {/* Dialogue text (bottom) */}
      {scene.dialogue && (
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '15%',
            right: '15%',
            padding: '25px 35px',
            backgroundColor: 'rgba(255, 235, 205, 0.95)',
            borderRadius: '20px',
            border: '3px solid #FFD700',
            opacity: dialogueOpacity,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              color: '#1A1A1A',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            "{scene.dialogue}"
          </p>
        </div>
      )}

      {/* Scene number indicator (for development) */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '5px 10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          fontSize: 14,
          borderRadius: '5px',
          fontFamily: 'monospace',
        }}
      >
        Scene {scene.id}
      </div>
    </AbsoluteFill>
  );
};
