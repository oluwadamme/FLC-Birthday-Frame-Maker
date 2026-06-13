/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// FLC Logo Component
export const FlcLogo: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-10',
  color = '#248895',
}) => {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ color }}>
      <svg
        viewBox="0 0 540 320"
        className="w-auto h-full"
        style={{ fill: color }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Playful, chunky, hand-drawn organic 'F' resembling the reference exactly */}
        <path
          d="M 64.9 119.5 
             C 64.9 117.4, 65.1 113.8, 65.6 110.2 
             C 66.8 101.4, 76.5 94.6, 94.9 94.6 
             L 155.8 94.6 
             C 165.7 94.6, 172.9 101.8, 172.9 111.7 
             C 172.9 121.6, 165.7 128.8, 155.8 128.8 
             L 121.4 128.8 
             L 121.4 148.6 
             L 152.1 148.6 
             C 161.4 148.6, 168.1 155.3, 168.1 164.6 
             C 168.1 173.9, 161.4 180.6, 152.1 180.6 
             L 121.4 180.6 
             L 121.4 211.3 
             C 121.4 220.6, 114.7 227.3, 105.4 227.3 
             C 96.1 227.3, 89.4 220.6, 89.4 211.3 
             L 89.4 180.6 
             L 69.1 180.6 
             C 61.2 180.6, 64.9 173.9, 64.9 164.6 
             C 64.9 155.3, 67.3 148.6, 75.3 148.6 
             L 89.4 148.6 
             L 89.4 128.8 
             L 69.1 128.8 
             C 65.1 128.8, 64.9 125.4, 64.9 119.5 Z"
        />
        
        {/* Chunky custom L with elegant rounded leg terminals */}
        <path
          d="M 191.0 125.0 
             C 191.0 115.0, 195.0 94.6, 209.0 94.6 
             C 223.0 94.6, 225.0 115.0, 225.0 125.0 
             L 225.0 196.4 
             C 225.0 196.4, 314.0 196.4, 321.4 196.4 
             C 330.0 196.4, 335.0 203.0, 335.0 211.5 
             C 335.0 220.0, 330.0 226.7, 321.4 226.7 
             L 209.0 226.7 
             C 195.0 226.7, 191.0 212.0, 191.0 196.4 
             L 191.0 125.0 Z"
        />
        
        {/* Perfectly rendered thick circular crescent 'C' with custom rounded gap boundaries */}
        <path
          d="M 390.0 119.0 
             C 413.0 119.0, 421.2 129.4, 421.2 135.0 
             C 421.2 144.5, 413.0 152.0, 399.0 152.0 
             C 390.0 152.0, 386.0 147.0, 382.0 142.0 
             C 374.0 133.0, 362.0 128.0, 348.0 128.0 
             C 328.0 128.0, 312.0 144.0, 312.0 166.0 
             C 312.0 188.0, 328.0 204.0, 348.0 204.0 
             C 362.0 204.0, 374.0 199.0, 382.0 190.0 
             C 386.0 185.0, 390.0 180.0, 399.0 180.0 
             C 413.0 180.0, 421.2 187.5, 421.2 197.0 
             C 421.2 202.6, 413.0 213.0, 390.0 213.0 
             C 353.0 213.0, 310.0 192.0, 310.0 158.0 
             C 310.0 124.0, 353.0 103.0, 390.0 103.0 
             C 399.0 103.0, 404.0 106.0, 410.0 110.0 
             C 415.0 114.0, 419.0 119.0, 390.0 119.0 Z"
             transform="rotate(-52 368 158)"
        />
        
        {/* Singular signature Dot nested in the C indentation */}
        <circle cx="431" cy="161" r="19" />
        
        {/* Beautiful full text matching the second line of the FLC identity */}
        <text
          x="250"
          y="282"
          textAnchor="middle"
          fontSize="35"
          fontWeight="800"
          letterSpacing="0.5"
          fontFamily='"Inter", "Montserrat", "Helvetica Neue", sans-serif'
          style={{ fill: color }}
        >
          Faithful Learners Circle
        </text>
      </svg>
    </div>
  );
};

// Infinity Plug Logo Component - Styled similar to the top-left logo in the sample birthday flyer.
export const InfinityPlugLogo: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-8',
  color = '#ffffff',
}) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      {/* Handcrafted beautiful Infinity loop with connecting plug element details */}
      <svg
        viewBox="0 0 120 40"
        className="w-auto h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20ZM30 20C30 14.4772 34.4772 10 40 10C45.5228 10 50 14.4772 50 20C50 25.5228 45.5228 30 40 30C34.4772 30 30 25.5228 30 20Z"
          stroke={color}
          strokeWidth="4"
          strokeMiterlimit="10"
        />
        {/* Subtle decorative power cord teeth inside */}
        <rect x="28" y="17" width="4" height="6" rx="1" fill={color} />
        <path d="M55 20H65M61 14V26" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <text
          x="72"
          y="26"
          fill={color}
          fontWeight="900"
          fontSize="11"
          letterSpacing="0.25em"
          fontFamily='"Montserrat", sans-serif'
        >
          CONNECT
        </text>
      </svg>
    </div>
  );
};

// Realistic metallic Balloon component using SVG gradients.
export const MetallicBalloon: React.FC<{
  colorStyle?: 'rose-gold' | 'gold' | 'teal' | 'silver';
  size?: number;
  className?: string;
  tiltAngle?: number;
}> = ({ colorStyle = 'rose-gold', size = 120, className = '', tiltAngle = 0 }) => {
  // Setup color gradient stops
  let stops = {
    start: '#fad0c4',
    middle1: '#e5a590',
    middle2: '#c27e69',
    end: '#965541',
    highlight: '#ffffff',
  };

  if (colorStyle === 'gold') {
    stops = {
      start: '#ffe082',
      middle1: '#e5b839',
      middle2: '#b8860b',
      end: '#8a6400',
      highlight: '#ffffff',
    };
  } else if (colorStyle === 'teal') {
    stops = {
      start: '#a4edf5',
      middle1: '#248895',
      middle2: '#136773',
      end: '#073c44',
      highlight: '#ffffff',
    };
  } else if (colorStyle === 'silver') {
    stops = {
      start: '#f3f4f6',
      middle1: '#cbd5e1',
      middle2: '#94a3b8',
      end: '#475569',
      highlight: '#ffffff',
    };
  }

  const gradId = `balloonGrad-${colorStyle}-${Math.floor(Math.random() * 100000)}`;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.3}px`,
        transform: `rotate(${tiltAngle}deg)`,
      }}
    >
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id={gradId}
            cx="35%"
            cy="30%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor={stops.start} />
            <stop offset="40%" stopColor={stops.middle1} />
            <stop offset="85%" stopColor={stops.middle2} />
            <stop offset="100%" stopColor={stops.end} />
          </radialGradient>
        </defs>

        {/* Balloon string trail */}
        <path
          d="M50 102 C 50 115, 42 120, 52 135"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Balloon Body */}
        <path
          d="M50 10C73.1 10 90 28.8 90 52C90 75.2 73.1 100 50 100C26.9 100 10 75.2 10 52C10 28.8 26.9 10 50 10Z"
          fill={`url(#${gradId})`}
        />

        {/* Tiny Balloon Knot */}
        <polygon
          points="46,100 54,100 50,105"
          fill={stops.middle2}
        />

        {/* 3D Highlight Reflection Glare */}
        <ellipse
          cx="28"
          cy="32"
          rx="10"
          ry="15"
          transform="rotate(-20 28 32)"
          fill={stops.highlight}
          opacity="0.35"
        />
        
        {/* Secondary soft rim highlight */}
        <path
          d="M 80 50 A 30 38 0 0 1 65 85"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.15"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Hand-drawn Golden SVG Paint Brush Strokes to replace messy raw images.
export const AcrylicStroke: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = '#d4af37', className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 120"
      className={`w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Artistic layered vector paint stroke */}
      <path
        d="M 12 60 C 80 40, 160 80, 240 50 C 320 20, 400 90, 480 40 C 530 15, 570 30, 588 55 C 570 70, 520 40, 470 65 C 390 100, 310 10, 230 65 C 150 110, 80 50, 12 60 Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M 50 48 C 110 38, 170 58, 230 43 C 290 28, 350 78, 410 43 C 470 8, 520 28, 550 38 C 500 52, 440 28, 380 58 C 300 90, 220 28, 140 68 C 90 92, 60 58, 50 48 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M 110 35 C 220 25, 300 65, 450 35"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
};

// Stylized Grunge Bottom Brush stroke block, exactly matches the cream overlay in the flyer bottom right.
export const GrungeBottomBlock: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = '#f5eedb', className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 100"
      className={`w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Handcrafted rustic bottom-right brush block */}
      <path
        d="M 10 30 
           Q 60 10, 120 25 
           T 240 15 
           T 360 40 
           Q 390 45, 400 60 
           L 400 100 
           L 10 100 
           Z"
        fill={color}
      />
      {/* Subtle dry-brush details on the top margin */}
      <path
        d="M 20 26 Q 80 4, 150 18 T 290 10 T 380 32"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 45 35 Q 110 15, 180 24 T 310 18"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
};

// Confetti & Glitter Overlay Component
export const GlitterOverlay: React.FC<{
  colorMode?: 'multi' | 'gold' | 'white' | 'teal';
  className?: string;
}> = ({ colorMode = 'gold', className = '' }) => {
  const getColors = () => {
    switch (colorMode) {
      case 'multi':
        return ['#ffd700', '#ff69b4', '#00ffff', '#ffa500', '#adff2f', '#ffffff'];
      case 'white':
        return ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#ffffff'];
      case 'teal':
        return ['#7dd3fc', '#248895', '#0ea5e9', '#38bdf8', '#ffffff', '#e0f2fe'];
      case 'gold':
      default:
        return ['#ffe082', '#ffd700', '#d4af37', '#ffd700', '#e5b839', '#ffffff'];
    }
  };

  const colors = getColors();

  // Create a structured static list of 40 pieces to ensure deterministic and error-free rendering
  // (We don't use Math.random() directly inside the JSX to avoid hydration mismatches)
  const particles = Array.from({ length: 40 }).map((_, i) => {
    // Deterministic values based on i
    const colorIndex = i % colors.length;
    const x = ((i * 17) % 95) + 2.5; // Spread from 2.5% to 97.5%
    const y = ((i * 23) % 90) + 5;   // Spread from 5% to 95%
    const size = (i % 3) === 0 ? 8 : (i % 3) === 1 ? 12 : 5;
    const isDiamond = i % 2 === 0;
    const rotate = (i * 35) % 360;
    const opacity = 0.3 + ((i % 5) * 0.15); // ranges 0.3 to 0.9

    return {
      color: colors[colorIndex],
      x,
      y,
      size,
      isDiamond,
      rotate,
      opacity,
    };
  });

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {particles.map((p, idx) => {
        if (p.isDiamond) {
          // Render diamond element
          return (
            <rect
              key={idx}
              x={`${p.x}%`}
              y={`${p.y}%`}
              width={p.size}
              height={p.size}
              fill={p.color}
              opacity={p.opacity}
              transform={`rotate(${p.rotate}, ${p.x + p.size/2}, ${p.y + p.size/2})`}
            />
          );
        } else {
          // Render circle element
          return (
            <circle
              key={idx}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.size / 2}
              fill={p.color}
              opacity={p.opacity}
            />
          );
        }
      })}
    </svg>
  );
};

// Rich Premium Confetti Background Overlay with actual falling flakes, ribbon waves, and twinkling sparkles
export const ConfettiBackground: React.FC<{
  colorMode?: 'multi' | 'gold' | 'white' | 'teal';
  isStory?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ colorMode = 'gold', isStory = false, className = '', style }) => {
  const getColors = () => {
    switch (colorMode) {
      case 'multi':
        return ['#ffd700', '#ff69b4', '#38bdf8', '#ffa500', '#bef264', '#ffffff', '#ff4500'];
      case 'white':
        return ['#ffffff', '#cbd5e1', '#e2e8f0', '#f8fafc', '#ffffff', '#94a3b8'];
      case 'teal':
        return ['#7dd3fc', '#248895', '#0ea5e9', '#0284c7', '#ffffff', '#38bdf8', '#a4edf5'];
      case 'gold':
      default:
        return ['#ffd700', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#ffffff', '#fffbeb'];
    }
  };

  const colors = getColors();
  const height = isStory ? 1920 : 1350;
  const width = 1080;

  // Let's generate 95 premium diverse particles across the frame background area to make it incredibly festive!
  const flakes = Array.from({ length: 95 }).map((_, i) => {
    const x = (i * 157) % width;
    
    // Distribute y coordinates. Make it slightly denser in the upper/mid area around the frames
    const y = (i * 223) % height;
    
    const scale = 14 + (i % 22); // Size from 14px to 35px
    const rotation = (i * 47) % 360;
    const opacity = 0.45 + (i % 6) * 0.09; // Ranges 0.45 to 0.99
    const color = colors[i % colors.length];

    // Typology of confetti particle
    // 0: Rectangle flake, 1: Curved serpentine ribbon, 2: 4-pointed twinkle star, 3: Square diamond flake, 4: Round bouncy dot
    const typeIndex = i % 5;

    return {
      x,
      y,
      scale,
      rotation,
      opacity,
      color,
      typeIndex
    };
  });

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {flakes.map((f, idx) => {
        const trans = `translate(${f.x}, ${f.y}) rotate(${f.rotation})`;
        
        switch (f.typeIndex) {
          case 0: // Rectangle Flake
            return (
              <g key={idx} transform={trans} opacity={f.opacity}>
                <rect
                  x={-f.scale / 2}
                  y={-f.scale / 3}
                  width={f.scale}
                  height={f.scale * 0.55}
                  rx={2}
                  fill={f.color}
                />
              </g>
            );
            
          case 1: // Serpentine Spiral Ribbon Wave
            return (
              <g key={idx} transform={trans} opacity={f.opacity}>
                <path
                  d={`M ${-f.scale} 0 Q ${-f.scale / 2} ${-f.scale} 0 0 T ${f.scale} 0`}
                  stroke={f.color}
                  strokeWidth={3 + (f.scale % 3)}
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            );
            
          case 2: // Premium 4-pointed Sparkle Twinkle Star
            return (
              <g key={idx} transform={trans} opacity={f.opacity}>
                <path
                  d={`M 0 ${-f.scale * 1.1} Q 0 0 ${f.scale * 1.1} 0 Q 0 0 0 ${f.scale * 1.1} Q 0 0 ${-f.scale * 1.1} 0 Q 0 0 0 ${-f.scale * 1.1}`}
                  fill={f.color}
                />
              </g>
            );
            
          case 3: // Metallic Square Diamond Flake
            return (
              <g key={idx} transform={trans} opacity={f.opacity}>
                <rect
                  x={-f.scale * 0.45}
                  y={-f.scale * 0.45}
                  width={f.scale * 0.9}
                  height={f.scale * 0.9}
                  rx={1}
                  fill={f.color}
                  transform="rotate(45)"
                />
              </g>
            );
            
          case 4: // Standard round circle bead
          default:
            return (
              <circle
                key={idx}
                cx={f.x}
                cy={f.y}
                r={f.scale * 0.35}
                fill={f.color}
                opacity={f.opacity}
              />
            );
        }
      })}
    </svg>
  );
};
