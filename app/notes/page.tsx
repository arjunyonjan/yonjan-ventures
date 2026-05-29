export default function NotesIndexPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">📝 Notes</h1>
        <div className="grid gap-4">
          <a href="/notes/ai-agent-cursor-setup" className="block p-4 border rounded-xl hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold">🤖 VS Code AI Agent + Cursor Setup + Local + Cloud</h2>
            <p className="text-gray-600 text-sm mt-1">Continue, Ollama, Qwen Coder, DeepSeek</p>
          </a>
        </div>
      </div>
    </div>
  );
}