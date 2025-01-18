import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/homePage"
import ContactPage from "./pages/contactPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/contact" element={<ContactPage/>}></Route>
    </Routes>
  )
}

export default App
