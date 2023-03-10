import './scss/app.scss'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Main from './components/Main'
import Dashboard from './components/Dashboard'
import NotFound from './components/Error'
import Error from './components/Error'
/**
 * Main app component for the SportSee App
 * Contains the router definition used by the App
 * 
 * @version 1.0.0
 * @author Sébastien GAULT
 */

/**
 * define the browser routes for the app
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
        {
          path: 'user/:id',
          element: <Dashboard />
        }
      ]
  },
  {
    path: '*',
    element: <Error />
  }
]

)
/**
 * Root app component.
 * @returns {JSX.Element} the app
 */
function App() {
  return <RouterProvider router={router} />
}

export default App;
