import './scss/app.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from './components/Main'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
]

)
function App() {
  return <RouterProvider router={router} />
}

export default App;
