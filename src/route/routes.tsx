import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage"
import ContactPage from "../pages/contactPage"
import RecipePage from "../pages/recipePage"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>, 
    },
    {
        path: "/contact",
        element: <ContactPage/>
    },
    {
        path: "/recipe",
        element: <RecipePage/>
    }
])