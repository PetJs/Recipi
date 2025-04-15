import { useFavoriteStore } from "@/store/favouriteStore";
import Card from "@/components/common/card";

export default function Favorites() {
  const { favorites, removeFavorite, isFavorite } = useFavoriteStore();

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Recipes ❤️</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <Card
              key={recipe.id}
              img={{ src: recipe.image, alt: recipe.title }}
              title={recipe.title}
              time={recipe.readyInMinutes}
              food={recipe.dishTypes[0]}
              isFavorited={isFavorite(recipe.id)}
              onToggleFavorite={() => removeFavorite(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


