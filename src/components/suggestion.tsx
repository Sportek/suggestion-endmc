"use client"
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

interface SuggestionProps {
    children: React.ReactNode;
    suggestion: string;

}

export function Suggestion({children, suggestion} : SuggestionProps) {
    
    return (
        <div className="flex flex-row items-center gap-2 p-2 border bg-slate-100 relative">
            {children}
            <Separator orientation="vertical"/>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex p-2">{suggestion}</div>

                <div className="flex flex-row gap-2 justify-end">
                    <Button variant="secondary" onClick={() => alert("like")}>👍</Button>
                    <Button variant="secondary" onClick={() => alert("dislike")}>👎</Button>
                </div>
            </div>
        </div>
    )
}