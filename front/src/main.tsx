import ReactDOM from 'react-dom/client'
import ErrorPage from './error';
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <nav>Hello World. here it is going to be a navbar later</nav>
        <Outlet />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "favourite",
        element: <div> another page. it should load upon click a Link </div>
      }
    ]
  },
]); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
