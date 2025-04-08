import { useEffect, useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/svgs/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/svgs/004-instagram.svg"
import Facebook from "../assets/svgs/001-facebook.svg"
import Twitter from "../assets/svgs/003-twitter.svg"
import NavBar from "@/components/common/navbar"

function ContactPage(){


    return(
        <div className="h-screen">
            <NavBar 
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
        </div>
    )
}

export default ContactPage