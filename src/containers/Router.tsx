import { h } from 'preact';
import { Outlet, Router, ReactLocation, Route } from '@tanstack/react-location';
import { Login } from './pages';
import '../styles/index.scss';

const routes: Route[] = [
  {
    children: [
      { path: `login`, element: <Login /> },
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
