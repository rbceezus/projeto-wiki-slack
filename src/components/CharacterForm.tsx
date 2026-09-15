"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

const inputClass =
  "w-full bg-slack-input border border-slack-input-border rounded px-3 py-2 text-sm text-slack-text-bright placeholder:text-slack-text-muted focus:outline-none focus:border-slack-blue transition-colors";

export default function CharacterForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    dangerLevel: 1,
    race: "",
    height: "",
    ability: "",
    weakness: "",
    status: "Ativo",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({
          name: "",
          imageUrl: "",
          description: "",
          dangerLevel: 1,
          race: "",
          height: "",
          ability: "",
          weakness: "",
          status: "Ativo",
        });
        setSuccess(true);
        onCreated();
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Channel header */}
      <div className="sticky top-0 z-10 bg-slack-content border-b border-slack-border px-6 py-3 flex items-center gap-2">
        <span className="text-slack-text-bright font-bold text-lg"># novo-personagem</span>
      </div>

      <div className="px-6 py-6 max-w-2xl">
        {/* Bot message */}
        <div className="flex gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-slack-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
            CI
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-slack-text-bright text-sm">Consolidação-Bot</span>
              <span className="text-xs text-slack-text-muted">
                {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-sm text-slack-text mt-1">
              Preencha os campos abaixo para registrar um novo personagem na wiki. Campos com <span className="text-slack-red">*</span> são obrigatórios.
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-4 px-4 py-2.5 rounded bg-slack-green/15 border border-slack-green/30 text-slack-green text-sm">
            Personagem registrado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Nome <span className="text-slack-red">*</span>
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ex: Thorin Escudo-de-Carvalho"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Raça <span className="text-slack-red">*</span>
              </span>
              <input
                required
                value={form.race}
                onChange={(e) => update("race", e.target.value)}
                placeholder="Ex: Anão, Elfo, Humano"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Altura
              </span>
              <input
                value={form.height}
                onChange={(e) => update("height", e.target.value)}
                placeholder="Ex: 1,40m"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Status
              </span>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className={inputClass}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Desconhecido">Desconhecido</option>
                <option value="Morto">Morto</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
              URL da Imagem
            </span>
            <input
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              placeholder="https://exemplo.com/imagem.png"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
              Descrição <span className="text-slack-red">*</span>
            </span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Descreva o personagem..."
              className={inputClass + " resize-none"}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Habilidade Principal
              </span>
              <input
                value={form.ability}
                onChange={(e) => update("ability", e.target.value)}
                placeholder="Ex: Combate corpo-a-corpo"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-1.5 block">
                Fraqueza
              </span>
              <input
                value={form.weakness}
                onChange={(e) => update("weakness", e.target.value)}
                placeholder="Ex: Magia elemental"
                className={inputClass}
              />
            </label>
          </div>

          {/* Danger level stars */}
          <div>
            <span className="text-xs font-bold text-slack-text-muted uppercase tracking-wider mb-2 block">
              Nível de Periculosidade
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update("dangerLevel", level)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    size={24}
                    className={
                      level <= form.dangerLevel
                        ? "fill-slack-yellow text-slack-yellow"
                        : "text-slack-border"
                    }
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-slack-text-muted self-center">
                {form.dangerLevel}/5
              </span>
            </div>
          </div>

          {/* Submit like Slack message input */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 bg-slack-green hover:bg-slack-green/80 disabled:opacity-50 text-white font-bold text-sm px-5 py-2.5 rounded transition-colors"
            >
              <Send size={16} />
              {sending ? "Enviando..." : "Registrar Personagem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
