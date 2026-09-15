"use client";

import { Hash, Plus, Users, BookOpen } from "lucide-react";

type View = "characters" | "add";

export default function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <aside className="w-60 shrink-0 bg-slack-sidebar flex flex-col h-full border-r border-slack-border">
      {/* Workspace header */}
      <div className="px-4 py-3 border-b border-slack-border">
        <h1 className="text-lg font-black text-slack-text-bright tracking-tight truncate">
          Consolidação-Inbound
        </h1>
        <span className="text-xs text-slack-text-muted flex items-center gap-1 mt-0.5">
          <span className="inline-block w-2 h-2 rounded-full bg-slack-green" />
          Wiki ativa
        </span>
      </div>

      {/* Channels */}
      <nav className="flex-1 overflow-y-auto py-3">
        <p className="px-4 text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1">
          Canais
        </p>

        <button
          onClick={() => onNavigate("characters")}
          className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm transition-colors ${
            activeView === "characters"
              ? "bg-slack-sidebar-active text-white"
              : "text-slack-channel hover:bg-slack-sidebar-hover"
          }`}
        >
          <Hash size={16} className="shrink-0 opacity-70" />
          personagens
        </button>

        <button
          onClick={() => onNavigate("add")}
          className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm transition-colors ${
            activeView === "add"
              ? "bg-slack-sidebar-active text-white"
              : "text-slack-channel hover:bg-slack-sidebar-hover"
          }`}
        >
          <Plus size={16} className="shrink-0 opacity-70" />
          novo-personagem
        </button>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slack-border flex items-center gap-2 text-xs text-slack-text-muted">
        <BookOpen size={14} />
        <span>{new Date().getFullYear()} Inbound Wiki</span>
      </div>
    </aside>
  );
}
