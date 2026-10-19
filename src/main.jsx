import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import App from './App.jsx'
import EventCard from './components/EventCard.jsx';
import EventDetails from './components/EventDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventCard />
  },
  {
    path:"/events/:eventId",
    element: <EventDetails />
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
