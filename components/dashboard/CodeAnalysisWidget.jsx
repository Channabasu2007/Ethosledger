"use client";

export default function CodeAnalysisWidget() {
    return (
        /* md:col-span-2 to match your timeline widget. min-h adjusted to ~315px (matching the 0.75 scale logic) */
        <div className="col-span-1 md:col-span-2 bg-[#0d131f]/80 backdrop-blur-2xl rounded-[32px] outline outline-1 outline-white/10 overflow-hidden relative min-h-[315px] flex flex-col group transition-all duration-500 hover:outline-red-500/30 hover:shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)]">
            
            {/* 1. Cybernetic Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

            {/* 2. Animated Scanning Beam */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-scan-line h-[30%] w-full" />
            </div>

            {/* 3. Terminal Header - Tightened for 0.75 scale */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-red-950/20 to-transparent flex justify-between items-center px-6 relative z-20">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/5"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-1.5 py-0.5 border border-red-500/40 rounded text-[8px] font-black text-red-500 uppercase tracking-[0.1em] bg-red-500/5">
                        Sandbox
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest hidden sm:block">0x992B</span>
                </div>
            </div>

            {/* 4. The Code Terminal - Scaled padding and text */}
            <div className="p-6 font-mono text-[12px] leading-relaxed overflow-hidden flex-1 relative z-20 custom-scrollbar lowercase">
                <div className="flex gap-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                    <span className="w-6 text-right text-gray-500 select-none">42</span>
                    <span className="text-blue-400 text-xs">function <span className="text-white">initAudit</span>() {"{"}</span>
                </div>

                {/* THE GLOWING INJECTION LINE - Compacted for scale */}
                <div className="flex gap-4 my-2 py-2 bg-red-500/[0.07] border-l-[2px] border-red-500 px-3 relative group/line overflow-hidden rounded-r-lg">
                    <span className="w-6 text-right text-red-500 font-black select-none z-10 text-[11px]">44</span>
                    <span className="text-red-400 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] z-10 text-[11px] truncate">
                        eval(atob(<span className="text-white bg-red-500/20 px-1 italic">...</span>));
                        <span className="ml-2 text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded-sm italic font-black animate-bounce inline-block">!</span>
                    </span>
                </div>

                {/* 5. Floating Alert Card - Scaled for better bento fit */}
                <div className="mt-4 p-4 rounded-[20px] bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-red-500/20 shadow-xl flex items-center gap-4 transform group-hover:-translate-y-1 transition-transform">
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-red-500 blur-md opacity-20 animate-pulse" />
                        <div className="bg-red-500/10 border border-red-500/40 p-2 rounded-xl relative">
                            <span className="material-symbols-outlined text-red-500 text-xl">security</span>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <p className="text-white font-black italic text-[11px] tracking-tight uppercase truncate">Breach Detected</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium line-clamp-2">
                             crypto_jacker module active. executing purge...
                        </p>
                    </div>
                </div>
            </div>

            {/* 6. Status Footer - Compacted */}
            <div className="px-6 py-3 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between relative z-20">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[7px] text-gray-500 uppercase font-black tracking-widest leading-none">Status</span>
                        <span className="text-[9px] text-red-500 font-bold uppercase mt-1">Infected</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[7px] text-gray-500 uppercase font-black tracking-widest leading-none">Security</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase mt-1">Lvl_05</span>
                    </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping opacity-30"></div>
            </div>

            <style jsx>{`
                @keyframes scan-line {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(300%); opacity: 0; }
                }
                .animate-scan-line {
                    animation: scan-line 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}