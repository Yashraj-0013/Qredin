import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OverviewTab from './OverviewTab';
import AgentsTab from './AgentsTab';
import NodesTab from './NodesTab';
import TrustChainTab from './TrustChainTab';
import FederationTab from './FederationTab';
import AuditLogTab from './AuditLogTab';
import RevocationsTab from './RevocationsTab';
import SettingsTab from './SettingsTab';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'agents':
        return <AgentsTab />;
      case 'nodes':
        return <NodesTab />;
      case 'trust_chain':
        return <TrustChainTab />;
      case 'federation':
        return <FederationTab />;
      case 'audit_logs':
        return <AuditLogTab />;
      case 'revocations':
        return <RevocationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-[700px] rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f14]/60 backdrop-blur-xl shadow-2xl flex relative z-20">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Subtle background glow for the main content area */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>
        
        <div className="animate-in fade-in duration-300 h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
