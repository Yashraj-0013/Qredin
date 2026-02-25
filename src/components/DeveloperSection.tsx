import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check } from 'lucide-react';

const codeSnippets = {
  Python: `from qredin import AuthClient

auth = AuthClient(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_SECRET"
)

auth.login(redirect_uri="https://yourapp.com/callback")`,
  TypeScript: `import { AuthClient } from "@qredin/sdk";

const auth = new AuthClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_SECRET"
});

await auth.login({
  redirectUri: window.location.origin
});`,
  Go: `package main

import (
  "github.com/qredin/sdk"
)

func main() {
  auth := sdk.NewClient("YOUR_CLIENT_ID", "YOUR_SECRET")
  auth.Login("https://yourapp.com/callback")
}`
};

type Language = keyof typeof codeSnippets;

export default function DeveloperSection() {
  const [activeTab, setActiveTab] = useState<Language>('TypeScript');
  const [displayedCode, setDisplayedCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  const fullCode = codeSnippets[activeTab];
  
  useEffect(() => {
    setDisplayedCode('');
    
    let i = 0;
    const intervalTime = Math.max(10, Math.floor(2000 / fullCode.length));
    
    const interval = setInterval(() => {
      if (i < fullCode.length - 1) {
        setDisplayedCode(fullCode.substring(0, i + 1));
        i++;
      } else {
        setDisplayedCode(fullCode);
        clearInterval(interval);
      }
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [activeTab, fullCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center py-24 bg-background-light relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight font-sans">
              Made for Developers.<br />
              By Developers.
            </h2>
            <p className="text-lg text-[#9CA3AF] mb-12 leading-relaxed">
              Built with real-world engineering in mind. Integrate secure identity flows in minutes using Python, TypeScript, or Go. Clean APIs. Production-ready SDKs. Zero friction.
            </p>
            
            {/* Marquee */}
            <div className="relative w-full overflow-hidden flex items-center h-16 group">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background-light to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background-light to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-16 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
                {/* Duplicate items for infinite scroll */}
                {[...Array(3)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-3 text-[#9CA3AF] opacity-70 hover:opacity-100 transition-opacity">
                      <svg className="w-8 h-8" viewBox="0 0 110 110" fill="currentColor"><path d="M53.9 0C26.1 0 20.3 12 20.3 12L20 25.8h34.3v4.8H15.1C6.5 30.6 0 39.5 0 55.4c0 16 5.3 25.1 14.3 26.6h11.2v-12.7c0-14.1 11.6-25.5 25.8-25.5h14.5c6.5 0 11.8-5.3 11.8-11.8V11.8C77.6 5.3 72.3 0 65.8 0H53.9zm-15.3 8.3c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7zM89.7 28.1h-11.2v12.7c0 14.1-11.6 25.5-25.8 25.5H38.2c-6.5 0-11.8 5.3-11.8 11.8v20.2c0 6.5 5.3 11.8 11.8 11.8h11.9c27.8 0 33.6-12 33.6-12l.3-13.8H49.7v-4.8h39.2c8.6 0 15.1-8.9 15.1-24.8 0-16-5.3-25.1-14.3-26.6zM71.4 92.3c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z"/></svg>
                      <span className="font-semibold text-lg">Python</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#9CA3AF] opacity-70 hover:opacity-100 transition-opacity">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM13.313 19.313h-3.188v-8.438H6.938v-2.625h6.375v11.063zm5.625 0c-2.438 0-4.125-1.5-4.125-3.938 0-2.25 1.5-3.75 3.75-3.75 1.313 0 2.25.563 2.813 1.313l-1.875 1.688c-.375-.375-.75-.563-1.125-.563-.75 0-1.313.563-1.313 1.5 0 .938.563 1.5 1.313 1.5.375 0 .938-.188 1.313-.75l1.875 1.5c-.75 1.125-1.875 1.5-2.625 1.5z"/></svg>
                      <span className="font-semibold text-lg">TypeScript</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#9CA3AF] opacity-70 hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 -ml-2" viewBox="0 0 24 24" fill="currentColor"><path d="M21.056 10.32c-.048-1.86-1.096-3.336-2.808-3.768-1.62-.432-3.192-.192-4.668.432-.804.336-1.38.96-1.716 1.764-.384.852-.336 1.716.096 2.52.432.852 1.188 1.332 2.136 1.428 1.284.144 2.472-.192 3.576-.804.432-.24.804-.576 1.14-1.008.096.384.144.768.048 1.14-.144.96-.72 1.62-1.524 2.052-1.188.624-2.472.816-3.768.576-1.284-.24-2.376-.816-3.24-1.86-1.092-1.332-1.476-2.904-1.236-4.62.24-1.668 1-3.048 2.232-4.092 1.284-1.044 2.76-1.524 4.428-1.38 1.524.144 2.856.768 3.852 1.908.852 1 1.284 2.196 1.284 3.528v2.148h-6.948v-1.38h5.28v-.432zm-9.912 4.572c-1.524-.144-2.856-.768-3.852-1.908-.852-1-1.284-2.196-1.284-3.528 0-1.332.432-2.532 1.284-3.528 1-1.14 2.328-1.764 3.852-1.908 1.668-.144 3.144.336 4.428 1.38 1.236 1.044 2 2.424 2.232 4.092.24 1.716-.144 3.288-1.236 4.62-.864 1.044-1.956 1.62-3.24 1.86-1.284.24-2.568.048-3.768-.576-.804-.432-1.38-1.092-1.524-2.052-.096-.384-.048-.768.048-1.14.336.384.72.72 1.14 1.008 1.104.612 2.292.948 3.576.804.948-.096 1.704-.576 2.136-1.428.432-.804.48-1.668.096-2.52-.336-.804-.912-1.428-1.716-1.764-1.476-.624-3.048-.864-4.668-.432-1.712.432-2.76 1.908-2.808 3.768v.432h5.28v1.38h-6.948v-2.148z"/></svg>
                      <span className="font-semibold text-lg -ml-2">Go</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-2xl blur opacity-50"></div>
            <div className="relative bg-[#0F172A] rounded-2xl border border-[#1F2937] shadow-2xl overflow-hidden flex flex-col h-[400px]">
              
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2937] bg-[#0F172A]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <button 
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
                  title="Copy code"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Language Tabs */}
              <div className="flex px-4 pt-2 border-b border-[#1F2937] bg-[#0F172A]/80">
                {(['Python', 'TypeScript', 'Go'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === lang ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {lang}
                    {activeTab === lang && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Code Content */}
              <div className="p-6 flex-1 overflow-auto font-mono text-sm text-gray-300 leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <pre className="whitespace-pre-wrap break-words">
                      {displayedCode}
                      <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse align-middle"></span>
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
