import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { RecipeService } from "@/services/recipe-services";


export default function Recipe(){
    const selectedRecipeId = useUserStore((state) => state.selectedRecipeId);

    const { data, isLoading } = useQuery({
      queryKey: ["recipe-details", selectedRecipeId],
      queryFn: () => RecipeService.getRecipeDetails(selectedRecipeId ?? 0),
      enabled: !!selectedRecipeId,
    });

    
    return(
        <div>
            {data?.map((items) => (
                <div key={items.id}>
                    <p>{items.title}</p>
                    <p>{items.title}</p>
                    <img src={items.image} alt="" />
                </div>
            ))}

        </div>
    )
}
