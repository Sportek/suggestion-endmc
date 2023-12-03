import { SuggestionsData } from "@/app/database/SuggestionsData";
import { currentProfile } from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const appreciate = body.appreciate;
  const suggestionId = body.suggestionId;

  const profile = await currentProfile();

  if (!profile) return new NextResponse("Unauthorized", { status: 401 });

  if ((appreciate !== "like" && appreciate !== "dislike") || !suggestionId)
    return new NextResponse("Bad request", { status: 400 });

  const suggestionData = new SuggestionsData();

  await suggestionData.appreciateSuggestion(
    profile.userId,
    suggestionId,
    appreciate
  );

  const suggestion = await suggestionData.getSuggestionById(suggestionId);

  return NextResponse.json(suggestion);
}
