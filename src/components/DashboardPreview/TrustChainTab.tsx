import React from 'react';

export default function TrustChainTab() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold text-white">Trust Chain</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Abstract Trust Chain Visualization */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.05)_0%,transparent_70%)]" />
        
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md">
          {/* Root CA */}
          <div className="w-full p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-md flex items-center gap-4">
            <div className="size-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <span className="material-symbols-outlined text-blue-400">verified</span>
            </div>
            <div>
              <h3 className="text-white font-bold">Qredin Root CA</h3>
              <p className="text-xs text-blue-400/80">Valid until 2035 • RSA-4096</p>
            </div>
          </div>

          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-white/20" />

          {/* Intermediate */}
          <div className="w-full p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-4">
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-slate-300">account_tree</span>
            </div>
            <div>
              <h3 className="text-white font-medium">Enterprise Intermediate G1</h3>
              <p className="text-xs text-slate-400">Valid until 2028 • ECDSA-P384</p>
            </div>
          </div>

          <div className="w-0.5 h-8 bg-white/20" />

          {/* Leaf */}
          <div className="w-full p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-4">
            <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-slate-400">description</span>
            </div>
            <div>
              <h3 className="text-white font-medium">api.qredin.internal</h3>
              <p className="text-xs text-slate-500">Valid until Oct 2024 • Auto-renews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
