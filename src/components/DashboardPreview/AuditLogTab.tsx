import React from 'react';

export default function AuditLogTab() {
  const logs = [
    { id: 'log-1029', action: 'Policy Updated', user: 'admin@qredin.io', resource: 'spiffe://qredin.internal/api', time: '2 mins ago', status: 'Success' },
    { id: 'log-1028', action: 'Agent Registered', user: 'system', resource: 'ag-9f82', time: '15 mins ago', status: 'Success' },
    { id: 'log-1027', action: 'Auth Failed', user: 'unknown', resource: 'api.qredin.internal', time: '1 hour ago', status: 'Failed' },
    { id: 'log-1026', action: 'Node Provisioned', user: 'jdoe@qredin.io', resource: 'nd-us-east-1', time: '3 hours ago', status: 'Success' },
    { id: 'log-1025', action: 'Federation Added', user: 'admin@qredin.io', resource: 'beta.qredin.dev', time: '1 day ago', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Audit Log</h2>
          <p className="text-sm text-slate-400">Immutable record of all administrative and system actions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4 bg-black/20">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search logs by action, user, or resource..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <button className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-xs uppercase text-slate-400 font-semibold border-b border-white/10">
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded flex items-center justify-center ${
                      log.status === 'Success' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {log.action.includes('Updated') ? 'edit' : 
                         log.action.includes('Failed') ? 'error' : 
                         log.action.includes('Added') ? 'add_circle' : 'bolt'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{log.action}</p>
                      <p className="text-xs text-slate-500">{log.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{log.user}</td>
                <td className="px-6 py-4 text-sm text-slate-400 font-mono text-xs">{log.resource}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{log.time}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    log.status === 'Success' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
          <p className="text-xs text-slate-500">Showing 1-5 of 1,204 logs</p>
          <div className="flex gap-1">
            <button className="p-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="p-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
