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
    <div className="flex flex-row items-center gap-2 p-2 border bg-slate-100 relative">
      {children}
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex p-2 flex-col">
          <div className="font-medium">{suggestion.title}</div>
          <div>{suggestion.suggestion}</div>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={async () => await likeFunction()}
          >
            {likes} 👍
          </Button>
          <Button
            variant="secondary"
            onClick={async () => await dislikeFunction()}
          >
            {dislikes} 👎
          </Button>
        </div>
      </div>
    </div>
  );
}
