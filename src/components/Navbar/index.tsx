import React, { ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Box,
  keyframes
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Animated logo keyframes
const logoSpin = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: rotateY(180deg) scale(1.1);
  }
  100% {
    transform: rotateY(360deg) scale(1);
  }
`;

const logoGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 2px rgba(33, 150, 243, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(33, 203, 243, 0.6));
  }
`;

interface NavbarProps {
  onSwitchTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSwitchTheme }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const navItems: { label: string; path: string }[] = [
    // { label: 'Features', path: '/features' }
    // { label: 'About Us', path: '/about-us' }
  ];

  const buttons: ReactNode[] = [
    <DarkModeIcon
      key="dark-mode"
      onClick={onSwitchTheme}
      style={{ cursor: 'pointer' }}
    />,
    <Icon
      key="email"
      onClick={() =>
        window.open('mailto:faisalmuzafafr143786@gmail.com', '_blank')
      }
      style={{ cursor: 'pointer' }}
      fontSize={30}
      icon={'ic:baseline-email'}
    />,
    <iframe
      key="github"
      src="https://ghbtns.com/github-btn.html?user=Faisalmuzaffar&repo=paktools&type=star&count=true&size=large"
      frameBorder="0"
      scrolling="0"
      width="150"
      height="30"
      title="GitHub"
    ></iframe>,
    <Button
      key="support"
      onClick={() => {
        window.open('https://buymeacoffee.com/faisalmuzaffar', '_blank');
      }}
      sx={{ borderRadius: '100px' }}
      variant={'contained'}
      startIcon={
        <Icon
          style={{ cursor: 'pointer' }}
          fontSize={25}
          icon={'mdi:heart-outline'}
        />
      }
    >
      Support Us
    </Button>
  ];
  const drawerList = (
    <List>
      {navItems.map((navItem) => (
        <ListItemButton
          key={navItem.path}
          onClick={() => navigate(navItem.path)}
        >
          <ListItemText primary={navItem.label} />
        </ListItemButton>
      ))}
      {buttons.map((button, index) => (
        <ListItem key={index}>{button}</ListItem>
      ))}
    </List>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        color: 'text.primary'
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Icon
              icon="mdi:tools"
              style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                color: '#2196F3',
                animation: `${logoSpin} 4s ease-in-out infinite, ${logoGlow} 3s ease-in-out infinite`,
                cursor: 'pointer'
              }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '1.5rem' : '2.125rem',
                letterSpacing: '0.5px'
              }}
            >
              Pak Tools
            </Typography>
          </Box>
        </Link>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Stack direction={'row'} spacing={3} alignItems={'center'}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                sx={{
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transition: 'color 0.3s ease',
                    backgroundColor: 'white'
                  }
                }}
              >
                <Link
                  to={item.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
            {buttons}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
