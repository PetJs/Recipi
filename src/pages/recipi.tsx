import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { RecipeService } from "@/services/recipe-services";

export default function Recipe() {
  const selectedRecipeId = useUserStore((state) => state.selectedRecipeId);

  const { data, isLoading } = useQuery({
    queryKey: ["recipe-details", selectedRecipeId],
    queryFn: () => RecipeService.getRecipeDetails(selectedRecipeId ?? 0),
    enabled: !!selectedRecipeId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No recipe found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{data.title}</h1>

      {/* Image */}
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-auto rounded-lg shadow"
      />

      {/* Time and Dish Types */}
      <div className="flex flex-wrap gap-4 items-center text-gray-700">
        <p><strong>Ready in:</strong> {data.readyInMinutes} minutes</p>
        <p>
          <strong>Dish Types:</strong>{" "}
          {data.dishTypes.length > 0 ? data.dishTypes.join(", ") : "N/A"}
        </p>
      </div>

      {/* Ingredients */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {data.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          {data.analyzedInstructions.map((instruction, i) => (
            <div key={i}>
              {instruction.steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}
