import { RecipeService } from "@/services/recipe-services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatResponse } from "@/types";


export default function Chat() {
  const [chatQuery, setChatQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const { data, isLoading } = useQuery<ChatResponse>({
    queryKey: ["chat", chatQuery],
    queryFn: () => RecipeService.chat(chatQuery),
    enabled: chatQuery.length > 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setChatQuery(inputValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="How can I make pastries..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      {isLoading && <p>Loading...</p>}
      
      {data && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">{data.answerText}</p>

          {data.media && data.media.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Media</h3>
              <div className="flex flex-wrap gap-2">
                {data.media.map((item, index) => (
                  <div key={index} className="border rounded p-2">
                    {/* Render media items according to their type */}
                    {item.title}
                    <img src={item.image} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}