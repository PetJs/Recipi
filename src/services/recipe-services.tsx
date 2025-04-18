import axiosInstance from "@/api/axios";
import {  AuthUser, NutirionInfo, Random, Recipe, User } from "@/types";


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

    static async getRecipeDetails(id: number): Promise<Recipe> {
        try {
          const response = await axiosInstance.get(`recipes/${id}/information`);
          const results = response.data; 
          console.log(results)
          return results;
        } catch (err) {
          console.error("Recipe Not Found", err);
          throw err;
        }
    }

    static async getFoodNutrients(id: number): Promise<NutirionInfo>{
        try{
            const response = await axiosInstance.get(`recipes/${id}/nutritionWidget.json`);
            const result = response.data;
            console.log(result);
            return result;
        }catch(err){
            console.error("Nutrients Not found", err);
            throw err;
        }
    }

    static async connect(
        user: Omit<User, "spoonacularPassword">
      ): Promise<AuthUser> {
        try {
          const response = await axiosInstance.post("/users/connect", user);
          const result = response.data;
          return result;
        } catch (error) {
          console.error("Error registering user:", error);
          throw error;
        }
    }

    static async generateMealPlan(timeFrame: string, targetCalories: number, diet: string): Promise<Random[]> {
        try {
            if ((timeFrame || targetCalories || diet) === null ) return [];
            
            const response = await axiosInstance.get("mealplanner/generate", {
                params: {
                  timeFrame,
                  targetCalories,
                  diet,
                },
            });
              
            // For "day", the API returns { meals: [...], nutrients: {...} }
            if (timeFrame.toLowerCase() === "day") {
                return response.data.meals;
            } 
            // For "week", the API returns { week: { monday: { meals: [...], nutrients: {...} }, ... } }
            else if (timeFrame.toLowerCase() === "week") {
                // Flatten the meals from each day in the week
                const weekPlan = response.data.week;
                if (!weekPlan) return []; // Ensure weekPlan exists
            
                // Assuming each day has a "meals" property:
                const weekMeals: Random[] = Object.values(weekPlan)
                    .flatMap((day: any) => day.meals || []);
                return weekMeals;
            }
            
            return [];
        } catch(err) {
            console.error(`Error generating meals:`, err);
            return []; // Return empty array on error
        }
    }

    static async getShoppingList(username: string, hash: string): Promise<any>{
        try{
            const response = await axiosInstance.get(`mealplanner/${username}/shopping-list`, {
                params:{
                    hash,
                }
            });
            const result = response.data.aisles;
            console.log("Resp:", result);
            return result;
        }catch(err){
            console.error("Shopping Not found", err);
            throw err;
        }
    }

    static async addItem( username: string, hash: string, payload: { item: string; parse: boolean }): Promise<any> {
        try {
          const response = await axiosInstance.post(`mealplanner/${username}/shopping-list/items`,payload, {
            params:{
                hash,
            }
          });
          const result = response.data;
          return result;
        } catch (error) {
          console.error("Error Adding Item:", error);
          throw error;
        }
    }
      
}


