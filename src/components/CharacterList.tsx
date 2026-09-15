"use client";

import { useState } from "react";
import { Star, Shield, Skull, Swords, X, ChevronRight } from "lucide-react";

type Character = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  dangerLevel: number;
  race: string;
  height: string;
  ability: string;
  weakness: string;
  status: string;
  createdAt: string;
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Ativo: "bg-slack-green/20 text-slack-green",
    Inativo: "bg-slack-text-muted/20 text-slack-text-muted",
    Desconhecido: "bg-slack-yellow/20 text-slack-yellow",
    Morto: "bg-slack-red/20 text-slack-red",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-bold ${colors[status] || colors.Ativo}`}>
      {status}
    </span>
  );
}

function DangerStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= level ? "fill-slack-yellow text-slack-yellow" : "text-slack-border"}
        />
      ))}
    </div>
  );
}

function CharacterDetail({
  character,
  onClose,
}: {
  character: Character;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="bg-slack-content border border-slack-border rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slack-border">
          <div className="flex items-center gap-3">
            {character.imageUrl ? (
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-slack-accent/40 flex items-center justify-center text-xl font-black text-white">
                {character.name[0]}
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-slack-text-bright">{character.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusBadge status={character.status} />
                <span className="text-xs text-slack-text-muted">{character.race}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-slack-text-muted hover:text-slack-text-bright transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-slack-text leading-relaxed">{character.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slack-bg rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-slack-text-muted mb-1">
                <Shield size={12} />
                Periculosidade
              </div>
              <DangerStars level={character.dangerLevel} />
            </div>

            {character.height && (
              <div className="bg-slack-bg rounded-lg p-3">
                <div className="text-xs text-slack-text-muted mb-1">Altura</div>
                <span className="text-sm font-bold text-slack-text-bright">{character.height}</span>
              </div>
            )}

            {character.ability && (
              <div className="bg-slack-bg rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-slack-text-muted mb-1">
                  <Swords size={12} />
                  Habilidade
                </div>
                <span className="text-sm text-slack-text-bright">{character.ability}</span>
              </div>
            )}

            {character.weakness && (
              <div className="bg-slack-bg rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-slack-text-muted mb-1">
                  <Skull size={12} />
                  Fraqueza
                </div>
                <span className="text-sm text-slack-text-bright">{character.weakness}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-slack-text-muted pt-2 border-t border-slack-border">
            Registrado em {new Date(character.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CharacterList({
  characters,
  loading,
}: {
  characters: Character[];
  loading: boolean;
}) {
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Channel header */}
      <div className="sticky top-0 z-10 bg-slack-content border-b border-slack-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slack-text-bright font-bold text-lg"># personagens</span>
          <span className="text-xs text-slack-text-muted bg-slack-bg px-2 py-0.5 rounded">
            {characters.length}
          </span>
        </div>
      </div>

      <div className="px-6 py-4">
        {loading ? (
          <div className="flex items-center gap-2 text-slack-text-muted text-sm py-8 justify-center">
            <div className="w-4 h-4 border-2 border-slack-text-muted/30 border-t-slack-blue rounded-full animate-spin" />
            Carregando personagens...
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slack-accent/20 flex items-center justify-center mx-auto mb-4">
              <Swords size={28} className="text-slack-accent" />
            </div>
            <p className="text-slack-text-muted text-sm">
              Nenhum personagem registrado ainda.
            </p>
            <p className="text-slack-text-muted text-xs mt-1">
              Use o canal <span className="font-bold text-slack-channel">#novo-personagem</span> para adicionar.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => setSelected(char)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slack-content-hover transition-colors text-left group"
              >
                {char.imageUrl ? (
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slack-accent/40 flex items-center justify-center text-sm font-black text-white shrink-0">
                    {char.name[0]}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slack-text-bright truncate">
                      {char.name}
                    </span>
                    <StatusBadge status={char.status} />
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slack-text-muted">{char.race}</span>
                    <DangerStars level={char.dangerLevel} />
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slack-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <CharacterDetail character={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
