import { h } from 'preact';
import { Outlet, Router, ReactLocation, Route } from '@tanstack/react-location';
import { Application, Home, Login } from './pages';
import '../styles/index.scss';
import { PopupProvider } from 'react-hook-popup';
import 'video.js/dist/video-js.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const routes: Route[] = [
  {
    children: [
      { path: `login`, element: <Login /> },
      { path: `/`, element: <Home /> },
      { path: `app`, element: <Application /> },
    ],
  },
];

export function App() {
  const location = new ReactLocation();
  return (
    <Router location={location} routes={routes}>
      <PopupProvider>
        <Outlet />
      </PopupProvider>
      <ToastContainer theme="dark" />
    </Router>
  );
}
