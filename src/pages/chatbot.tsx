import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecipeService } from "@/services/recipe-services";
import { ChatResponse } from "@/types";

type ChatMessage = {
  type: "user" | "bot";
  text: string;
  media?: { title: string; image: string }[];
};

export default function Chat() {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [contextId, setContextId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setContextId(uuidv4());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");
    setChatHistory((prev) => [...prev, { type: "user", text: userText }]);

    setIsLoading(true);
    try {
      const response: ChatResponse = await RecipeService.chat(userText, contextId);
      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: userText },
        { type: "bot", text: response.answerText, media: response.media },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Ask me something about food..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </div>

      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto bg-gray-50 p-4 rounded-lg">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-md max-w-[75%] ${
              msg.type === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-green-100 self-start text-left"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>

            {msg.type === "bot" && msg.media && msg.media.length > 0 && (
              <div className="mt-2">
                {msg.media.map((item, i) => (
                  <div key={i} className="mt-2 border rounded p-2">
                    <p className="font-semibold">{item.title}</p>
                    <img src={item.image} alt={item.title} className="w-full max-w-xs rounded" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
