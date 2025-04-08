import axiosInstance from "@/api/axios";
import { Random } from "@/types";


export class RecipeService{
    static async getRandomRecipe (): Promise<Random> {
        try{
            const response = await axiosInstance.get('recipes/random')
            return response.data.recipes[0];
        }catch(error: any) {
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out - please try again');
            }
            throw error;
        }
    }

    static async getNineRandomRecipe (): Promise<Random[]>{
        try{
            const response = await axiosInstance.get('recipes/random?number=9')
            return response.data.recipes;
            /* console.log(results) */
        }catch(error: any) {
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out - please try again');
            }
            throw error;
        }
    }

    static async getMeals (tag: string): Promise<Random[]>{
        try{
            const response = await axiosInstance.get("recipes/random", {
                params: {
                    tags: tag.toLowerCase(),
                    number: 9
                }
            })
            return response.data.recipes;
        }catch(err){
            console.error(`Error fetching ${tag} recipes:`, err);
            throw err
        }
    }

    
    static async searchRecipes(query: string): Promise<Random[]> {
        try {
            if (!query) return [];
            
            const response = await axiosInstance.get('recipes/complexSearch', {
                params: {
                    query,
                    number: 3
                }
            });
            return response.data.results;
        } catch(err) {
            console.error(`Error searching recipes:`, err);
            return []; // Return empty array on error
        }
    }
}


