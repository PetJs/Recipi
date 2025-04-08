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
}


