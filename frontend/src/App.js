import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Nav from 'pages/Nav';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Nav />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
