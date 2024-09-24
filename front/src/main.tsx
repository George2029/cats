import ReactDOM from 'react-dom/client'
import ErrorPage from './error';
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useLocation
} from "react-router-dom";


const MainLayout = () => {
  const location = useLocation();
  
  return (
    <div>
      <nav className="bg-sky-200 drop-shadow-2xl">
        <div className="mx-3 xl:mx-10 flex">
          <Link
            className={`p-6 ${
              location.pathname === "/"
                ? "bg-sky-300" 
                : "hover:bg-sky-400" 
            }`}
            to="/"
          >
            Все котики
          </Link>

          <Link
            className={`p-6 ${
              location.pathname === "/favourite"
                ? "bg-sky-300" 
                : "hover:bg-sky-400" 
            }`}
            to="/favourite"
          >
            Любимые котики
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "favourite",
        element: <div>Another page. It should load upon clicking a Link.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

