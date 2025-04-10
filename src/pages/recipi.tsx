import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { RecipeService } from "@/services/recipe-services";
import Instagram from "@/assets/svgs/004-instagram.svg"
import Timer from "@/assets/svgs/Timer.svg"
import Fork from "@/assets/svgs/ForkKnife.svg"
import Button from "@/components/common/button";
import Rocola from "../assets/images/rucola-png.png"
import PhotoPlate from "../assets/images/Photo-plate.png"
import Salad from "../assets/images/kisspng-salad-salad-fresh-food-healthylife-vegetables-vegetarian-5d42e3a7cb8543 1.png"

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
    <div className=" p-4 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{data.title}</h1>
      
      <div className="flex">
        <div className="flex md:gap-2 gap-1">
            <img src={Instagram} alt="" />
            <div>
                <p className="md:text-[16px] text-[8px] font-semibold">John Smith</p>
                <p className="md:text-[16px] text-[8px] text-gray-500">15 March 2022</p>
            </div>
        </div>
        <hr className="transform rotate-90 md:w-14 w-10 md:mt-5 mt-3 border-1 border-gray-300" />

        <div className="flex md:gap-2 gap-1">
            <img src={Timer} alt="" />
            <div>
                <p className="md:text-[16px] text-[8px]">PREP TIME</p>
                <p className="md:text-[16px] text-[8px] text-gray-500">{data.readyInMinutes} Minutes</p>
            </div>
        </div>
        <hr className="transform rotate-90 md:w-14 w-10 md:mt-5 mt-3 border-1 border-gray-300" />

        <div className="flex md:gap-2 gap-1">
            <img src={Fork} alt="" />
            <div>
                <p className="md:text-[16px] text-[8px] ">{data.dishTypes[0]}</p>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto rounded-lg shadow"
                />
            </div>

        
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4 rounded-lg bg-gradient-to-t from-[#87CEEB] to-[#87CEEB]/10">
                <h2 className="text-lg font-bold">DESCRIPTION</h2>
                <p dangerouslySetInnerHTML={{ __html: data?.summary || "" }}></p>
            </div>
        </div>

        {/* Ingredients */}
        <div>
            <h2 className="text-2xl font-semibold mb-2">INGREDIENTS</h2>
            <ul className="list-disc list-inside space-y-1">
            {data.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
            ))}
            </ul>
        </div>

        {/* Instructions */}
        <div>
            <h2 className="text-2xl font-semibold mb-2">DIRECTIONS</h2>
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

        <div className="relative bg-[#E7F9FD] rounded-lg flex flex-col justify-center items-center text-center m-4 p-4">
            <img src={Salad} alt="" className="absolute bottom-0 w-24 md:w-44 left-0" />
                <div className="absolute bottom-1 right-8 w-24 md:w-36 flex">
                    <img src={Rocola} alt="" className="w-8 h-8" />
                    <img src={PhotoPlate} alt="" />
                </div>
            <h1 className="text-xl font-semibold">Deliciousness to your Inbox</h1>
            <p className="md:w-[50%] w-[75%] line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius rerum asperiores quos molestiae suscipit culpa na</p>

            <div className="relative p-1 flex items-center justify-center">
                <div className="">
                    <input type="text" name="" id="" className="md:w-[500px] w-full pr-36 p-2 rounded-lg " />
                    <Button text="Subscribe" className="absolute top-2.5 right-2 "/>
                </div>
            </div>
        </div>
    </div>
  );
}
