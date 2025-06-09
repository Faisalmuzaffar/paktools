import React, { useEffect, useState } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { Icon } from '@iconify/react';

interface StartupAnimationProps {
  onComplete?: () => void;
}

// Define the 3D keyframe animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotateY(0deg);
  }
  50% {
    transform: translateY(-20px) rotateY(180deg);
  }
`;

const rotateTools = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) scale(0.5);
    opacity: 0;
  }
  25% {
    transform: rotateX(90deg) rotateY(90deg) scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: rotateX(180deg) rotateY(180deg) scale(1);
    opacity: 0.8;
  }
  75% {
    transform: rotateX(270deg) rotateY(270deg) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) scale(1);
    opacity: 1;
  }
`;

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100vh) scale(0.3);
    opacity: 0;
  }
  60% {
    transform: translateY(20px) scale(1.1);
    opacity: 0.8;
  }
  80% {
    transform: translateY(-10px) scale(0.95);
    opacity: 0.9;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px #2196F3, 0 0 10px #2196F3, 0 0 15px #2196F3;
  }
  50% {
    box-shadow: 0 0 10px #21CBF3, 0 0 20px #21CBF3, 0 0 30px #21CBF3, 0 0 40px #21CBF3;
  }
`;

const toolsArray = [
  { icon: 'mdi:hammer-wrench', delay: '0.2s' },
  { icon: 'mdi:file-image-outline', delay: '0.4s' },
  { icon: 'mdi:file-pdf-box', delay: '0.6s' },
  { icon: 'mdi:code-json', delay: '0.8s' },
  { icon: 'mdi:format-text', delay: '1s' },
  { icon: 'mdi:video-outline', delay: '1.2s' },
  { icon: 'mdi:calculator', delay: '1.4s' },
  { icon: 'mdi:chart-line', delay: '1.6s' }
];

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showTools, setShowTools] = useState(false);

  useEffect(() => {
    // Start title animation after a brief delay
    const titleTimer = setTimeout(() => setShowTitle(true), 500);

    // Start tools animation
    const toolsTimer = setTimeout(() => setShowTools(true), 1000);

    // Complete animation and hide splash screen
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 4000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(toolsTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Background animated particles */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)
          `,
          animation: `${float} 6s ease-in-out infinite`
        }}
      />

      {/* Main Logo/Title */}
      {showTitle && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            animation: `${slideInFromTop} 2s ease-out`,
            marginBottom: 4,
            perspective: '1000px'
          }}
        >
          <Icon
            icon="mdi:tools"
            style={{
              fontSize: '4rem',
              marginRight: '16px',
              color: '#fff',
              animation: `${rotateTools} 3s ease-in-out infinite`,
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '3rem', md: '5rem' },
              background: 'linear-gradient(45deg, #fff, #f0f8ff, #e6f3ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
              letterSpacing: '2px',
              animation: `${glowPulse} 2s ease-in-out infinite`
            }}
          >
            Pak Tools
          </Typography>
        </Box>
      )}

      {/* Animated Tool Icons Circle */}
      {showTools && (
        <Box
          sx={{
            position: 'relative',
            width: '300px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {toolsArray.map((tool, index) => {
            const angle = (index * 360) / toolsArray.length;
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <Icon
                key={index}
                icon={tool.icon}
                style={{
                  position: 'absolute',
                  fontSize: '3rem',
                  color: '#fff',
                  left: `calc(50% + ${x}px - 1.5rem)`,
                  top: `calc(50% + ${y}px - 1.5rem)`,
                  animation: `${rotateTools} 4s ease-in-out infinite`,
                  animationDelay: tool.delay,
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                  transform: 'perspective(1000px) rotateX(0deg)'
                }}
              />
            );
          })}

          {/* Center glow effect */}
          <Box
            sx={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              animation: `${glowPulse} 3s ease-in-out infinite`
            }}
          />
        </Box>
      )}

      {/* Loading text */}
      <Typography
        variant="h6"
        sx={{
          color: '#fff',
          marginTop: 4,
          opacity: 0.8,
          animation: `${float} 4s ease-in-out infinite`,
          letterSpacing: '1px'
        }}
      >
        Loading your tools...
      </Typography>
    </Box>
  );
};

export default StartupAnimation;
