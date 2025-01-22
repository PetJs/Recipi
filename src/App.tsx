import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/homePage"
import ContactPage from "./pages/contactPage"
import RecipePage from "./pages/recipePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/contact" element={<ContactPage/>}></Route>
      <Route path="/recipe" element={<RecipePage/>}></Route>
    </Routes>
  )
}

export default App
