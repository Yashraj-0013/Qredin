import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'agents', label: 'Agents', icon: 'smart_toy' },
    { id: 'nodes', label: 'Nodes', icon: 'dns' },
    { id: 'trust_chain', label: 'Trust Chain', icon: 'link' },
    { id: 'federation', label: 'Federation', icon: 'hub' },
    { id: 'audit_logs', label: 'Audit Log', icon: 'history' },
    { id: 'revocations', label: 'Revocations', icon: 'block' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-[#0b0f14]/80 border-r border-white/10 flex flex-col justify-between shrink-0 h-full backdrop-blur-md">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#00C2FF] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-white">shield_lock</span>
          </div>
          <div>
            <h1 className="text-white text-lg font-bold leading-tight">Qredin</h1>
            <p className="text-slate-400 text-xs font-medium">Enterprise</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="flex-1"></div>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/5 mt-auto">
          <div className="size-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            JD
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-white truncate">John Doe</span>
            <span className="text-[10px] text-slate-400 truncate">admin@qredin.io</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
