import './scss/app.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from './components/Main'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'user/:id',
        element: <Dashboard />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound /> 
  }
]

)
function App() {
  return <RouterProvider router={router} />
}

export default App;
