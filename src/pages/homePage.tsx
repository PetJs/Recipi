import { useEffect, useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/images/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/images/004-instagram.svg"
import Facebook from "../assets/images/001-facebook.svg"
import Twitter from "../assets/images/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"
import randomBg from "../assets/images/foofBg.jpg"
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
        // getRandomRecipe()
    }, [])


    return(
        <div>
            <NavBar 
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
            {/* HERO SECTION */}
            <div className="relative flex bg-red-500 m-4 justify-between h-96">
                <div className="bg-blue-700 w-[50%] rounded-2xl rounded-r">
                    <h1>{random?.title || "Spicy delicous COder"}</h1>
                    <p dangerouslySetInnerHTML={{ __html: random?.summary || "lorem ipsum jare" }} />
                    <div>
                        <p>{random?.readyInMinutes || 20}</p>
                        <p>{random?.diets[0] || "Chicken"}</p>
                    </div>                    
                </div>
                <div className="w-[50%] relative ">
                    <img src={randomBg} alt="" className="w-full h-full rounded-2xl rounded-l" />
                    <img src={random?.image || "https://img.spoonacular.com/recipes/639779-556x370.jpg"} alt="" className="absolute inset-0 m-14 w-64 h-64 rounded-full border border-gray-900 " />
                </div>
            </div>
            
        </div>
        

    )
}


export default HomePage