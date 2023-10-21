import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Layout from './Layout.tsx'
import { ProtectedRoute, UserlessRoute } from './ProtectedRoute.tsx'
import Tasks from './Tasks.tsx'
import Landing from './Landing.tsx'
import Editor from './Editor.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute redirect="/" />,
        children: [
          {
            path: "tasks",
            element: <Tasks />
          },
          {
            path: "editor/:id",
            element: <Editor />
          }
        ]
      },
      {
        element: <UserlessRoute redirect="/tasks" />,
        children: [
          {
            path: "/",
            index: true,
            element: <Landing />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
