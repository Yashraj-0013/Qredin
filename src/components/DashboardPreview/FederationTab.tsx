import React from 'react';

export default function FederationTab() {
  const federations = [
    { domain: 'beta.qredin.dev', status: 'Connected', lastSync: '2 mins ago', size: '248 KB' },
    { domain: 'gamma.qredin.dev', status: 'Pending', lastSync: '--', size: '0 KB' },
    { domain: 'prod-east.qredin.io', status: 'Connected', lastSync: '12 mins ago', size: '1.2 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Trust Federation</h2>
          <p className="text-sm text-slate-400">Manage cross-domain trust relationships and SPIFFE bundle synchronization.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add_link</span>
          Add Trust Domain
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Federations', value: '3', icon: 'hub', trend: '+1' },
          { label: 'Bundles Synced', value: '12', icon: 'sync_alt', trend: 'All up to date' },
          { label: 'Avg. Sync Latency', value: '42ms', icon: 'speed', trend: '-5ms' },
          { label: 'Next Poll', value: 'in 5m', icon: 'schedule', trend: 'Every 15m' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <span className="material-symbols-outlined text-blue-400 text-[20px]">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-white font-bold">Trusted Domains</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 text-xs uppercase text-slate-400 font-semibold">
              <th className="px-6 py-4">Domain Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Sync</th>
              <th className="px-6 py-4">Bundle Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {federations.map((fed, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <span className="material-symbols-outlined text-[18px]">dns</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{fed.domain}</p>
                      <p className="text-xs text-slate-500">spiffe://{fed.domain}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    fed.status === 'Connected' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {fed.status === 'Connected' && <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    {fed.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{fed.lastSync}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{fed.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
