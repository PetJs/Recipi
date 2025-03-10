import { useEffect, useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/svgs/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/svgs/004-instagram.svg"
import Facebook from "../assets/svgs/001-facebook.svg"
import Twitter from "../assets/svgs/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"
import Loading from "../assets/svgs/loading.svg"
import Card from "@/components/common/card"
import Vegan from "../assets/images/vegan.png"
import Breakfast from "../assets/images/breakfast.png"
import Meat from "../assets/images/meat.png"
import Dessert from "../assets/images/desert.png"
import Lunch from "../assets/images/Lunch.png"
import Chocolate from "../assets/images/chocolate.png"
import { Random } from "@/types"
import ListCard from "@/components/common/listCard"

function RecipePage(){
    const [searchData, setSearchData] = useState<Random[] >([])
    const [loading, setLoading] = useState(false);
    const [recipeData, setRecipeData] = useState<Random[]>([])

    const Search = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        if(!query){
            setSearchData([])
            return ;   
        }
        setLoading(true);

        try{
            const response = await axiosInstance.get('recipes/complexSearch', {
                params: {
                    query,
                    number: 3
                }
            });
            const results = response.data.results;
            setSearchData(results);
        }catch(err){
            console.log(err)
        }finally {
            setLoading(false); // Stop loading
        }
    }

    const getMeals = async(tag: string) => {
        try{
            const results = await axiosInstance.get("recipes/random", {
                params: {
                    tags: tag.toLowerCase(),
                    number: 9
                }
            })
            const response = results.data.recipes
            setRecipeData(response)
        }catch(err){
            console.error(`Error fetching ${tag} recipes:`, err);
        }
    }

    useEffect ( ()=> {
        getMeals("Breakfast");
    }, [])


    return(
        <div className="h-screen">
            <NavBar  
                Logo={Logo}
                Facebook={Facebook}
                Twitter={Twitter}
                Insta={Insta}
            />
            <div className="relative m-4 ">
                <h2 className="">Let's find the right recipe to create your memorable dish</h2>
                <div className="relative">
                    <input type="text"placeholder="Type your recipe" onChange={Search} className=" bg-gray-800 justify-center w-full md:w-[50%] m-2 p-2 rounded-3xl text-white"  />
                </div> 
                {loading && (
                    <div className="flex justify-center items-center">
                        <img src={Loading} alt="loading.svg" className="animate-spin " />
                    </div>
                    
                )}
                {!loading && searchData.length === 0 && (
                    <p className="text-center text-gray-500">No recipes found. Try searching for something else!</p>
                )}
                {searchData && searchData.length > 0 && (
                    <div className="grid overscroll-x-auto grid-cols-3 gap-6 mt-4">
                        {searchData.map((recipe) => (
                            <div key={recipe.id} >
                                <Card
                                    img={{
                                        src: recipe?.image, 
                                        alt:"", 
                                        className: ''
                                    }}
                                    title = {recipe?.title}
                                    time = {recipe?.readyInMinutes}
                                    food = {recipe?.dishTypes[0]}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
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
                        onClick={() => getMeals("Breakfast")}
                    />
                    <ListCard 
                        img={{
                            src: Vegan,
                            alt: "vegan.png",
                            className: ""
                        }} 
                        text = "Vegan"
                        onClick={() => getMeals("Vegan")}
                    />
                    <ListCard 
                        img={{
                            src: Meat,
                            alt: "meat.png",
                            className: ""
                        }} 
                        text = "Meat"
                        onClick={() => getMeals("Meat")}
                    />
                    <ListCard 
                        img={{
                            src: Dessert,
                            alt: "dessert.png",
                            className: ""
                        }} 
                        text = "Dessert"
                        onClick={() => getMeals("Dessert")}
                    />
                    <ListCard 
                        img={{
                            src: Lunch,
                            alt: "lunch.png",
                            className: ""
                        }} 
                        text = "Lunch"
                        onClick={() => getMeals("Lunch")}
                    />
                    <ListCard 
                        img={{
                            src: Chocolate,
                            alt: "",
                            className: "chocolate.png"
                        }} 
                        text = "Chocolate"
                        onClick={() => getMeals("Chocolate")}
                    />
                </div>

                <div className="mt-6 ">
                    {loading && (
                        <div className="flex justify-center items-center">
                            <img src={Loading} alt="loading.svg" className="animate-spin " />
                        </div>
                        
                    )}
                    {!loading && recipeData.length === 0 && (
                        <p className="text-center text-gray-500">No recipes found. Try searching for something else!</p>
                    )}
                    {recipeData && recipeData.length > 0 && (
                        <div className="grid overscroll-x-auto grid-cols-3 gap-6 mt-4">
                            {recipeData.map((recipe) => (
                                <div key={recipe.id} >
                                    <Card
                                        img={{
                                            src: recipe?.image, 
                                            alt:"", 
                                            className: ''
                                        }}
                                        title = {recipe?.title}
                                        time = {recipe?.readyInMinutes}
                                        food = {recipe?.dishTypes[0]}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default RecipePage