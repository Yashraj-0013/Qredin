import React from 'react';

export default function NodesTab() {
  const nodes = [
    { id: 'nd-us-east-1', region: 'US East (N. Virginia)', type: 'Validator', uptime: '99.99%', load: '42%' },
    { id: 'nd-eu-west-1', region: 'EU West (Ireland)', type: 'Validator', uptime: '99.98%', load: '65%' },
    { id: 'nd-ap-south-1', region: 'AP South (Mumbai)', type: 'Observer', uptime: '99.95%', load: '28%' },
    { id: 'nd-us-west-2', region: 'US West (Oregon)', type: 'Observer', uptime: '99.99%', load: '31%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Nodes</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          Provision Node
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div key={node.id} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-400">dns</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{node.region}</h3>
                  <p className="text-xs text-slate-400">{node.id}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-300">
                {node.type}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-xs text-slate-500 mb-1">Uptime</p>
                <p className="text-sm font-medium text-emerald-400">{node.uptime}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">System Load</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: node.load }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{node.load}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
