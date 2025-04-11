import { Outlet } from "react-router-dom";
import NavBar from "../common/navbar";
import Logo from "@/assets/svgs/recipi.png"
import Insta from "@/assets/svgs/004-instagram.svg"
import Facebook from "@/assets/svgs/001-facebook.svg"
import Twitter from "@/assets/svgs/003-twitter.svg"



export default function Layout() {

    return (
        <>
            <NavBar  
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
            <Outlet/>
        </>
    )
}