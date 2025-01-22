import { useState } from "react"
import axiosInstance from "@/api/axios"
import Logo from "../assets/images/Cooking Template 🟣 by Flowbase.co (Community).svg"
import Insta from "../assets/images/004-instagram.svg"
import Facebook from "../assets/images/001-facebook.svg"
import Twitter from "../assets/images/003-twitter.svg"
import NavBar from "@/components/layouts/navbar"
import { Random } from "@/types"

function RecipePage(){
    const [searchData, setSearchData] = useState<Random[] >([])
    const [loading, setLoading] = useState(false);

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
                    <input type="text"placeholder="Type your recipe" onChange={Search} className=" bg-gray-800 justify-center w-full md:w-[50%] m-2 p-2 rounded-3xl"  />
                </div> 
                {loading && (
                    <p className="text-center text-gray-600">Loading...</p>
                )}
                {!loading && searchData.length === 0 && (
                    <p className="text-center text-gray-500">No recipes found. Try searching for something else!</p>
                )}
                {searchData && searchData.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {searchData.map((recipe) => (
                            <div key={recipe.id} className="card bg-white shadow-md p-4 rounded-lg">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title} 
                                    className="w-full h-40 object-cover rounded-md" 
                                />
                                <h3 className="text-lg font-semibold mt-2 text-center">{recipe.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default RecipePage