import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
            {/* <Route path="/home" element={isAuth ? <Home /> : <Login />} /> */}
            <Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
