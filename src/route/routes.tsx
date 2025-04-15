import Layout from "@/components/layouts/layout";
import KitchenLayout from "@/components/layouts/kitchen-layout";
import HomePage from "@/pages/homePage";
import ContactPage from "@/pages/contactPage";
import RecipePage from "@/pages/recipePage";
import Recipe from "@/pages/recipi";
import Favorites from "@/pages/kitchen/bookmark";
import MealPlanning from "@/pages/kitchen/mealPlanning";
import ShoppingList from "@/pages/kitchen/shoppingList";
import { generateRoutes } from "./generate-routes";


export const routeConfig = [
  {
    layout: Layout,
    children: [
      {
        path: "/",
        element: HomePage
      },
      {
        path: "recipe",
        element: RecipePage,
      },
      {
        path: "recipe/:id",
        element: Recipe,
      },
      {
        path: "contact",
        element: ContactPage
      },
      {
        path: "kitchen",
        element: KitchenLayout,
        children: [
          { path: "favourite", element: Favorites },
          { path: "meal-planning", element: MealPlanning },
          { path: "shopping-list", element: ShoppingList }
        ]
      }
    ]
  }
  
];



export const Routes = generateRoutes(routeConfig);
