import { h } from 'preact';
import { Outlet, Router, ReactLocation, Route } from '@tanstack/react-location';
import { Application, Login } from './pages';
import '../styles/index.scss';

const routes: Route[] = [
  {
    children: [
      { path: `login`, element: <Login /> },
      { path: `app`, element: <Application /> },
    ],
  },
];

export function App() {
  const location = new ReactLocation();
  return (
    <Router location={location} routes={routes}>
      <Outlet />
    </Router>
  );
}
