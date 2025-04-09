import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import ContactPage from "../pages/contactPage";
import RecipePage from "../pages/recipePage";
import Layout from "@/components/layouts/layout";
import Recipe from "@/pages/recipi";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // This means "/"
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "recipe",
        element: <RecipePage />,
      },
      {
        path: "recipe/:id",
        element: <Recipe/>
      }
    ],
  },
]);
