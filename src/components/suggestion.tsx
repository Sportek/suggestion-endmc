"use client"
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import axios from "axios";
import qs from "query-string"
import { SuggestionType } from "@/app/database/SuggestionsData";

interface SuggestionProps {
    children: React.ReactNode;
    suggestion: SuggestionType;

}

export function Suggestion({children, suggestion} : SuggestionProps) {

    const likeFunction = async () => {
        const url = qs.stringifyUrl({ url: "/api/suggestions/appreciate" })
        await axios.post(url, {appreciate: "like", suggestionId: suggestion.suggestionId});
    }

    const dislikeFunction = async () => {
        const url = qs.stringifyUrl({ url: "/api/suggestions/appreciate" })
        await axios.post(url, {appreciate: "dislike", suggestionId: suggestion.suggestionId});
    }
    
    return (
        <div className="flex flex-row items-center gap-2 p-2 border bg-slate-100 relative">
            {children}
            <Separator orientation="vertical"/>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex p-2">{suggestion.suggestion}</div>

                <div className="flex flex-row gap-2 justify-end">
                    <Button variant="secondary" onClick={() => likeFunction()}>👍</Button>
                    <Button variant="secondary" onClick={() => dislikeFunction()}>👎</Button>
                </div>
            </div>
        </div>
    )
}