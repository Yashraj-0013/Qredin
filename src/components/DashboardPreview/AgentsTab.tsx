import React from 'react';

export default function AgentsTab() {
  const agents = [
    { id: 'ag-9f82', name: 'Payment Processor', status: 'Active', version: 'v2.4.1', lastSeen: 'Just now' },
    { id: 'ag-3b11', name: 'Auth Service', status: 'Active', version: 'v2.4.1', lastSeen: '2m ago' },
    { id: 'ag-7c44', name: 'Data Pipeline', status: 'Warning', version: 'v2.3.9', lastSeen: '15m ago' },
    { id: 'ag-1a99', name: 'Legacy API', status: 'Offline', version: 'v1.8.0', lastSeen: '2d ago' },
    { id: 'ag-8e22', name: 'Notification Worker', status: 'Active', version: 'v2.4.1', lastSeen: '1m ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Agents</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          Deploy Agent
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent Name</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Version</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Seen</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-slate-300">smart_toy</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                    agent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    agent.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-300">{agent.version}</td>
                <td className="p-4 text-sm text-slate-400">{agent.lastSeen}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
