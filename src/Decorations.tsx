import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Diya: React.FC<{ x: number; y: number; size?: number }> = ({ 
  x, 
  y, 
  size = 40 
}) => {
  const frame = useCurrentFrame();
  
  // Flickering flame effect
  const flameScale = interpolate(
    Math.sin(frame / 5),
    [-1, 1],
    [0.9, 1.1]
  );
  
  const flameOpacity = interpolate(
    Math.sin(frame / 3),
    [-1, 1],
    [0.8, 1]
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      {/* Diya lamp base */}
      <ellipse
        cx="20"
        cy="28"
        rx="15"
        ry="5"
        fill="#D4A574"
        stroke="#8B6F47"
        strokeWidth="1"
      />
      
      {/* Diya bowl */}
      <path
        d="M 5 28 Q 5 20 20 18 Q 35 20 35 28"
        fill="#E6B87D"
        stroke="#8B6F47"
        strokeWidth="1.5"
      />
      
      {/* Oil surface */}
      <ellipse
        cx="20"
        cy="22"
        rx="12"
        ry="3"
        fill="#FFD700"
        opacity="0.6"
      />
      
      {/* Wick */}
      <rect
        x="19"
        y="15"
        width="2"
        height="7"
        fill="#4A2511"
      />
      
      {/* Flame */}
      <g transform={`translate(20, 12) scale(${flameScale})`} opacity={flameOpacity}>
        {/* Outer flame (yellow) */}
        <path
          d="M 0 0 Q -4 -8 0 -15 Q 4 -8 0 0"
          fill="#FFA500"
        />
        {/* Inner flame (orange) */}
        <path
          d="M 0 -2 Q -2 -6 0 -12 Q 2 -6 0 -2"
          fill="#FF6B35"
        />
        {/* Core flame (white) */}
        <path
          d="M 0 -4 Q -1 -7 0 -10 Q 1 -7 0 -4"
          fill="#FFFF99"
        />
      </g>
      
      {/* Glow effect */}
      <circle
        cx="20"
        cy="12"
        r="15"
        fill="#FFA500"
        opacity="0.2"
        filter="blur(5px)"
      />
    </svg>
  );
};

export const Rangoli: React.FC<{ x: number; y: number; size?: number }> = ({ 
  x, 
  y, 
  size = 100 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      {/* Central circle */}
      <circle cx="50" cy="50" r="8" fill="#FF6B35" />
      
      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 15;
        const y = 50 + Math.sin(rad) * 15;
        return (
          <ellipse
            key={`inner-${i}`}
            cx={x}
            cy={y}
            rx="8"
            ry="12"
            fill="#FFD700"
            transform={`rotate(${angle} ${x} ${y})`}
          />
        );
      })}
      
      {/* Outer petals */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 28;
        const y = 50 + Math.sin(rad) * 28;
        return (
          <ellipse
            key={`outer-${i}`}
            cx={x}
            cy={y}
            rx="10"
            ry="15"
            fill="#9B59B6"
            transform={`rotate(${angle} ${x} ${y})`}
          />
        );
      })}
      
      {/* Decorative dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 40;
        const y = 50 + Math.sin(rad) * 40;
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="#E74C3C"
          />
        );
      })}
    </svg>
  );
};

export const SweetPlate: React.FC<{ x: number; y: number; size?: number }> = ({ 
  x, 
  y, 
  size = 80 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      {/* Plate */}
      <ellipse
        cx="40"
        cy="45"
        rx="35"
        ry="30"
        fill="#FFE5CC"
        stroke="#D4A574"
        strokeWidth="2"
      />
      
      {/* Plate rim */}
      <ellipse
        cx="40"
        cy="45"
        rx="32"
        ry="27"
        fill="none"
        stroke="#E6C9A8"
        strokeWidth="1.5"
      />
      
      {/* Ladoo (round sweet) */}
      <circle cx="30" cy="35" r="8" fill="#FFA500" />
      <circle cx="30" cy="35" r="1.5" fill="#8B4513" />
      <circle cx="32" cy="37" r="1" fill="#8B4513" />
      
      {/* Barfi (square sweet) */}
      <rect x="42" y="28" width="12" height="12" rx="2" fill="#FFD700" />
      <line x1="45" y1="30" x2="45" y2="38" stroke="#DAA520" strokeWidth="0.5" />
      <line x1="51" y1="30" x2="51" y2="38" stroke="#DAA520" strokeWidth="0.5" />
      
      {/* Jalebi */}
      <path
        d="M 25 50 Q 28 48 30 50 Q 32 52 35 50 Q 37 48 40 50"
        fill="none"
        stroke="#FF6347"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Another Ladoo */}
      <circle cx="50" cy="48" r="7" fill="#FF8C00" />
      <circle cx="50" cy="48" r="1.5" fill="#8B4513" />
    </svg>
  );
};

export const Star: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ 
  x, 
  y, 
  size = 20,
  delay = 0
}) => {
  const frame = useCurrentFrame();
  
  const twinkle = interpolate(
    Math.sin((frame - delay) / 10),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: twinkle,
      }}
    >
      <path
        d="M 10 2 L 12 8 L 18 10 L 12 12 L 10 18 L 8 12 L 2 10 L 8 8 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="0.5"
      />
    </svg>
  );
};
