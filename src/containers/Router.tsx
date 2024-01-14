import { h } from 'preact';
import {
  Outlet,
  Router,
  ReactLocation,
  Route,
  useRouter,
  useLoadRoute,
} from '@tanstack/react-location';
import { Application, Home, Login, Register } from './pages';
import '../styles/index.scss';
import { PopupProvider } from 'react-hook-popup';
import 'video.js/dist/video-js.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Invite } from './pages/Invite';
const routes: Route[] = [
  {
    children: [
      { path: `register`, element: <Register /> },
      { path: `login`, element: <Login /> },
      { path: `app/:id`, element: <Application /> },
      { path: `party/:id`, element: <Invite /> },
      { path: `/`, element: <Home /> },
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
