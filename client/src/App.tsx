import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Route elements
import { Home, ErrorPage } from "./features/misc/";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
