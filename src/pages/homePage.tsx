import { useEffect, useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/images/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/images/004-instagram.svg"
import Facebook from "../assets/images/001-facebook.svg"
import Twitter from "../assets/images/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"
import randomBg from "../assets/images/foofBg.jpg"
import img from "../assets/images/image 14.png"
import Timer from "../assets/images/Timer.svg"
import Forknife from "../assets/images/ForkKnife.svg"
import ListCard from "@/components/common/listCard"
import Vegan from "../assets/images/vegan.png"
import Breakfast from "../assets/images/breakfast.png"
import Meat from "../assets/images/meat.png"
import Dessert from "../assets/images/desert.png"
import Lunch from "../assets/images/Lunch.png"
import Chocolate from "../assets/images/chocolate.png"
import { Random } from "@/types"
import Card from "@/components/common/card"





function HomePage() {
    const [random, setRandom] = useState<Random | null>(null)
    const [cards, SetCards ] = useState<Random[] >([])

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

    const getNineRandomRecipe = async () => {
        try{
            const response = await axiosInstance.get('recipes/random?number=9')
            const results = response.data.recipes;
            SetCards(results)
            /* console.log(results) */
        }catch(error: any) {
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out - please try again');
            }
            throw error;
        }
        
    }

    useEffect(() => {
        getRandomRecipe();
        getNineRandomRecipe();
    }, [])


    return(
        <div className="h-screen">
            <NavBar 
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
            {/* HERO SECTION */}
            <div className="relative flex m-4 justify-between md:h-96 ">
                <div className="w-[50%] bg-[#E7FAFE] rounded-2xl rounded-r p-2">
                    <div className="flex rounded-lg bg-[#FFFFFF] w-fit items-center ">
                        <img src={img} alt="" className="w-3 h-3"/>
                        <h2 className="text-[16px] ">Hot Recipes</h2>
                    </div>
                    <h1 className="font-bold mdtext-xl text-lg max-w-2xl">{random?.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: random?.summary || "" }} className="text-sm line-clamp-4"/>
                    <div className="flex md:gap-6 gap-2 mt-2">
                        <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1">
                            <img src={Timer} alt="" className="w-3 h-3"/>
                            <p className="md:text-sm text-[12px] whitespace-nowrap">{random?.readyInMinutes } mins</p>
                        </div>
                        <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1 ">
                            <img src={Forknife} alt="" className="w-3 h-3"/>
                            <p className="md:text-sm text-[12px] whitespace-nowrap">{random?.dishTypes[0] }</p>
                        </div>
                    </div>                    
                </div>
                <div className="w-[50%] relative ">
                    <img src={randomBg} alt="" className="w-full h-full rounded-2xl rounded-l" />
                    <img src={random?.image || "https://img.spoonacular.com/recipes/639779-556x370.jpg"} alt="" className="absolute inset-0 md:m-14 md:w-64 md:h-64 h-24 w-24 m-6 rounded-full border border-gray-900 " />
                </div>
            </div>

            {/* Recipe Classification    */}
            <div className="bg-">
                <h2 className="text-xl font-bold m-2">Categories</h2>
                <div className="grid grid-cols-3 md:flex md:justify-evenly gap-1 m-2 place-items-center">
                    <ListCard 
                        img={{
                            src: Breakfast,
                            alt: "breakfast.png",
                            className: ""
                        }} 
                        text = "Breakfast"
                    />
                    <ListCard 
                        img={{
                            src: Vegan,
                            alt: "vegan.png",
                            className: ""
                        }} 
                        text = "Vegan"
                    />
                    <ListCard 
                        img={{
                            src: Meat,
                            alt: "meat.png",
                            className: ""
                        }} 
                        text = "Meat"
                    />
                    <ListCard 
                        img={{
                            src: Dessert,
                            alt: "dessert.png",
                            className: ""
                        }} 
                        text = "Dessert"
                    />
                    <ListCard 
                        img={{
                            src: Lunch,
                            alt: "lunch.png",
                            className: ""
                        }} 
                        text = "Lunch"
                    />
                    <ListCard 
                        img={{
                            src: Chocolate,
                            alt: "",
                            className: "chocolate.png"
                        }} 
                        text = "Chocolate"
                    />
                </div>
                
            </div>

            <div>
                <div className="flex justify-center flex-col items-center">
                    <h2 className="text-xl">Simple and tasty recipes</h2>
                    <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center m-4 bg-red-400 md:w-84 md:h-84">
                    {cards!.map((cards: Random) => (
                        <Card 
                            img={{
                                src: cards?.image, 
                                alt:"", 
                                className: ''
                            }}
                            title = {cards?.title}
                            time = {cards?.readyInMinutes}
                            food = {cards?.dishTypes[0]}
                        />
                    ))}
                </div>
            </div>
            
        </div>
        

    )
}


export default HomePage