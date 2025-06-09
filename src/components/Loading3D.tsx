import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { Icon } from '@iconify/react';

// 3D Loading Animations
const rotate3D = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  25% {
    transform: perspective(1000px) rotateX(90deg) rotateY(45deg) rotateZ(0deg);
  }
  50% {
    transform: perspective(1000px) rotateX(180deg) rotateY(90deg) rotateZ(45deg);
  }
  75% {
    transform: perspective(1000px) rotateX(270deg) rotateY(135deg) rotateZ(90deg);
  }
  100% {
    transform: perspective(1000px) rotateX(360deg) rotateY(180deg) rotateZ(135deg);
  }
`;

const float3D = keyframes`
  0%, 100% {
    transform: translateY(0px) translateZ(0px) rotateX(0deg);
  }
  33% {
    transform: translateY(-10px) translateZ(20px) rotateX(15deg);
  }
  66% {
    transform: translateY(5px) translateZ(-10px) rotateX(-10deg);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 5px rgba(33, 150, 243, 0.5),
      0 0 10px rgba(33, 150, 243, 0.3),
      0 0 15px rgba(33, 150, 243, 0.2);
    filter: brightness(1);
  }
  50% {
    box-shadow: 
      0 0 10px rgba(33, 203, 243, 0.8),
      0 0 20px rgba(33, 203, 243, 0.6),
      0 0 30px rgba(33, 203, 243, 0.4),
      0 0 40px rgba(33, 203, 243, 0.2);
    filter: brightness(1.2);
  }
`;

const orbitalMotion = keyframes`
  0% {
    transform: rotate(0deg) translateX(40px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(40px) rotate(-360deg);
  }
`;

const scaleBreath = keyframes`
  0%, 100% {
    transform: scale(1) perspective(1000px) rotateY(0deg);
  }
  50% {
    transform: scale(1.1) perspective(1000px) rotateY(180deg);
  }
`;

interface Loading3DProps {
  message?: string;
  variant?: 'default' | 'tools' | 'processing' | 'minimal';
  size?: 'small' | 'medium' | 'large';
}

const Loading3D: React.FC<Loading3DProps> = ({
  message = 'Loading...',
  variant = 'default',
  size = 'medium'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { container: '200px', icon: '2rem', text: 'body2' };
      case 'large':
        return { container: '400px', icon: '5rem', text: 'h5' };
      default:
        return { container: '300px', icon: '3rem', text: 'h6' };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderLoadingVariant = () => {
    switch (variant) {
      case 'tools':
        return (
          <Box
            sx={{
              position: 'relative',
              width: sizeStyles.container,
              height: sizeStyles.container,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Orbiting tool icons */}
            {[
              { icon: 'mdi:hammer', delay: '0s' },
              { icon: 'mdi:wrench', delay: '0.5s' },
              { icon: 'mdi:screwdriver', delay: '1s' },
              { icon: 'mdi:pliers', delay: '1.5s' }
            ].map((tool, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  animation: `${orbitalMotion} 3s linear infinite`,
                  animationDelay: tool.delay
                }}
              >
                <Icon
                  icon={tool.icon}
                  style={{
                    fontSize: '2rem',
                    color: '#2196F3',
                    filter: 'drop-shadow(0 0 5px rgba(33, 150, 243, 0.5))',
                    animation: `${rotate3D} 2s ease-in-out infinite`
                  }}
                />
              </Box>
            ))}

            {/* Center glow */}
            <Box
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%)',
                animation: `${pulseGlow} 2s ease-in-out infinite`
              }}
            />
          </Box>
        );

      case 'processing':
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  animation: `${float3D} 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  filter: 'drop-shadow(0 0 5px rgba(33, 150, 243, 0.5))'
                }}
              />
            ))}
          </Box>
        );

      case 'minimal':
        return (
          <Icon
            icon="mdi:loading"
            style={{
              fontSize: sizeStyles.icon,
              color: '#2196F3',
              animation: `${rotate3D} 2s linear infinite`,
              filter: 'drop-shadow(0 0 8px rgba(33, 150, 243, 0.5))'
            }}
          />
        );

      default:
        return (
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon
              icon="mdi:cog"
              style={{
                fontSize: sizeStyles.icon,
                color: '#2196F3',
                animation: `${rotate3D} 3s linear infinite`,
                filter: 'drop-shadow(0 0 10px rgba(33, 150, 243, 0.5))'
              }}
            />
            <Icon
              icon="mdi:cog"
              style={{
                fontSize: `calc(${sizeStyles.icon} * 0.7)`,
                color: '#21CBF3',
                position: 'absolute',
                animation: `${rotate3D} 2s linear infinite reverse`,
                filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
              }}
            />
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: variant === 'minimal' ? 'auto' : '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        perspective: '1000px'
      }}
    >
      <Box
        sx={{
          animation: `${scaleBreath} 4s ease-in-out infinite`,
          transformStyle: 'preserve-3d'
        }}
      >
        {renderLoadingVariant()}
      </Box>

      <Typography
        variant={sizeStyles.text as any}
        sx={{
          color: 'text.secondary',
          animation: `${float3D} 3s ease-in-out infinite`,
          textAlign: 'center',
          letterSpacing: '0.5px',
          opacity: 0.8
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading3D;
