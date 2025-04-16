import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { RecipeService } from "@/services/recipe-services";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/common/card";
import { useFavoriteStore } from "@/store/favouriteStore";
import { Random } from "@/types";

type MealPlanFormValues = {
  timeFrame: string;
  targetCalories: number;
  diet: string;
};

export default function MealPlanning() {
    const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const form = useForm<MealPlanFormValues>({
    defaultValues: {
      timeFrame: "",
      targetCalories: 0,
      diet: "",
    },
  });

  // Watch these fields for changes
  const timeFrame = form.watch("timeFrame");
  const targetCalories = form.watch("targetCalories");
  const diet = form.watch("diet");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["meal-plan", timeFrame, targetCalories, diet],
    queryFn: () => RecipeService.generateMealPlan(timeFrame, targetCalories, diet),
    enabled: Boolean(timeFrame && targetCalories && diet),
    refetchOnWindowFocus: false,
  });

  const onSubmit = (_values: MealPlanFormValues) => {
    // Refetch the data on form submission
    refetch();
  };

     const handleFavoriteToggle = (recipe: any) => {
        if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id);
        } else {
        addFavorite(recipe);
        }
    };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Generate A Meal Plan</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[400px] bg-white mt-6 rounded-2xl shadow-md p-6">
          <FormField
            control={form.control}
            name="timeFrame"
            rules={{ required: "Time frame is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Frame</FormLabel>
                <FormControl>
                  <Input placeholder="day, week, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetCalories"
            rules={{
              required: "Target calories are required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Calories</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diet"
            rules={{ required: "Diet is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diet</FormLabel>
                <FormControl>
                    <select {...field} className="border p-1 ml-2 rounded">
                        <option value="">Select a diet</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto vegetarian">Lacto-Vegetarian</option>
                        <option value="ovo vegetarian">Ovo-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescetarian">Pescetarian</option>
                        <option value="paleo">Paleo</option>
                        <option value="primal">Primal</option>
                        <option value="low FODMAP">Low FODMAP</option>
                        <option value="whole30">Whole30</option>
                    </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-green-500 text-white py-2 mt-4">
            Generate Meal Plan
          </Button>
        </form>
      </Form>

      {isLoading && <p>Loading meal plan...</p>}
      {data && data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Meal Plan</h3>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {data.map((meal: Random, ) => (
                <Card
                    key={meal.id}
                    img={{
                        src: `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}` || "", 
                        alt:"", 
                        className: ''
                    }}
                    title={meal.title}
                    time={meal.readyInMinutes}
                    isFavorited={isFavorite(meal.id)}
                    onToggleFavorite={() => handleFavoriteToggle(meal)}
            />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
