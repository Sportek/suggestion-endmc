"use client";
import { SuggestionType } from "./database/SuggestionsData";
import { useEffect, useState } from "react";
import { ContentPage } from "@/components/content-page";

import io from "socket.io-client";

export default function Home() {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  useEffect(() => {
    // const socket = io();
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

    // socket.on("newSuggestion", (suggestion) => {
    //   setSuggestions((prevSuggestions) => [...prevSuggestions, suggestion]);
    // });

    // // Clean up the socket connection on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <main>
      <ContentPage suggestions={suggestions} />
    </main>
  );
}
