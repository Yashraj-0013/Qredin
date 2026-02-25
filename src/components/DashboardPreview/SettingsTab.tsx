import React from 'react';

export default function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Organization Settings</h2>
          <p className="text-sm text-slate-400">Manage your Qredin workspace, billing, and global preferences.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
          {[
            { id: 'general', label: 'General', icon: 'settings', active: true },
            { id: 'security', label: 'Security', icon: 'security', active: false },
            { id: 'team', label: 'Team Members', icon: 'group', active: false },
            { id: 'billing', label: 'Billing & Plans', icon: 'credit_card', active: false },
            { id: 'api', label: 'API Keys', icon: 'key', active: false },
            { id: 'integrations', label: 'Integrations', icon: 'extension', active: false },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                item.active
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Workspace Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Qredin Enterprise" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Primary Trust Domain</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-slate-500 text-sm">
                    spiffe://
                  </span>
                  <input 
                    type="text" 
                    defaultValue="qredin.internal" 
                    className="flex-1 bg-black/20 border border-white/10 rounded-r-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">This is the root domain for all identities issued in this workspace.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Global Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-black/20">
                <div>
                  <h4 className="text-white font-medium text-sm">Strict Mutual TLS</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Require mTLS for all internal agent communication.</p>
                </div>
                <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-black/20">
                <div>
                  <h4 className="text-white font-medium text-sm">Auto-Rotate Agent Keys</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Automatically rotate keys 24 hours before expiration.</p>
                </div>
                <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
