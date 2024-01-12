import { h } from 'preact';
import '../styles/index.scss';
import { Outlet, Router, ReactLocation, Route } from '@tanstack/react-location';
import { } from './pages';

const routes: Route[] = [
  {
    children: [],
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
