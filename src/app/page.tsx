"use client";
import { SuggestionType } from "./database/SuggestionsData";
import { useEffect, useState } from "react";
import { ContentPage } from "@/components/content-page";

export default function Home() {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  const handleNewSuggestion = (suggestion: SuggestionType) => {
    setSuggestions((oldSuggestions) => [suggestion, ...oldSuggestions]);
  };

  const POLLING_INTERVAL = 5000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/suggestions");
        const result = await response.json();
        setSuggestions(result);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    };
    fetchData();

    const pollData = async () => {
      await fetchData(); // Récupérer les données initiales

      // Lancer le polling à intervalles réguliers
      const intervalId = setInterval(async () => {
        await fetchData();
      }, POLLING_INTERVAL);

      // Nettoyer l'intervalle lorsque le composant est démonté
      return () => clearInterval(intervalId);
    };

    pollData();
  }, []);

  return (
    <main>
      <ContentPage suggestions={suggestions} callback={handleNewSuggestion} />
    </main>
  );
}
