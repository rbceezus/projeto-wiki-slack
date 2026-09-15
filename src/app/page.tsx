"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import CharacterList from "@/components/CharacterList";
import CharacterForm from "@/components/CharacterForm";

type View = "characters" | "add";

export default function Home() {
  const [view, setView] = useState<View>("characters");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/characters");
      const data = await res.json();
      setCharacters(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  function handleCreated() {
    fetchCharacters();
    setView("characters");
  }

  return (
    <div className="h-full flex bg-slack-bg">
      <Sidebar activeView={view} onNavigate={setView} />
      <main className="flex-1 flex flex-col bg-slack-content min-w-0">
        {view === "characters" ? (
          <CharacterList characters={characters} loading={loading} />
        ) : (
          <CharacterForm onCreated={handleCreated} />
        )}
      </main>
    </div>
  );
}
