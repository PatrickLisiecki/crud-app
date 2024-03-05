import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Route elements
import { Home, ErrorPage } from "@/features/misc/";
import { Contacts } from "@/features/contacts/";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
