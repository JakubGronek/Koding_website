import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Layout from './Layout.tsx'
import { ProtectedRoute } from './ProtectedRoute.tsx'
import Tasks from './Tasks.tsx'
import Landing from './Landing.tsx'
import Editor from './Editor.tsx'
import Leaderboard from './Leaderboard.tsx'

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute redirect="/" />,
        children: [
          {
            path: "tasks/:view?",
            element: <Tasks />,
          },
        ],
      },
      {
        element: <Editor />,
        path: "editor/:id?"
      },
      {
        element: <Leaderboard />,
        path: "leaderboard"
      },
      { 
          path: "/",
          index: true,
          element: <Landing />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>,
)
