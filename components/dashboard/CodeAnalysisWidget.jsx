export default function CodeAnalysisWidget() {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#1b2230]/50 backdrop-blur-xl rounded-[28px] outline outline-1 outline-white/5 overflow-hidden relative min-h-[380px] flex flex-col group transition-all hover:bg-[#1b2230]/80">
            
            {/* Hacker Background Scan Effect - Integrated into Theme */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/40 via-transparent to-transparent animate-scan-line h-1/2 w-full" />
                <div className="absolute inset-0 font-mono text-[8px] text-red-500 whitespace-pre leading-none select-none">
                    {`01001010 01101111 01101000 01101110 00100000 01000100 01101111 01100101
                    01101101 01100001 01101100 01110111 01100001 01110010 01100101 01011111
                    01100100 01100101 01110100 01100101 01100011 01110100 01100101 01100101`}
                </div>
            </div>

            {/* Terminal Header - Matching MetricTile padding/style */}
            <div className="p-4 border-b border-white/5 bg-red-950/10 flex justify-between items-center px-6">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-widest">Malware Sandbox Active</span>
                </div>
            </div>

            {/* Code Terminal Content */}
            <div className="p-6 md:p-8 font-mono text-[12px] md:text-[13px] leading-relaxed overflow-x-auto flex-1 relative z-10 custom-scrollbar">
                {/* Line 43 */}
                <div className="flex gap-6 opacity-30 group-hover:opacity-50 transition-opacity">
                    <span className="w-8 text-right text-gray-500 select-none">43</span>
                    <span className="text-slate-300">window.addEventListener(<span className="text-amber-200">&apos;scroll&apos;</span>, heavyLogic);</span>
                </div>

                {/* Line 44 - THE INJECTION */}
                <div className="flex gap-6 my-2 py-2 bg-red-500/10 border-l-2 border-red-500 px-4 group/line relative">
                    <span className="w-8 text-right text-red-500 font-bold select-none">44</span>
                    <span className="text-red-400 font-medium drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]">
                        eval(atob(<span className="text-white decoration-red-500/30 underline underline-offset-4">&apos;ZXZhbChhb...&apos;</span>));
                        <span className="ml-3 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded italic font-bold">INJECTION</span>
                    </span>
                </div>

                {/* Line 45 */}
                <div className="flex gap-6 opacity-30">
                    <span className="w-8 text-right text-gray-500 select-none">45</span>
                    <span className="text-slate-300">{"}"}</span>
                </div>

                {/* Alert Box - Integrated Tonal Design */}
                <div className="mt-8 p-5 rounded-2xl bg-[#0b0f19]/60 border border-red-500/20 shadow-xl flex items-start gap-4">
                    <div className="bg-red-500/20 p-2 rounded-xl">
                        <span className="material-symbols-outlined text-red-500 text-lg">dangerous</span>
                    </div>
                    <div>
                        <p className="text-white font-bold italic text-[12px]">Integrity Breach Detected</p>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                            Obfuscated <span className="text-red-400 font-bold">Crypto-Jacker</span> found in main bundle. 
                            Executing background threads impacting processor health.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="px-6 py-3 border-t border-white/5 bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">Scanner: v4.2.0</span>
                    <span className="text-[9px] font-mono text-red-500 uppercase font-bold">Threat: Elevated</span>
                </div>
                <span className="text-[9px] font-mono text-gray-600 font-bold tracking-widest">0x00045FA</span>
            </div>

            <style jsx>{`
                @keyframes scan-line {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
                .animate-scan-line {
                    animation: scan-line 4s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}