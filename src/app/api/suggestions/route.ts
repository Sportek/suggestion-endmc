import { SuggestionType, SuggestionsData } from "@/app/database/SuggestionsData";
import { currentProfile } from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const data = await new SuggestionsData().getAllSuggestions();
    return Response.json(data);
}


// Bon normalement on peut utiliser les folder [title]/[suggestion], mais j'ai pas trop compris comment ça marche,
// donc va falloir le changer pour plus tard...
export async function POST(request: NextRequest) {

    const profile = await currentProfile();
    
    if(!profile) return new NextResponse("Unauthorized", {status: 401});
    
    const suggestionData = new SuggestionsData();
    
    const title = request.nextUrl.searchParams.get("title");
    const suggestion = request.nextUrl.searchParams.get("suggestion");

    if(!(title && suggestion)) return new NextResponse("Bad request", {status: 400});

    const sugges: SuggestionType = {
        suggestionId: "temp",
        authorId: profile.userId,
        title,
        suggestion,
        likes: [],
        dislikes: []
    }
    suggestionData.createSuggestion(sugges);
    return NextResponse.json(sugges);
}