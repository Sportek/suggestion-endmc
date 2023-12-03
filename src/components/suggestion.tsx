"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import axios from "axios";
import qs from "query-string";
import { SuggestionType } from "@/app/database/SuggestionsData";
import { useState } from "react";

interface SuggestionProps {
  children: React.ReactNode;
  suggestion: SuggestionType;
}

export function Suggestion({ children, suggestion }: SuggestionProps) {
  const [likes, setLikes] = useState(suggestion.likes.length);
  const [dislikes, setDislikes] = useState(suggestion.dislikes.length);

  const likeFunction = async () => {
    const url = qs.stringifyUrl({ url: "/api/suggestions/appreciate" });
    try {
      const res = await axios.post(url, {
        appreciate: "like",
        suggestionId: suggestion.suggestionId,
      });

      setDislikes(() => res.data.dislikes.length);
      setLikes(() => res.data.likes.length);
    } catch (error) {
      console.error("Erreur lors de la requête likeFunction:", error);
    }
  };

  const dislikeFunction = async () => {
    const url = qs.stringifyUrl({ url: "/api/suggestions/appreciate" });
    try {
      const res = await axios.post(url, {
        appreciate: "dislike",
        suggestionId: suggestion.suggestionId,
      });

      setLikes(() => res.data.likes.length);
      setDislikes(() => res.data.dislikes.length);
    } catch (error) {
      console.error("Erreur lors de la requête dislikeFunction:", error);
    }
  };

  return (
    <div className="flex flex-row items-center p-2 rounded-sm bg-yellow-50 relative">
      <div className="w-[150px]">{children}</div>
      {/* <Separator orientation="vertical" /> */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex p-2 flex-col gap-2">
          <div className="font-medium">{suggestion.title}</div>
          <div className="flex flex-col gap-2">
            <div>Suggestion</div>
            <div className="p-2 bg-yellow-100 rounded-sm">
              {suggestion.suggestion}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={async () => await likeFunction()}
          >
            <div className="flex flex-row justify-center align-middle gap-2">
              <div>{likes}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#F44336"
                  d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
                />
              </svg>
            </div>
          </Button>
          <Button
            variant="secondary"
            onClick={async () => await dislikeFunction()}
          >
            <div className="flex flex-row justify-center align-middle gap-2">
              <div>{dislikes}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#F44336"
                  d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
                />
                <path
                  fill="#37474F"
                  d="M3.563 6.396L6.39 3.568l37.966 37.966l-2.828 2.828z"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
