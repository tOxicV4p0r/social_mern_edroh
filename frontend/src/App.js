import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Nav from 'pages/Nav';
import ProtectedLayout from 'layouts/ProtectedLayout';
import ErrorPage from 'pages/ErrorPage';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ProtectedLayout><Nav /></ProtectedLayout>} errorElement={<ErrorPage />} >
          <Route index={true} element={<ProtectedLayout><Home /></ProtectedLayout>} />
          <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
          <Route path="/profile/:userId" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        </Route>
        <Route path="/login" element={<ProtectedLayout login><Login /></ProtectedLayout>} />
      </>
    )
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App;
