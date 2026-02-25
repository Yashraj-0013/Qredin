import React from 'react';

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
            Add Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Agents', value: '1,204', trend: '+12%', color: 'text-emerald-400' },
          { label: 'Federated Nodes', value: '48', trend: '+3%', color: 'text-blue-400' },
          { label: 'Revocations (24h)', value: '12', trend: '-2%', color: 'text-rose-400' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.color} mb-1`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm h-64 flex flex-col">
          <h3 className="text-white font-semibold mb-4">Network Activity</h3>
          <div className="flex-1 border border-white/5 rounded-lg bg-black/20 flex items-center justify-center">
            <span className="text-slate-500 text-sm">Activity Chart Placeholder</span>
          </div>
        </div>
        <div className="col-span-1 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm h-64 flex flex-col">
          <h3 className="text-white font-semibold mb-4">Recent Alerts</h3>
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2">
            {[
              { title: 'Node disconnected', time: '2m ago', type: 'warning' },
              { title: 'New agent registered', time: '15m ago', type: 'info' },
              { title: 'Policy updated', time: '1h ago', type: 'info' },
              { title: 'Failed auth attempt', time: '2h ago', type: 'danger' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className={`size-2 rounded-full mt-1.5 shrink-0 ${
                  alert.type === 'warning' ? 'bg-amber-400' :
                  alert.type === 'danger' ? 'bg-rose-400' : 'bg-blue-400'
                }`} />
                <div>
                  <p className="text-sm text-white font-medium">{alert.title}</p>
                  <p className="text-xs text-slate-400">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
