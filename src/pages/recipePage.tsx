import {useState } from "react"
import Loading from "../assets/svgs/loading.svg"
import Card from "@/components/common/card"
import Vegan from "../assets/images/vegan.png"
import Breakfast from "../assets/images/breakfast.png"
import Meat from "../assets/images/meat.png"
import Dessert from "../assets/images/desert.png"
import Lunch from "../assets/images/Lunch.png"
import Chocolate from "../assets/images/chocolate.png"
import ListCard from "@/components/common/listCard"
import { RecipeService } from "@/services/recipe-services"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "@/store/userStore";

const setSelectedRecipeId = useUserStore((state) => state.setSelectedRecipeId);

function RecipePage(){
    const [searchQuery, setSearchQuery] = useState("");
    // Create a function to handle category selection
    const [selectedCategory, setSelectedCategory] = useState("Breakfast");

    const { data: searchData, isLoading: searchLoading } = useQuery({
        queryKey: ["search-recipes", searchQuery],
        queryFn: () => RecipeService.searchRecipes(searchQuery),
        enabled: searchQuery.length > 0,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryKey: ["get-meals", selectedCategory],
        queryFn: () => RecipeService.getMeals(selectedCategory),
        enabled: !!selectedCategory
    });


    // Update the getMeals function for the onClick handlers
    const getMeals = (category: string) => {
        setSelectedCategory(category);
    };



    return(
        <div className="h-screen">
            <div className="relative m-4 ">
                <h2 className="">Let's find the right recipe to create your memorable dish</h2>
                <div className="relative">
                    <input type="text"placeholder="Type your recipe" onChange={handleSearch} className=" bg-gray-800 justify-center w-full md:w-[50%] m-2 p-2 rounded-3xl text-white"  />
                </div> 
                {searchLoading && (
                    <div className="flex justify-center items-center">
                        <img src={Loading} alt="loading.svg" className="animate-spin " />
                    </div>
                    
                )}
                {!searchLoading && (!searchData || searchData.length === 0) && searchQuery && (
                    <p className="text-center text-gray-500">No recipes found. Try searching for something else!</p>
                )}
                {searchData && searchData.length > 0 && (
                    <div className="grid overscroll-x-auto grid-cols-3 gap-6 mt-4">
                        {searchData.map((recipe) => (
                            <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)} >
                                <Card
                                    img={{
                                        src: recipe?.image, 
                                        alt:"", 
                                        className: ''
                                    }}
                                    title = {recipe?.title}
                                    time = {recipe?.readyInMinutes}
                                    food = {recipe?.dishTypes?.[0] || "N/A"}
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
                    {categoryLoading && (
                        <div className="flex justify-center items-center">
                            <img src={Loading} alt="loading.svg" className="animate-spin " />
                        </div>
                        
                    )}
                    {!categoryLoading && (!categoryData || categoryData.length === 0) && (
                        <p className="text-center text-gray-500">No recipes found. Try searching for something else!</p>
                    )}
                    {categoryData && categoryData.length > 0 && (
                        <div className="grid overscroll-x-auto grid-cols-3 gap-6 mt-4">
                            {categoryData.map((recipe) => (
                                <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)} >
                                    <Card
                                        img={{
                                            src: recipe?.image, 
                                            alt:"", 
                                            className: ''
                                        }}
                                        title = {recipe?.title}
                                        time = {recipe?.readyInMinutes}
                                        food = {recipe?.dishTypes?.[0] || "N/A"}
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