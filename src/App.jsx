import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Init from './pages/Init';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthProvider';
import PrivateRoute from './pages/RoutePrivate';


const router = createBrowserRouter([
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Init />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/usuarios",
            element: <Users />,
          },
          {
            path: "/reportes",
            element: <Reports />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  )
}
