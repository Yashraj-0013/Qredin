import React from 'react';

export default function RevocationsTab() {
  const revocations = [
    { id: 'rev-001', target: 'spiffe://qredin.internal/legacy-api', reason: 'Key Compromise', date: 'Oct 24, 2023', status: 'Active' },
    { id: 'rev-002', target: 'ag-1a99', reason: 'Decommissioned', date: 'Nov 12, 2023', status: 'Active' },
    { id: 'rev-003', target: 'spiffe://beta.qredin.dev/test-service', reason: 'Routine Rotation', date: 'Jan 05, 2024', status: 'Expired' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Revocations</h2>
          <p className="text-sm text-slate-400">Manage Certificate Revocation Lists (CRLs) and immediate trust termination.</p>
        </div>
        <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-rose-500/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">block</span>
          Revoke Trust
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Revocations', value: '2', icon: 'gpp_bad', color: 'text-rose-400' },
          { label: 'CRL Updates (24h)', value: '14', icon: 'update', color: 'text-blue-400' },
          { label: 'Avg. Propagation', value: '< 2s', icon: 'timer', color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <span className={`material-symbols-outlined text-[20px] ${stat.color}`}>{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h3 className="text-white font-bold">Recent Revocations</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-xs uppercase text-slate-400 font-semibold border-b border-white/10">
              <th className="px-6 py-4">Target Identity</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Date Revoked</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {revocations.map((rev, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-rose-500/10 flex items-center justify-center text-rose-400">
                      <span className="material-symbols-outlined text-[18px]">vpn_key_off</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white font-mono text-xs">{rev.target}</p>
                      <p className="text-xs text-slate-500">{rev.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{rev.reason}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{rev.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    rev.status === 'Active' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {rev.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
