"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  FileText, 
  MessageSquare, 
  Bot, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
  { title: "Notes", href: "/notes", icon: <FileText className="w-5 h-5" /> },
  { title: "AI Chat", href: "/notes/ai-chat-reference", icon: <MessageSquare className="w-5 h-5" /> },
  { title: "AI Agent", href: "/notes/ai-agent-cursor-setup", icon: <Bot className="w-5 h-5" /> },
  { title: "3D Village", href: "/", icon: <Sparkles className="w-5 h-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <input type="checkbox" id="mobile-sidebar" className="peer hidden" />
        <label 
          htmlFor="mobile-sidebar" 
          className="fixed bottom-4 right-4 z-50 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
        >
          <MenuIcon />
        </label>
        <div className="fixed inset-0 bg-black/50 z-40 hidden peer-checked:block" />
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r z-50 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 md:hidden">
          <SidebarContent pathname={pathname} />
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className={`hidden md:block ${isCollapsed ? 'w-16' : 'w-64'} border-r bg-white transition-all duration-300 flex-shrink-0`}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center">
            {!isCollapsed && <span className="font-bold text-lg">Yonjan Ventures</span>}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-gray-100">
              <ChevronRight className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <SidebarContent pathname={pathname} isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
}

function SidebarContent({ pathname, isCollapsed = false }: { pathname: string; isCollapsed?: boolean }) {
  return (
    <nav className="p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        return (
          <Link key={item.href} href={item.href} className={`
            flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
            ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
            ${isCollapsed ? 'justify-center' : ''}
          `} title={isCollapsed ? item.title : undefined}>
            {item.icon}
            {!isCollapsed && <span className="text-sm">{item.title}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}