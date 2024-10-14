import ReactDOM from "react-dom/client";
import ErrorPage from "./error";
import App from "./App.tsx";
import Account from "./Account";
import Favourites from "./Favourites";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useLocation,
  Location,
} from "react-router-dom";

const AllCats = ({
  props: { location },
}: {
  props: { location: Location };
}) => (
  <Link
    className={`p-6 ${
      location.pathname === "/"
        ? "text-white bg-nav_bg_selected"
        : "text-gray-200 hover:text-white hover:bg-nav_bg_selected"
    }`}
    to="/"
  >
    Все котики
  </Link>
);
const FavouriteCats = ({
  props: { location },
}: {
  props: { location: Location };
}) => (
  <Link
    className={`p-6 ${
      location.pathname === "/favourite"
        ? "text-white bg-nav_bg_selected"
        : "text-gray-200 hover:text-white hover:bg-nav_bg_selected"
    }`}
    to="/favourite"
  >
    Любимые котики
  </Link>
);

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <nav className="bg-nav_bg drop-shadow-2xl">
        <div className="mx-6 xl:mx-14 flex">
          <AllCats props={{ location }} />
          <FavouriteCats props={{ location }} />
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
        element: <Favourites />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
