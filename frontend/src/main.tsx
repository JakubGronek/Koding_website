import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './index.css'
import Layout from './Layout.tsx'
import { ProtectedRoute, ProtectedRoutePromptLogin, UserlessRoute } from './ProtectedRoute.tsx'
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
            element: <Tasks viewMode="" />,
          },
          {
            path: "tasks/new",
            element: <Tasks viewMode=" nowe" />
          },
          {
            path: "tasks/done",
            element: <Tasks viewMode=" ukonczone" />
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
  <>
    <RouterProvider router={router} />
  </>,
)
