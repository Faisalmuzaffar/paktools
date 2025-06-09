import { BrowserRouter, useRoutes } from 'react-router-dom';
import routesConfig from '../config/routesConfig';
import Navbar from './Navbar';
import { Suspense, useMemo, useState } from 'react';
import Loading from './Loading';
import StartupAnimation from './StartupAnimation';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomSnackBarProvider } from '../contexts/CustomSnackBarContext';
import { SnackbarProvider } from 'notistack';
import { tools } from '../tools';
import './index.css';
import { darkTheme, lightTheme } from '../config/muiConfig';

const AppRoutes = () => {
  const updatedRoutesConfig = [...routesConfig];
  tools.forEach((tool) => {
    updatedRoutesConfig.push({ path: tool.path, element: tool.component() });
  });
  return useRoutes(updatedRoutesConfig);
};

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [showStartupAnimation, setShowStartupAnimation] = useState<boolean>(
    () => {
      // Show startup animation only on first visit or when explicitly requested
      return !sessionStorage.getItem('hasSeenStartupAnimation');
    }
  );
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const handleAnimationComplete = () => {
    setShowStartupAnimation(false);
    sessionStorage.setItem('hasSeenStartupAnimation', 'true');
  };

  if (showStartupAnimation) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StartupAnimation onComplete={handleAnimationComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <CustomSnackBarProvider>
          <BrowserRouter>
            <Navbar
              onSwitchTheme={() => {
                setDarkMode((prevState) => !prevState);
                localStorage.setItem('theme', darkMode ? 'light' : 'dark');
              }}
            />
            <Suspense fallback={<Loading />}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </CustomSnackBarProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
