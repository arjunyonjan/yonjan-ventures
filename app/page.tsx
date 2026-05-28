"use client";

import { useState, useCallback } from "react";
import {
  Check,
  Copy,
  Clock,
  Terminal,
  Trash2,
  Download,
  Upload,
  Code,
  Box,
  Sparkles,
  ChevronRight,
  Monitor,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */

interface Step {
  id: number;
  timeRange: string;
  title: string;
  icon: React.ReactNode;
  what: string;
  why: string;
  code?: { language: string; label: string; content: string }[];
  svg: React.ReactNode;
}

/* ─── Step SVG Illustrations ────────────────────────────── */

function VillagePromptSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Chat bubble */}
      <rect x="10" y="10" width="100" height="28" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      <text x="16" y="22" fontSize="6" fill="#1f2328" fontFamily="monospace">Small village, 3 huts,</text>
      <text x="16" y="30" fontSize="6" fill="#1f2328" fontFamily="monospace">1 tree, flat ground</text>
      {/* Arrow down */}
      <path d="M60 42 L60 52" stroke="#1a7f37" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
      <defs>
        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1a7f37" />
        </marker>
      </defs>
      {/* Scene result - ground */}
      <rect x="20" y="56" width="80" height="4" rx="2" fill="#54ae26" opacity="0.6" />
      {/* Huts */}
      <path d="M30 56 L30 46 L35 42 L40 46 L40 56" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      <path d="M50 56 L50 44 L56 40 L62 44 L62 56" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      <path d="M72 56 L72 46 L77 42 L82 46 L82 56" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      {/* Tree */}
      <rect x="90" y="48" width="3" height="8" fill="#7c5a3c" />
      <circle cx="91.5" cy="44" r="6" fill="#1a7f37" opacity="0.7" />
      {/* Sparkle */}
      <circle cx="15" cy="56" r="1" fill="#9a6700" />
      <circle cx="105" cy="40" r="1" fill="#9a6700" />
      <circle cx="108" cy="50" r="0.8" fill="#0969da" />
    </svg>
  );
}

function CleanupSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Objects to delete - crossed out */}
      <g opacity="0.3">
        <ellipse cx="25" cy="25" rx="8" ry="6" fill="#ccc" stroke="#999" strokeWidth="0.5" />
        <text x="20" y="27" fontSize="5" fill="#666">Cam</text>
        <line x1="17" y1="19" x2="33" y2="31" stroke="#f85149" strokeWidth="1.5" />
      </g>
      <g opacity="0.3">
        <circle cx="55" cy="25" r="8" fill="#ccc" stroke="#999" strokeWidth="0.5" />
        <text x="50" y="27" fontSize="5" fill="#666">Light</text>
        <line x1="47" y1="17" x2="63" y2="33" stroke="#f85149" strokeWidth="1.5" />
      </g>
      <g opacity="0.3">
        <rect x="82" y="18" width="12" height="14" rx="2" fill="#ccc" stroke="#999" strokeWidth="0.5" />
        <text x="84" y="27" fontSize="4" fill="#666">extra</text>
        <line x1="82" y1="18" x2="94" y2="32" stroke="#f85149" strokeWidth="1.5" />
      </g>
      {/* Divider */}
      <line x1="10" y1="38" x2="110" y2="38" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2 2" />
      {/* Kept items */}
      <rect x="15" y="46" width="20" height="4" rx="2" fill="#54ae26" opacity="0.6" />
      <path d="M20 46 L20 38 L25 35 L30 38 L30 46" fill="#d4a574" stroke="#1a7f37" strokeWidth="0.8" />
      <path d="M40 46 L40 36 L45 33 L50 36 L50 46" fill="#d4a574" stroke="#1a7f37" strokeWidth="0.8" />
      <path d="M60 46 L60 38 L65 35 L70 38 L70 46" fill="#d4a574" stroke="#1a7f37" strokeWidth="0.8" />
      <rect x="85" y="40" width="2" height="6" fill="#7c5a3c" />
      <circle cx="86" cy="37" r="5" fill="#1a7f37" opacity="0.7" />
      {/* Checkmarks */}
      <circle cx="18" cy="58" r="4" fill="#1a7f37" />
      <path d="M16 58 L17.5 59.5 L20 56" stroke="white" strokeWidth="0.8" />
      <circle cx="30" cy="58" r="4" fill="#1a7f37" />
      <path d="M28 58 L29.5 59.5 L32 56" stroke="white" strokeWidth="0.8" />
      <circle cx="42" cy="58" r="4" fill="#1a7f37" />
      <path d="M40 58 L41.5 59.5 L44 56" stroke="white" strokeWidth="0.8" />
      <circle cx="54" cy="58" r="4" fill="#1a7f37" />
      <path d="M52 58 L53.5 59.5 L56 56" stroke="white" strokeWidth="0.8" />
    </svg>
  );
}

function ExportGLBSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Blender icon simplified */}
      <circle cx="30" cy="30" r="12" fill="#ea7600" opacity="0.15" />
      <circle cx="30" cy="30" r="8" fill="#ea7600" opacity="0.3" />
      <text x="25" y="33" fontSize="8" fontWeight="bold" fill="#ea7600">B</text>
      {/* Arrow */}
      <path d="M48 30 L68 30" stroke="#0969da" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
      <defs>
        <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0969da" />
        </marker>
      </defs>
      {/* GLB file */}
      <rect x="72" y="18" width="24" height="28" rx="3" fill="#fff" stroke="#0969da" strokeWidth="1" />
      <text x="75" y="30" fontSize="5" fill="#0969da" fontFamily="monospace" fontWeight="bold">.glb</text>
      <text x="75" y="38" fontSize="4" fill="#666" fontFamily="monospace">GLTF 2.0</text>
      <rect x="76" y="41" width="16" height="2" rx="1" fill="#d1d5db" />
      {/* Y-Up badge */}
      <rect x="74" y="50" width="20" height="8" rx="2" fill="#1a7f37" />
      <text x="77" y="56" fontSize="5" fill="white" fontFamily="monospace">Y-Up ✓</text>
      {/* JPEG comparison */}
      <text x="20" y="58" fontSize="5" fill="#666">GLB = JPEG of 3D</text>
      <text x="20" y="64" fontSize="4.5" fill="#999">single file, browser-ready</text>
      <rect x="16" y="67" width="8" height="6" rx="1" fill="#54ae26" opacity="0.3" />
      <rect x="26" y="67" width="8" height="6" rx="1" fill="#0969da" opacity="0.3" />
      <rect x="36" y="67" width="8" height="6" rx="1" fill="#9a6700" opacity="0.3" />
    </svg>
  );
}

function UploadSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Upload area */}
      <rect x="10" y="10" width="40" height="35" rx="4" fill="#fff" stroke="#0969da" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M30 22 L30 34" stroke="#0969da" strokeWidth="1.5" />
      <path d="M26 26 L30 22 L34 26" stroke="#0969da" strokeWidth="1.5" />
      <text x="18" y="40" fontSize="4" fill="#0969da" fontFamily="monospace">drop .glb</text>
      {/* Arrow */}
      <path d="M54 27 L70 27" stroke="#1a7f37" strokeWidth="1.5" />
      {/* Preview window */}
      <rect x="72" y="10" width="38" height="35" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      <rect x="72" y="10" width="38" height="8" rx="4" fill="#f6f8fa" />
      <circle cx="76" cy="14" r="2" fill="#f85149" />
      <circle cx="82" cy="14" r="2" fill="#9a6700" />
      <circle cx="88" cy="14" r="2" fill="#1a7f37" />
      {/* 3D model in preview */}
      <rect x="82" y="28" width="16" height="3" rx="1" fill="#54ae26" opacity="0.5" />
      <path d="M85 28 L85 22 L88 20 L91 22 L91 28" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      <path d="M93 28 L93 24 L95 22 L97 24 L97 28" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      {/* Orbit indicator */}
      <ellipse cx="90" cy="34" rx="10" ry="4" stroke="#0969da" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.5" />
      {/* Embed code below */}
      <rect x="74" y="38" width="34" height="5" rx="1" fill="#f6f8fa" stroke="#d1d5db" strokeWidth="0.5" />
      <text x="76" y="42" fontSize="3" fill="#666" fontFamily="monospace">&lt;iframe ...</text>
    </svg>
  );
}

function EmbedSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Clipboard */}
      <rect x="10" y="12" width="20" height="26" rx="2" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      <rect x="16" y="8" width="8" height="6" rx="1" fill="#d1d5db" />
      <text x="13" y="22" fontSize="3.5" fill="#666" fontFamily="monospace">&lt;iframe</text>
      <text x="13" y="27" fontSize="3.5" fill="#666" fontFamily="monospace">src=...</text>
      <text x="13" y="32" fontSize="3.5" fill="#666" fontFamily="monospace">&gt;</text>
      {/* Arrow */}
      <path d="M34 25 L48 25" stroke="#0969da" strokeWidth="1.5" />
      {/* Web page */}
      <rect x="50" y="10" width="60" height="32" rx="3" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      <rect x="50" y="10" width="60" height="6" rx="3" fill="#f6f8fa" />
      <circle cx="56" cy="13" r="1.5" fill="#f85149" />
      <circle cx="61" cy="13" r="1.5" fill="#9a6700" />
      <circle cx="66" cy="13" r="1.5" fill="#1a7f37" />
      {/* Embedded iframe */}
      <rect x="54" y="20" width="52" height="18" rx="2" fill="#f6f8fa" stroke="#0969da" strokeWidth="0.5" />
      <rect x="64" y="26" width="10" height="2" rx="1" fill="#54ae26" opacity="0.5" />
      <path d="M67 26 L67 22 L69 21 L71 22 L71 26" fill="#d4a574" stroke="#a0724a" strokeWidth="0.3" />
      <text x="58" y="36" fontSize="3" fill="#999">3D model live</text>
      {/* Check */}
      <circle cx="55" cy="52" r="4" fill="#1a7f37" />
      <path d="M53 52 L54.5 53.5 L57 50" stroke="white" strokeWidth="0.8" />
      <text x="62" y="54" fontSize="5" fill="#1f2328">2 clicks, no hosting</text>
      <text x="62" y="62" fontSize="4" fill="#666">Paste into HTML or Notion</text>
    </svg>
  );
}

function BonusSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-32" fill="none">
      <rect x="0" y="0" width="120" height="80" rx="6" fill="#f6f8fa" />
      {/* Code brackets */}
      <text x="15" y="22" fontSize="14" fill="#0969da" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
      {/* Three.js triangle */}
      <polygon points="60,14 68,28 52,28" fill="white" stroke="#0969da" strokeWidth="1" />
      <polygon points="60,18 65,26 55,26" fill="#0969da" opacity="0.3" />
      {/* Canvas area */}
      <rect x="10" y="36" width="100" height="36" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      {/* Grid */}
      <line x1="30" y1="36" x2="30" y2="72" stroke="#f0f0f0" strokeWidth="0.5" />
      <line x1="50" y1="36" x2="50" y2="72" stroke="#f0f0f0" strokeWidth="0.5" />
      <line x1="70" y1="36" x2="70" y2="72" stroke="#f0f0f0" strokeWidth="0.5" />
      <line x1="90" y1="36" x2="90" y2="72" stroke="#f0f0f0" strokeWidth="0.5" />
      <line x1="10" y1="48" x2="110" y2="48" stroke="#f0f0f0" strokeWidth="0.5" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#f0f0f0" strokeWidth="0.5" />
      {/* Village on grid */}
      <rect x="25" y="56" width="15" height="2" rx="1" fill="#54ae26" opacity="0.6" />
      <path d="M28 56 L28 48 L32.5 45 L37 48 L37 56" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      <path d="M42 56 L42 50 L45.5 48 L49 50 L49 56" fill="#d4a574" stroke="#a0724a" strokeWidth="0.5" />
      <rect x="55" y="50" width="2" height="6" fill="#7c5a3c" />
      <circle cx="56" cy="47" r="4" fill="#1a7f37" opacity="0.7" />
      {/* Orbit controls ring */}
      <ellipse cx="60" cy="58" rx="20" ry="8" stroke="#0969da" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
      {/* Label */}
      <text x="75" y="50" fontSize="4" fill="#0969da" fontFamily="monospace">@react-three</text>
      <text x="75" y="56" fontSize="4" fill="#1a7f37" fontFamily="monospace">useGLTF()</text>
      <text x="75" y="62" fontSize="4" fill="#9a6700" fontFamily="monospace">&lt;Canvas&gt;</text>
    </svg>
  );
}

/* ─── Step Data ─────────────────────────────────────────── */

const steps: Step[] = [
  {
    id: 0,
    timeRange: "0–2 min",
    title: "Prompt MCP Server",
    icon: <Sparkles className="w-5 h-5" />,
    what: "Natural language → Blender scene generation",
    why: "AI handles modeling, placement, and lighting instantly",
    code: [
      {
        language: "text",
        label: "Prompt",
        content: `Small village, 3 huts, 1 tree, flat ground`,
      },
      {
        language: "bash",
        label: "MCP Command",
        content: `$ mcp blender generate --prompt "Small village, 3 huts, 1 tree, flat ground"
✓ Scene generated: 4 objects placed, lighting configured`,
      },
    ],
    svg: <VillagePromptSVG />,
  },
  {
    id: 1,
    timeRange: "2–4 min",
    title: "Clean Up Scene",
    icon: <Trash2 className="w-5 h-5" />,
    what: "Delete extras, cameras, and default lights. Keep only: terrain + 3 huts + 1 tree",
    why: "Messy is fine for drafts; cleanup reduces file size significantly",
    svg: <CleanupSVG />,
  },
  {
    id: 2,
    timeRange: "4–6 min",
    title: "Export as GLB",
    icon: <Download className="w-5 h-5" />,
    what: "Blender → File → Export → glTF 2.0 (.glb)",
    why: "GLB is the JPEG of 3D — single file, browser-ready, universally supported",
    code: [
      {
        language: "text",
        label: "Export Settings",
        content: `Format: glTF Binary (.glb)
☑ Y-Up (web compatibility)
☑ Include: Meshes, Materials
☐ Include: Cameras, Lights (unchecked)`,
      },
    ],
    svg: <ExportGLBSVG />,
  },
  {
    id: 3,
    timeRange: "6–8 min",
    title: "Upload to Viewer",
    icon: <Upload className="w-5 h-5" />,
    what: "Drag your .glb into gltf.report or Sketchfab",
    why: "Instant 3D preview — the viewer generates embed code automatically",
    svg: <UploadSVG />,
  },
  {
    id: 4,
    timeRange: "8–10 min",
    title: "Embed on Web",
    icon: <Code className="w-5 h-5" />,
    what: "Copy the embed iframe → paste into HTML or Notion",
    why: "Shareable 3D model in 2 clicks, zero hosting setup required",
    code: [
      {
        language: "html",
        label: "Embed Code",
        content: `<iframe
  src="https://gltf.report/embed/village.glb"
  width="800" height="600"
  allow="fullscreen"
  frameborder="0"
></iframe>`,
      },
    ],
    svg: <EmbedSVG />,
  },
];

/* ─── Sub-components ────────────────────────────────────── */

function CodeBlock({
  code,
}: {
  code: { language: string; label: string; content: string };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    });
  }, [code.content]);

  return (
    <div className="mt-3 rounded-lg border border-border-github overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-code-bg border-b border-border-github">
        <span className="text-xs font-medium text-foreground/70">
          {code.label}
          {code.language !== "text" && (
            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-foreground/5 font-mono">
              {code.language}
            </span>
          )}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-all ${
            copied
              ? "bg-github-green text-white"
              : "hover:bg-foreground/5 text-foreground/50 hover:text-foreground"
          }`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-3 bg-code-bg overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed text-foreground whitespace-pre">
          {code.content}
        </code>
      </pre>
    </div>
  );
}

function StepCard({
  step,
  checked,
  onToggle,
  index,
}: {
  step: Step;
  checked: boolean;
  onToggle: () => void;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group">
      {/* Timeline dot + line (center on desktop) */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-timeline-line -z-10 last:bottom-auto last:h-1/2" />
      <div
        className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full border-2 z-10 transition-all ${
          checked
            ? "bg-github-green border-github-green"
            : "bg-white border-border-github group-hover:border-github-blue"
        }`}
      />

      {/* Left side (even) or right side (odd) on desktop */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isEven ? "md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
        } pl-14 md:pl-0`}
      >
        <div
          className={`step-card bg-white rounded-xl border border-border-github p-5 shadow-sm ${
            checked ? "border-github-green/40 bg-green-50/30" : ""
          }`}
        >
          {/* Header */}
          <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : ""}`}>
            <button
              onClick={onToggle}
              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                checked
                  ? "bg-github-green border-github-green checkbox-pop"
                  : "border-border-github hover:border-github-blue"
              }`}
              aria-label={`Mark "${step.title}" as ${checked ? "incomplete" : "complete"}`}
            >
              {checked && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-github-green/10 text-github-green">
              {step.timeRange}
            </span>
            <span className="flex items-center gap-1.5 text-github-blue">
              {step.icon}
              <h3 className="text-base font-semibold">{step.title}</h3>
            </span>
          </div>

          {/* SVG illustration */}
          <div className="mb-3 rounded-lg border border-border-github bg-code-bg p-2 overflow-hidden">
            {step.svg}
          </div>

          {/* Description */}
          <div className={`space-y-1.5 text-sm ${isEven ? "md:text-right" : ""}`}>
            <p className="text-foreground">
              <span className="font-semibold">What:</span> {step.what}
            </p>
            <p className="text-foreground/70">
              <span className="font-semibold">Why:</span> {step.why}
            </p>
          </div>

          {/* Code blocks */}
          {step.code && (
            <div className="space-y-2">
              {step.code.map((c, i) => (
                <CodeBlock key={i} code={c} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </div>
  );
}

/* ─── Bonus Section ─────────────────────────────────────── */

function BonusSection() {
  const [copied, setCopied] = useState(false);

  const bonusCode = `// Install dependencies
npm install three @react-three/fiber @react-three/drei

// Place GLB file
// /public/models/village.glb

// pages/3d-village.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function VillageModel() {
  const { scene } = useGLTF("/models/village.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function VillagePage() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <VillageModel />
        <OrbitControls makeAutoFocus />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bonusCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    });
  };

  return (
    <div className="mt-12 rounded-xl border-2 border-github-yellow/30 bg-gradient-to-br from-yellow-50/50 to-white overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-github-yellow/5 border-b border-github-yellow/20">
        <Sparkles className="w-6 h-6 text-github-yellow" />
        <div>
          <h3 className="text-lg font-bold text-foreground">
            BONUS: Next.js + Three.js Integration
          </h3>
          <p className="text-sm text-foreground/60">
            Full interactive 3D scene embedded in your Next.js app
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Install command */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-foreground">Install:</span>
          <div className="mt-2 rounded-lg border border-border-github overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 bg-code-bg border-b border-border-github">
              <span className="text-xs font-mono text-foreground/70">bash</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "npm install three @react-three/fiber @react-three/drei"
                  );
                }}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <pre className="p-3 bg-code-bg overflow-x-auto">
              <code className="text-sm font-mono text-foreground">
                npm install three @react-three/fiber @react-three/drei
              </code>
            </pre>
          </div>
        </div>

        {/* File placement */}
        <div className="mb-4 flex items-start gap-2 text-sm">
          <Box className="w-4 h-4 text-github-blue mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold">Place GLB in:</span>
            <code className="ml-1.5 px-2 py-0.5 rounded bg-code-bg border border-border-github text-xs font-mono">
              /public/models/village.glb
            </code>
          </div>
        </div>

        {/* Full code */}
        <div className="rounded-lg border border-border-github overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-code-bg border-b border-border-github">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-foreground/70">tsx</span>
              <span className="text-xs text-foreground/50">
                pages/3d-village.tsx
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-all ${
                copied
                  ? "bg-github-green text-white"
                  : "hover:bg-foreground/5 text-foreground/50 hover:text-foreground"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-code-bg overflow-x-auto max-h-96 overflow-y-auto">
            <code className="text-sm font-mono leading-relaxed text-foreground whitespace-pre">
              {bonusCode}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ─── Embed Preview ─────────────────────────────────────── */

function EmbedPreview() {
  return (
    <div className="mt-12 rounded-xl border border-border-github overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-code-bg border-b border-border-github">
        <Monitor className="w-4 h-4 text-github-blue" />
        <h3 className="text-sm font-semibold text-foreground">
          Live Embed Preview
        </h3>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-github-blue/10 text-github-blue font-medium pulse-glow">
          LIVE
        </span>
      </div>
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
        {/* Fake iframe placeholder */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-white shadow-md flex items-center justify-center border border-border-github">
            <Box className="w-8 h-8 text-github-blue" />
          </div>
          <p className="text-sm font-medium text-foreground/80">
            3D Village Model
          </p>
          <p className="text-xs text-foreground/50 mt-1">
            Drag your .glb into gltf.report to see it here
          </p>
          {/* Simulated orbit controls hint */}
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-foreground/40">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6 10h4v1H6v-1z" />
              </svg>
              Left-click rotate
            </span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6 10h4v1H6v-1z" />
              </svg>
              Scroll zoom
            </span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6 10h4v1H6v-1z" />
              </svg>
              Right-click pan
            </span>
          </div>
        </div>
        {/* CSS3D-style decorative rings */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            perspective: "600px",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(60deg) rotateZ(-15deg)",
            }}
          >
            <div
              className="w-48 h-48 rounded-full border border-github-blue/10"
              style={{ transform: "translateZ(-20px)" }}
            />
            <div
              className="w-64 h-64 rounded-full border border-github-green/10"
              style={{ transform: "translateZ(-40px)" }}
            />
            <div
              className="w-80 h-80 rounded-full border border-github-yellow/10"
              style={{ transform: "translateZ(-60px)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero SVG ──────────────────────────────────────────── */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto" fill="none">
      {/* Background gradient */}
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="400" y2="160">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" rx="12" fill="url(#heroBg)" />

      {/* Ground plane */}
      <ellipse cx="200" cy="120" rx="160" ry="25" fill="#54ae26" opacity="0.15" />
      <rect x="60" y="118" width="280" height="4" rx="2" fill="#54ae26" opacity="0.4" />

      {/* Hut 1 */}
      <g transform="translate(100, 60)">
        <rect x="0" y="20" width="30" height="40" rx="2" fill="#d4a574" stroke="#a0724a" strokeWidth="1" />
        <path d="M-5 22 L15 2 L35 22" fill="#8b6914" stroke="#a0724a" strokeWidth="1" />
        <rect x="10" y="35" width="10" height="25" rx="1" fill="#7c5a3c" />
        <rect x="3" y="28" width="8" height="8" rx="1" fill="#87CEEB" opacity="0.5" stroke="#a0724a" strokeWidth="0.5" />
      </g>

      {/* Hut 2 */}
      <g transform="translate(180, 55)">
        <rect x="0" y="20" width="35" height="45" rx="2" fill="#d4a574" stroke="#a0724a" strokeWidth="1" />
        <path d="M-5 22 L17.5 0 L40 22" fill="#8b6914" stroke="#a0724a" strokeWidth="1" />
        <rect x="12" y="38" width="11" height="27" rx="1" fill="#7c5a3c" />
        <rect x="3" y="30" width="8" height="8" rx="1" fill="#87CEEB" opacity="0.5" stroke="#a0724a" strokeWidth="0.5" />
        <rect x="24" y="30" width="8" height="8" rx="1" fill="#87CEEB" opacity="0.5" stroke="#a0724a" strokeWidth="0.5" />
      </g>

      {/* Hut 3 */}
      <g transform="translate(270, 65)">
        <rect x="0" y="20" width="28" height="35" rx="2" fill="#d4a574" stroke="#a0724a" strokeWidth="1" />
        <path d="M-4 22 L14 4 L32 22" fill="#8b6914" stroke="#a0724a" strokeWidth="1" />
        <rect x="9" y="32" width="10" height="23" rx="1" fill="#7c5a3c" />
      </g>

      {/* Tree */}
      <g transform="translate(330, 55)">
        <rect x="8" y="35" width="6" height="30" rx="2" fill="#7c5a3c" />
        <circle cx="11" cy="25" r="18" fill="#1a7f37" opacity="0.6" />
        <circle cx="5" cy="30" r="12" fill="#1a7f37" opacity="0.5" />
        <circle cx="18" cy="28" r="14" fill="#1a7f37" opacity="0.5" />
        <circle cx="11" cy="18" r="10" fill="#2ea043" opacity="0.4" />
      </g>

      {/* Sun */}
      <circle cx="50" cy="30" r="16" fill="#fcd520" opacity="0.3" />
      <circle cx="50" cy="30" r="10" fill="#fcd520" opacity="0.5" />

      {/* Clouds */}
      <ellipse cx="130" cy="20" rx="20" ry="8" fill="#e8e8e8" opacity="0.6" />
      <ellipse cx="140" cy="16" rx="15" ry="7" fill="#e8e8e8" opacity="0.5" />
      <ellipse cx="280" cy="25" rx="18" ry="7" fill="#e8e8e8" opacity="0.5" />

      {/* 3D indicator ring */}
      <ellipse cx="200" cy="130" rx="120" ry="15" stroke="#0969da" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.3" />

      {/* Label badge */}
      <rect x="155" y="140" width="90" height="16" rx="8" fill="#0969da" />
      <text x="200" y="151" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">
        .glb model
      </text>
    </svg>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */

export default function Home() {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const progress = Math.round((checkedSteps.size / steps.length) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-github">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-github-blue" />
            <span className="font-semibold text-sm text-foreground">
              3D Village Tutorial
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Progress bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-code-bg border border-border-github overflow-hidden">
                <div
                  className="h-full rounded-full bg-github-green transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-foreground/60">
                {checkedSteps.size}/{steps.length}
              </span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-foreground transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 1.746.269A5.68 5.68 0 0112 5.475a5.7 5.7 0 011.487.504c.906-.538 1.744-.269 1.744-.269.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-github-green/10 text-github-green text-xs font-medium mb-4">
            <Clock className="w-3.5 h-3.5" />
            10-Minute Challenge
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            3D Village in 10 Minutes
            <span className="block text-github-blue text-2xl sm:text-3xl mt-1">
              Blender + AI to Web
            </span>
          </h1>
          <p className="text-foreground/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From prompt to embedded 3D model — no experience needed. Follow the
            timeline below, check off steps as you go.
          </p>

          {/* Hero illustration */}
          <div className="mt-8 max-w-lg mx-auto">
            <HeroIllustration />
          </div>
        </section>

        {/* Timeline Steps */}
        <section className="relative">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                checked={checkedSteps.has(step.id)}
                onToggle={() => toggleStep(step.id)}
              />
            ))}
          </div>
        </section>

        {/* Embed Preview */}
        <EmbedPreview />

        {/* Bonus Section */}
        <BonusSection />

        {/* Completion celebration */}
        {checkedSteps.size === steps.length && (
          <div className="mt-8 text-center p-6 rounded-xl bg-github-green/5 border border-github-green/20">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-github-green mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              All steps complete! 🎉
            </h3>
            <p className="text-sm text-foreground/60 mt-1">
              You just went from idea to embedded 3D in under 10 minutes.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-github mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <Code className="w-4 h-4" />
            <span>
              Built with <span className="font-medium text-foreground/70">Next.js</span> +{" "}
              <span className="font-medium text-foreground/70">Three.js</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/40">
            <Clock className="w-3.5 h-3.5" />
            <span>10-min challenge</span>
            <ChevronRight className="w-3 h-3" />
            <span>Blender + AI + Web</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
