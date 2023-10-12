import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Form from "./components/Form.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "bank-acc-open-form",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Form />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
