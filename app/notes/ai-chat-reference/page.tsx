"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, MessageSquare, Bot, Zap, Key } from "lucide-react";

export default function AIChatReferencePage() {
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

  const apiRouteCode = `import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ` + '`Bearer ${process.env.DEEPSEEK_API_KEY}`' + `
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7
      })
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'API Error' }, { status: 500 });
  }
}`;

  const componentCode = `const sendMessage = async (message: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: message }] })
  });
  const data = await response.json();
  return data.choices[0].message.content;
};`;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold m-0">DeepSeek / OpenAI Compatible API</h2>
          </div>
          <p className="text-gray-700">Quick reference for AI chat integration in Next.js</p>
        </div>

        <div className="space-y-6">
          {/* API Key Setup */}
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold m-0">1. Environment Variable</h3>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                <span className="text-xs font-mono text-gray-600">.env.local</span>
                <button onClick={() => copyToClipboard("DEEPSEEK_API_KEY=sk-your-actual-key-here", "env")} className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200">
                  {copied["env"] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied["env"] ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-gray-50 overflow-x-auto"><code className="text-sm font-mono">DEEPSEEK_API_KEY=sk-your-actual-key-here</code></pre>
            </div>
          </div>

          {/* API Route */}
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold m-0">2. API Route (app/api/chat/route.ts)</h3>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                <span className="text-xs font-mono text-gray-600">typescript</span>
                <button onClick={() => copyToClipboard(apiRouteCode, "route")} className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200">
                  {copied["route"] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied["route"] ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-gray-50 overflow-x-auto"><code className="text-sm font-mono whitespace-pre">{apiRouteCode}</code></pre>
            </div>
          </div>

          {/* Frontend Component */}
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold m-0">3. Chat Component Example</h3>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                <span className="text-xs font-mono text-gray-600">tsx</span>
                <button onClick={() => copyToClipboard(componentCode, "component")} className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200">
                  {copied["component"] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied["component"] ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-gray-50 overflow-x-auto"><code className="text-sm font-mono whitespace-pre">{componentCode}</code></pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}