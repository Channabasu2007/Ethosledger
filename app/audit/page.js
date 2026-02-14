"use client";

import React, { useState } from 'react';

// --- 1. ScoreCard ---
const ScoreCard = () => (
  <div className="col-span-1 bg-[#11211e] rounded-[28px] p-8 border border-white/5 flex flex-col justify-between aspect-square outline outline-1 outline-white/5">
    <div>
      <p className="text-[#1ae0b5]/80 text-[10px] uppercase tracking-widest font-bold mb-2">Efficiency Grade</p>
      <div className="flex items-baseline gap-2">
        <span className="text-7xl font-black text-white italic tracking-tighter">34</span>
        <span className="text-xl font-bold text-[#1ae0b5]">/100</span>
      </div>
    </div>
    <div className="pt-6 border-t border-white/5">
      <p className="text-red-400 font-bold text-[10px] inline-flex items-center gap-2 bg-red-400/10 px-3 py-1 rounded-lg uppercase tracking-widest">
        <span className="material-symbols-outlined text-sm">eco</span> Sub-optimal
      </p>
    </div>
  </div>
);

// --- 2. RotRadarWidget ---
const RotRadarWidget = () => (
  <div className="col-span-1 bg-[#11211e] rounded-[28px] p-8 border border-white/5 flex flex-col relative overflow-hidden aspect-square outline outline-1 outline-white/5">
    <div className="flex justify-between items-start mb-1 z-10">
      <div>
        <h2 className="text-xl font-bold text-white leading-none italic">Rot Radar</h2>
        <p className="text-[10px] text-gray-500 mt-2 font-medium">Digital Waste Analysis</p>
      </div>
      <span className="material-symbols-outlined text-[#1ae0b5] opacity-40">radar</span>
    </div>

    <div className="flex-1 flex items-center justify-center relative scale-90">
      <span className="absolute top-0 text-[8px] font-black text-[#1ae0b5] tracking-widest uppercase">SEO</span>
      <span className="absolute right-0 text-[8px] font-black text-[#1ae0b5] tracking-widest uppercase">PERF</span>
      <span className="absolute bottom-0 text-[8px] font-black text-[#1ae0b5] tracking-widest uppercase text-center leading-tight">Best<br/>Practices</span>
      <span className="absolute left-0 text-[8px] font-black text-[#1ae0b5] tracking-widest uppercase">A11Y</span>

      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-45">
        <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
        <polygon points="100,25 170,100 100,175 40,100" fill="#1ae0b5" fillOpacity="0.15" stroke="#1ae0b5" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
);

// --- 3. MetricTiles ---
const MetricTiles = () => (
  <>
    <div className="col-span-1 bg-[#11211e] rounded-[28px] p-6 flex flex-col gap-4 group hover:bg-white/5 transition-colors outline outline-1 outline-white/5 aspect-square justify-between">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-full bg-[#24473f] text-[#1ae0b5] flex items-center justify-center">
          <span className="material-symbols-outlined">weight</span>
        </div>
        <span className="text-red-400 text-sm font-bold flex items-center gap-1 bg-red-400/10 px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-sm">trending_up</span> +12%
        </span>
      </div>
      <div>
        <p className="text-gray-400 font-medium text-sm">Total Page Weight</p>
        <p className="text-3xl font-bold text-white mt-1">2.4 MB</p>
      </div>
      <div className="flex gap-1 h-12 items-end mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="bg-gray-600 w-1/5 h-[40%] rounded-t-sm"></div>
        <div className="bg-gray-600 w-1/5 h-[60%] rounded-t-sm"></div>
        <div className="bg-gray-600 w-1/5 h-[30%] rounded-t-sm"></div>
        <div className="bg-gray-600 w-1/5 h-[50%] rounded-t-sm"></div>
        <div className="bg-[#1ae0b5] w-1/5 h-[90%] rounded-t-sm shadow-[0_0_10px_#1ae0b5]"></div>
      </div>
    </div>

    <div className="col-span-1 grid grid-cols-2 gap-4 aspect-square">
      <div className="bg-[#11211e] rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
        <span className="material-symbols-outlined text-yellow-400 text-xl">memory</span>
        <div>
          <p className="text-2xl font-bold text-white leading-none">82%</p>
          <p className="text-gray-400 text-[10px] mt-1 uppercase">CPU</p>
        </div>
      </div>
      <div className="bg-[#11211e] rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
        <span className="material-symbols-outlined text-blue-400 text-xl">speed</span>
        <div>
          <p className="text-2xl font-bold text-white leading-none">1.2s</p>
          <p className="text-gray-400 text-[10px] mt-1 uppercase">Latency</p>
        </div>
      </div>
      <div className="bg-[#11211e] rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
        <span className="material-symbols-outlined text-purple-400 text-xl">hub</span>
        <div>
          <p className="text-2xl font-bold text-white leading-none">128</p>
          <p className="text-gray-400 text-[10px] mt-1 uppercase">API</p>
        </div>
      </div>
      <div className="bg-red-900/10 rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-red-500/20">
        <span className="material-symbols-outlined text-red-500 animate-pulse text-xl">bug_report</span>
        <div>
          <p className="text-2xl font-bold text-white leading-none">3</p>
          <p className="text-red-400 text-[10px] mt-1 uppercase">Threats</p>
        </div>
      </div>
    </div>
  </>
);

// --- 4. CodeAnalysisWidget ---
const CodeAnalysisWidget = () => (
  <div className="col-span-1 md:col-span-2 bg-black rounded-[28px] border border-red-500/20 overflow-hidden relative flex flex-col aspect-square md:aspect-auto min-h-[350px]">
    <div className="absolute inset-0 code-scan-line opacity-20 pointer-events-none"></div>
    <div className="p-4 border-b border-white/5 bg-red-950/20 flex justify-between items-center px-6">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
      </div>
      <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest">malware_sandbox</span>
    </div>
    <div className="p-8 font-mono text-[12px] leading-relaxed flex-1">
      <div className="flex gap-4 opacity-30 text-gray-500"><span className="w-6 text-right">43</span><span>window.addEventListener('scroll', heavy);</span></div>
      <div className="flex gap-4 bg-red-500/10 py-1 border-l-2 border-red-500 px-2 my-1"><span className="w-6 text-right text-red-500 font-bold">44</span><span className="text-red-400 italic">eval(atob('ZXZhbChhb...'));</span></div>
      <div className="flex gap-4 opacity-30 text-gray-500"><span className="w-6 text-right">45</span><span>{"}"}</span></div>
      <div className="mt-10 p-4 rounded-2xl bg-[#11211e] border border-red-500/10 flex items-start gap-3">
        <span className="material-symbols-outlined text-red-500">dangerous</span>
        <div>
          <p className="text-white font-bold italic text-[11px]">Injection Detected</p>
          <p className="text-[10px] text-gray-500 mt-1">Obfuscated Crypto-Jacker found.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- 5. BloatTimelineWidget ---
const BloatTimelineWidget = () => (
  <div className="col-span-1 md:col-span-2 bg-[#11211e] rounded-[28px] p-8 border border-white/5 flex flex-col justify-between aspect-square md:aspect-auto">
    <h3 className="text-xl font-bold italic text-white">Bloat Timeline</h3>
    <div className="h-32 w-full flex items-end gap-1.5 mt-8 px-2 relative">
       {[40, 55, 45, 70, 60, 85, 80, 110, 90, 120, 110, 140].map((h, i) => (
         <div key={i} className="flex-1 relative group">
            <div style={{ height: `${(h / 150) * 100}%` }} className="w-full bg-red-500/10 rounded-t-sm group-hover:bg-red-500/30 transition-all"></div>
            <div style={{ height: `${((h*0.3) / 150) * 100}%` }} className="absolute bottom-0 w-full bg-[#1ae0b5]/20 group-hover:bg-[#1ae0b5] transition-all rounded-t-sm"></div>
         </div>
       ))}
    </div>
    <div className="flex justify-between mt-8 text-[9px] font-mono text-gray-600 border-t border-white/5 pt-4 uppercase tracking-[0.2em]">
      <span>MAR 2025</span>
      <span>FEB 2026</span>
    </div>
  </div>
);

// --- MAIN PAGE ---
export default function AuditPage() {
    return (
        <div className="min-h-screen bg-[#0a1210] text-[#e0e3e2] flex flex-col lowercase font-sans selection:bg-[#1ae0b5]/30">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />

            <div className="flex-1 flex flex-col h-full max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12 w-full">
                
                {/* Updated Header with Integrated Nav */}
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8 px-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[#1ae0b5] font-bold tracking-[0.2em] text-[10px] uppercase font-mono mb-1">
                            <span className="material-symbols-outlined text-sm">language</span> Audit Report
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic text-white leading-none">google.com</h1>
                        <p className="text-gray-400 text-xs mt-4 flex items-center gap-2 lowercase font-mono">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Audit completed on Oct 24, 2023
                        </p>
                    </div>

                    {/* Integrated Top Navigation */}
                    <div className="bg-[#11211e] border border-white/10 rounded-2xl p-1.5 flex items-center gap-1">
                        <button className="h-10 px-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-sm">download</span> PDF
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <button className="h-10 px-6 rounded-xl bg-[#1ae0b5] text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                            <span className="material-symbols-outlined text-sm">share</span> Share
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <button className="h-10 px-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-sm">code</span> Live
                        </button>
                    </div>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ScoreCard />
                    <RotRadarWidget />
                    <MetricTiles />
                    <CodeAnalysisWidget />
                    <BloatTimelineWidget />
                </div>
            </div>

            <style jsx global>{`
                @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
                .code-scan-line {
                    position: absolute; width: 100%; height: 2px;
                    background: linear-gradient(90deg, transparent, #ef4444, transparent);
                    animation: scan 4s linear infinite;
                }
                body { background-color: #0a1210; margin: 0; }
            `}</style>
        </div>
    );
}