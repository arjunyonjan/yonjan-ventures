"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Terminal, Sparkles, Cpu } from "lucide-react";

export default function AICursorSetupPage() {
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const copyToClipboard = async (text: string, key: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/notes" className="text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">🤖 VS Code AI Agent + Cursor Setup + Local + Cloud</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold m-0">5-Minute AI Coding Setup</h2>
            </div>
<div className="mt-6 rounded-xl border overflow-hidden shadow-sm bg-white">
  <img 
    src="https://res.cloudinary.com/dpnxmo8ak/image/upload/v1780038144/fast-mind/ChatGPT_Image_May_29_2026_12_26_53_PM_uvohv6.png" 
    alt="AI Workflow Diagram: Terminal → VS Code Continue → Developer"
    className="w-full h-auto object-contain"
    loading="lazy"
  />
  <div className="bg-gray-50 px-4 py-2 border-t text-center text-xs text-gray-500">
    Workflow: Pull model via Ollama → Connect Continue → Code with AI
  </div>
</div>
            <p className="text-gray-700 m-0">Get AI-powered coding assistance locally using Ollama + Qwen Coder, or via DeepSeek API.</p>
          </div>

          {/*commands*/}
           <div className="bg-gray-50 rounded-xl p-6 border mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold m-0">Quick Commands</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-mono bg-gray-800 text-white px-2 py-0.5 rounded text-xs">Ctrl+L</span>
                  <span className="text-gray-700">Open Continue chat</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-mono bg-gray-800 text-white px-2 py-0.5 rounded text-xs">Ctrl+I</span>
                  <span className="text-gray-700">Inline edit with AI</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-mono bg-gray-800 text-white px-2 py-0.5 rounded text-xs">Tab</span>
                  <span className="text-gray-700">Accept autocomplete suggestion</span>
                </div>
              </div>
            </div>

          <div className="space-y-8">
            
            
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-lg font-bold m-0">Configure Continue</h3>
              </div>
              <div className="mt-3 rounded-lg border overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <span className="text-xs font-mono text-gray-600">yaml</span>
                  <button onClick={() => copyToClipboard(`models:
  - title: Qwen Coder (Ollama)
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://localhost:11434
  - title: DeepSeek (API)
    provider: openai
    model: deepseek-chat
    apiKey: sk-your-deepseek-key
    apiBase: https://api.deepseek.com/v1
tabAutocompleteModel:
  title: Qwen Coder Autocomplete
  provider: ollama
  model: qwen2.5-coder:1.5b
`, "config")} className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200">
                    {copied["config"] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied["config"] ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 bg-gray-50 overflow-x-auto">
                  <code className="text-sm font-mono whitespace-pre">
{`models:
  - title: Qwen Coder (Ollama)
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://localhost:11434
  - title: DeepSeek (API)
    provider: openai
    model: deepseek-chat
    apiKey: sk-your-deepseek-key
    apiBase: https://api.deepseek.com/v1
tabAutocompleteModel:
  title: Qwen Coder Autocomplete
  provider: ollama
  model: qwen2.5-coder:1.5b
`}
                  </code>
                </pre>
              </div>
              <p className="text-sm text-gray-500 mt-3">📁 Windows path: <code className="bg-gray-100 px-2 py-1 rounded">%USERPROFILE%\.continue\config.yaml</code></p>
            </div>

           
          </div>
        </div>
      </main>
    </div>
  );
}
