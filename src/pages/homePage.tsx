
import Logo from "../assets/images/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/images/004-instagram.svg"
import Facebook from "../assets/images/001-facebook.svg"
import Twitter from "../assets/images/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"

function HomePage() {

    return(
        <NavBar 
            Logo={Logo}
            Facebook={Facebook}
            Twitter={Twitter}
            Insta={Insta}
        />
    )
}


export default HomePage