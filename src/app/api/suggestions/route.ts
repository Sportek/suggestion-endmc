import { SuggestionsData } from "@/app/database/SuggestionsData";

export async function GET(request: Request) {
    const data = await new SuggestionsData().getAllSuggestions();
    return Response.json(data);
}