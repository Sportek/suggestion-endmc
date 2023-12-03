import { SuggestionType } from "@/app/database/SuggestionsData";
import { PostSuggestion } from "./post-suggestion";
import { Profile } from "./profile";
import { Suggestion } from "./suggestion";
import { useEffect, useState } from "react";

export interface AuthorData {
  name: string;
  imageUrl: string;
}

export function ContentPage({
  suggestions,
}: {
  suggestions: SuggestionType[] | undefined;
}) {
  const [authors, setAuthors] = useState<Record<string, AuthorData>>({});

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsData: Record<string, AuthorData> = {};
      for (const item of suggestions || []) {
        try {
          const response = await fetch(`/api/users/${item.authorId}`);
          const result = await response.json();
          authorsData[item.authorId] = result;
        } catch (error) {
          console.error(
            "Une erreur s'est produite lors de la récupération des données :",
            error
          );
        }
      }
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, [suggestions]);

  return (
    <main>
      <div>
        <PostSuggestion />
        {suggestions?.map((item, index) => {
          const author = authors[item.authorId];
          if (!author) return null;

          // Ouin pas terrible... je regrette un peu mon choix d'utiliser mongodb sans orm clean :(
          const { _id, ...newSuggestion } = item;
          return (
            <Suggestion suggestion={newSuggestion} key={index}>
              <Profile
                name={author.name}
                title="OP"
                profileUrl={author.imageUrl}
              />
            </Suggestion>
          );
        })}
      </div>
    </main>
  );
}
