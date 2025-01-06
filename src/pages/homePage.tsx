import { useEffect, useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/images/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/images/004-instagram.svg"
import Facebook from "../assets/images/001-facebook.svg"
import Twitter from "../assets/images/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"
import { Random } from "@/types"




function HomePage() {
    const [random, setRandom] = useState<Random | null>(null)

    const getRandomRecipe = async () => {
        try{
            const response = await axiosInstance.get('recipes/random')
            const results = response.data.recipes[0];
            setRandom(results)
            /* console.log(results) */
        }catch(error: any) {
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out - please try again');
            }
            throw error;
        }
        
    }

    useEffect(() => {
        getRandomRecipe()
    }, [])


    return(
        <div>
            <NavBar 
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
            <p dangerouslySetInnerHTML={{ __html: random?.summary || "" }} />
            <img src={random?.image} alt="" />
            <p>{random?.title}</p>
            <p>{random?.readyInMinutes}</p>
        </div>
        

    )
}


export default HomePage