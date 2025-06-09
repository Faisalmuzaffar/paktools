import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { Icon } from '@iconify/react';

// Enhanced 3D Processing Animations
const processingSpiral = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  25% {
    transform: perspective(1000px) rotateX(90deg) rotateY(90deg) translateZ(50px);
  }
  50% {
    transform: perspective(1000px) rotateX(180deg) rotateY(180deg) translateZ(0px);
  }
  75% {
    transform: perspective(1000px) rotateX(270deg) rotateY(270deg) translateZ(-50px);
  }
  100% {
    transform: perspective(1000px) rotateX(360deg) rotateY(360deg) translateZ(0px);
  }
`;

const dataFlow = keyframes`
  0%, 100% {
    transform: translateX(-50px) scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: translateX(50px) scale(1.2);
    opacity: 1;
  }
`;

const morphShape = keyframes`
  0%, 100% {
    border-radius: 50%;
    transform: scale(1) rotate(0deg);
  }
  25% {
    border-radius: 10%;
    transform: scale(1.1) rotate(90deg);
  }
  50% {
    border-radius: 0%;
    transform: scale(0.9) rotate(180deg);
  }
  75% {
    border-radius: 30%;
    transform: scale(1.1) rotate(270deg);
  }
`;

const toolSpecificMotion = {
  pdf: keyframes`
    0% { transform: perspective(1000px) rotateY(0deg) translateZ(0px); }
    100% { transform: perspective(1000px) rotateY(360deg) translateZ(20px); }
  `,
  image: keyframes`
    0%, 100% { 
      transform: perspective(1000px) rotateX(0deg) scale(1);
      filter: hue-rotate(0deg);
    }
    50% { 
      transform: perspective(1000px) rotateX(180deg) scale(1.1);
      filter: hue-rotate(180deg);
    }
  `,
  convert: keyframes`
    0% { 
      transform: translateX(-30px) rotateY(-45deg);
      opacity: 0.5;
    }
    50% {
      transform: translateX(0px) rotateY(0deg) scale(1.2);
      opacity: 1;
    }
    100% { 
      transform: translateX(30px) rotateY(45deg);
      opacity: 0.5;
    }
  `
};

interface ProcessingAnimationProps {
  type:
    | 'pdf'
    | 'image'
    | 'video'
    | 'text'
    | 'data'
    | 'convert'
    | 'compress'
    | 'analyze';
  message?: string;
  size?: 'small' | 'medium' | 'large';
  inline?: boolean;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({
  type,
  message = 'Processing...',
  size = 'medium',
  inline = false
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          container: inline ? '150px' : '200px',
          icon: '1.5rem',
          text: 'caption',
          height: inline ? '60px' : '150px'
        };
      case 'large':
        return {
          container: '500px',
          icon: '4rem',
          text: 'h5',
          height: '400px'
        };
      default:
        return {
          container: '300px',
          icon: '2.5rem',
          text: 'body1',
          height: inline ? '100px' : '250px'
        };
    }
  };

  const getToolConfig = () => {
    switch (type) {
      case 'pdf':
        return {
          icon: 'mdi:file-pdf-box',
          color: '#d32f2f',
          animation: toolSpecificMotion.pdf,
          duration: '2s',
          effects: [
            { icon: 'mdi:file-outline', delay: '0.2s', orbit: 80 },
            { icon: 'mdi:text-box', delay: '0.4s', orbit: 100 },
            { icon: 'mdi:image-outline', delay: '0.6s', orbit: 120 }
          ]
        };
      case 'image':
        return {
          icon: 'mdi:image',
          color: '#2e7d32',
          animation: toolSpecificMotion.image,
          duration: '3s',
          effects: [
            { icon: 'mdi:palette', delay: '0.1s', orbit: 90 },
            { icon: 'mdi:crop', delay: '0.3s', orbit: 110 },
            { icon: 'mdi:image-filter-vintage', delay: '0.5s', orbit: 130 }
          ]
        };
      case 'convert':
        return {
          icon: 'mdi:swap-horizontal',
          color: '#ed6c02',
          animation: toolSpecificMotion.convert,
          duration: '2.5s',
          effects: [
            { icon: 'mdi:arrow-right', delay: '0s', orbit: 0, static: true },
            { icon: 'mdi:cog', delay: '0.2s', orbit: 80 },
            { icon: 'mdi:check-circle', delay: '0.8s', orbit: 0, static: true }
          ]
        };
      default:
        return {
          icon: 'mdi:cog',
          color: '#1976d2',
          animation: processingSpiral,
          duration: '3s',
          effects: []
        };
    }
  };

  const sizeConfig = getSizeConfig();
  const toolConfig = getToolConfig();

  const renderProcessingAnimation = () => (
    <Box
      sx={{
        position: 'relative',
        width: sizeConfig.container,
        height: sizeConfig.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px'
      }}
    >
      {/* Main processing icon */}
      <Icon
        icon={toolConfig.icon}
        style={{
          fontSize: sizeConfig.icon,
          color: toolConfig.color,
          animation: `${toolConfig.animation} ${toolConfig.duration} linear infinite`,
          filter: `drop-shadow(0 0 10px ${toolConfig.color}40)`,
          zIndex: 2
        }}
      />

      {/* Orbital effect icons */}
      {toolConfig.effects.map((effect, index) => {
        if (effect.static) {
          return (
            <Icon
              key={index}
              icon={effect.icon}
              style={{
                position: 'absolute',
                fontSize: `calc(${sizeConfig.icon} * 0.6)`,
                color: toolConfig.color,
                opacity: 0.7,
                left:
                  effect.orbit === 0 ? '50%' : `calc(50% + ${effect.orbit}px)`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `${dataFlow} 2s ease-in-out infinite`,
                animationDelay: effect.delay,
                zIndex: 1
              }}
            />
          );
        }

        const angle = (index * 120) % 360;
        const x = Math.cos((angle * Math.PI) / 180) * effect.orbit;
        const y = Math.sin((angle * Math.PI) / 180) * effect.orbit;

        return (
          <Icon
            key={index}
            icon={effect.icon}
            style={{
              position: 'absolute',
              fontSize: `calc(${sizeConfig.icon} * 0.5)`,
              color: toolConfig.color,
              opacity: 0.6,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              animation: `${processingSpiral} 4s linear infinite`,
              animationDelay: effect.delay,
              zIndex: 1
            }}
          />
        );
      })}

      {/* Morphing background shape */}
      <Box
        sx={{
          position: 'absolute',
          width: `calc(${sizeConfig.container} * 0.3)`,
          height: `calc(${sizeConfig.container} * 0.3)`,
          background: `linear-gradient(45deg, ${toolConfig.color}20, transparent)`,
          animation: `${morphShape} 6s ease-in-out infinite`,
          zIndex: 0
        }}
      />
    </Box>
  );

  if (inline) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          minHeight: sizeConfig.height
        }}
      >
        {renderProcessingAnimation()}
        <Typography
          variant={sizeConfig.text as any}
          sx={{
            color: 'text.secondary',
            animation: `${dataFlow} 3s ease-in-out infinite`,
            whiteSpace: 'nowrap'
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: inline ? sizeConfig.height : '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
      }}
    >
      {renderProcessingAnimation()}

      <Typography
        variant={sizeConfig.text as any}
        sx={{
          color: 'text.secondary',
          animation: `${dataFlow} 3s ease-in-out infinite`,
          textAlign: 'center',
          maxWidth: '300px'
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default ProcessingAnimation;
