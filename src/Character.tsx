import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface CharacterProps {
  name: string;
  position: { x: number; y: number };
  expression: 'happy' | 'sad' | 'excited' | 'thinking' | 'surprised';
  size: number;
  color: string;
  delay?: number;
}

export const Character: React.FC<CharacterProps> = ({
  name,
  position,
  expression,
  size,
  color,
  delay = 0
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entry = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 100,
      mass: 0.5,
    },
  });

  const scale = interpolate(entry, [0, 1], [0, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1]);

  // Expression-based animations
  const bounce = expression === 'excited' 
    ? Math.sin((frame - delay) / 10) * 5 
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${scale}) translateY(${bounce}px)`,
        opacity,
      }}
    >
      {/* Character body */}
      <svg width={size} height={size * 1.5} viewBox="0 0 100 150">
        {/* Head */}
        <circle
          cx="50"
          cy="30"
          r="20"
          fill="#FFD4A3"
          stroke="#8B5A2B"
          strokeWidth="2"
        />
        
        {/* Face features based on expression */}
        {expression === 'happy' && (
          <>
            <circle cx="42" cy="27" r="2" fill="#000" />
            <circle cx="58" cy="27" r="2" fill="#000" />
            <path
              d="M 40 35 Q 50 40 60 35"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        
        {expression === 'excited' && (
          <>
            <circle cx="42" cy="27" r="3" fill="#000" />
            <circle cx="58" cy="27" r="3" fill="#000" />
            <path
              d="M 40 36 Q 50 42 60 36"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        )}
        
        {expression === 'thinking' && (
          <>
            <circle cx="42" cy="28" r="2" fill="#000" />
            <circle cx="58" cy="28" r="2" fill="#000" />
            <line
              x1="40"
              y1="35"
              x2="60"
              y2="35"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        
        {expression === 'surprised' && (
          <>
            <circle cx="42" cy="26" r="3" fill="#000" />
            <circle cx="58" cy="26" r="3" fill="#000" />
            <circle cx="50" cy="36" r="4" fill="none" stroke="#000" strokeWidth="2" />
          </>
        )}
        
        {/* Hair */}
        <path
          d="M 30 25 Q 25 15 35 12 Q 45 8 50 10 Q 55 8 65 12 Q 75 15 70 25"
          fill="#2C1810"
        />
        
        {/* Body/Clothing */}
        <rect
          x="30"
          y="50"
          width="40"
          height="60"
          rx="5"
          fill={color}
          stroke="#8B5A2B"
          strokeWidth="2"
        />
        
        {/* Traditional pattern on clothing */}
        <circle cx="50" cy="70" r="3" fill="#FFD700" opacity="0.6" />
        <circle cx="42" cy="80" r="2" fill="#FFD700" opacity="0.6" />
        <circle cx="58" cy="80" r="2" fill="#FFD700" opacity="0.6" />
        
        {/* Arms */}
        <rect
          x="22"
          y="52"
          width="8"
          height="35"
          rx="4"
          fill="#FFD4A3"
          stroke="#8B5A2B"
          strokeWidth="1.5"
        />
        <rect
          x="70"
          y="52"
          width="8"
          height="35"
          rx="4"
          fill="#FFD4A3"
          stroke="#8B5A2B"
          strokeWidth="1.5"
        />
        
        {/* Legs */}
        <rect
          x="38"
          y="110"
          width="10"
          height="35"
          rx="3"
          fill={color}
          stroke="#8B5A2B"
          strokeWidth="1.5"
        />
        <rect
          x="52"
          y="110"
          width="10"
          height="35"
          rx="3"
          fill={color}
          stroke="#8B5A2B"
          strokeWidth="1.5"
        />
      </svg>
      
      {/* Character name label */}
      <div
        style={{
          position: 'absolute',
          bottom: -25,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#2C1810',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {name}
      </div>
    </div>
  );
};

// Grandmother character (adjusted proportions)
export const GrandmotherCharacter: React.FC<Omit<CharacterProps, 'color'>> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { delay = 0 } = props;

  const entry = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 100,
      mass: 0.5,
    },
  });

  const scale = interpolate(entry, [0, 1], [0, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.position.x}%`,
        top: `${props.position.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <svg width={props.size} height={props.size * 1.5} viewBox="0 0 100 150">
        {/* Head */}
        <circle cx="50" cy="30" r="22" fill="#F4C9A0" stroke="#8B5A2B" strokeWidth="2" />
        
        {/* Glasses */}
        <circle cx="42" cy="28" r="6" fill="none" stroke="#666" strokeWidth="1.5" />
        <circle cx="58" cy="28" r="6" fill="none" stroke="#666" strokeWidth="1.5" />
        <line x1="48" y1="28" x2="52" y2="28" stroke="#666" strokeWidth="1.5" />
        
        {/* Eyes through glasses */}
        <circle cx="42" cy="28" r="2" fill="#000" />
        <circle cx="58" cy="28" r="2" fill="#000" />
        
        {/* Smile */}
        <path d="M 40 36 Q 50 40 60 36" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        
        {/* Hair with bun */}
        <path d="M 28 22 Q 25 12 35 10 Q 45 7 50 9 Q 55 7 65 10 Q 75 12 72 22" fill="#B0B0B0" />
        <circle cx="50" cy="10" r="8" fill="#B0B0B0" />
        
        {/* Saree */}
        <path
          d="M 30 50 L 35 110 L 45 145 L 55 145 L 65 110 L 70 50 Z"
          fill="#9B59B6"
          stroke="#7D3C98"
          strokeWidth="2"
        />
        
        {/* Saree pallu (draped cloth) */}
        <path
          d="M 70 50 Q 75 60 78 80 Q 75 70 70 75"
          fill="#8E44AD"
          stroke="#7D3C98"
          strokeWidth="1.5"
        />
        
        {/* Saree border pattern */}
        <line x1="35" y1="110" x2="65" y2="110" stroke="#FFD700" strokeWidth="3" />
        
        {/* Arms */}
        <rect x="20" y="52" width="10" height="35" rx="5" fill="#F4C9A0" stroke="#8B5A2B" strokeWidth="1.5" />
        <rect x="70" y="52" width="10" height="35" rx="5" fill="#F4C9A0" stroke="#8B5A2B" strokeWidth="1.5" />
      </svg>
      
      <div
        style={{
          position: 'absolute',
          bottom: -25,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#2C1810',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {props.name}
      </div>
    </div>
  );
};
