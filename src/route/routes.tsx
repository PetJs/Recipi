import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import ContactPage from "../pages/contactPage";
import RecipePage from "../pages/recipePage";
import Layout from "@/components/layouts/layout";
import Recipe from "@/pages/recipi";
import Favourites from "@/pages/kitchen/bookmark";
import MealPlanning from "@/pages/kitchen/mealPlanning";
import ShoppingList from "@/pages/kitchen/shoppingList";



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
      },
      {
        path: "favourite",
        element: <Favourites/>,
      },
      {
        path: "meal-planning",
        element: <MealPlanning/>,
      },
      {
        path: "shopping-list",
        element: <ShoppingList/>,
      }
    ],
  },
]);
