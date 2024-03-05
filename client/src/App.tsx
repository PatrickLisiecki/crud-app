import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Route elements
import { Home, ErrorPage } from "@/pages/misc/";
import { Contacts } from "@/pages/contacts/";

import { ContactContextProvider } from "./contexts/ContactContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/contacts",
      element: (
        <ContactContextProvider>
          <Contacts />
        </ContactContextProvider>
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
