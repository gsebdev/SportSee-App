import './scss/app.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from './components/Main'
import Dashboard from './components/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  },
]

)
function App() {
  return <RouterProvider router={router} />
}

export default App;
