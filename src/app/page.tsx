"use client"
import { SuggestionType, SuggestionsData } from './database/SuggestionsData';
import { useEffect, useState } from 'react';
import { ContentPage } from '@/components/content-page';

export default function Home() {

  const [suggestions, setSuggestions] = useState<SuggestionType[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Called");
      try {
        const response = await fetch("/api/suggestions");
        const result = await response.json();
        setSuggestions(result);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);
  



  return (
    <main>
      <ContentPage suggestions={suggestions}/>
    </main>
  )
}
