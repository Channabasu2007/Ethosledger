import { useState } from 'react';

export default function MetricTiles({ metrics, seo }) {
    const [showCpuInfo, setShowCpuInfo] = useState(false);
    const [showSeoInfo, setShowSeoInfo] = useState(false);

    const trackerCount = metrics?.trackerCount || 0;
    const cpuUsage = metrics?.cpuUsage || 0;
    const seoScore = seo?.score || 0;
    const seoGrade = seo?.grade || 'N/A';
    const isHighRisk = trackerCount > 10 || parseFloat(cpuUsage) > 40;

    const tiles = [
        { label: "Page Weight", value: `${metrics?.totalWeight || "0.00"} MB`, icon: "weight", color: "text-[#1ae0b5]" },
        { label: "CPU Load", value: `${cpuUsage}%`, icon: "memory", color: "text-yellow-400", hasInfo: true, infoKey: 'cpu' },
        { label: "CO2 / Visit", value: `${metrics?.co2 || "0.00"}g`, icon: "eco", color: "text-green-400" },
        { label: "User Latency", value: `${metrics?.loadTime || "0.0"}s`, icon: "speed", color: "text-blue-400" },
        { label: "SEO Score", value: `${seoScore}/100`, icon: "search", color: "text-orange-400", hasInfo: true, infoKey: 'seo', badge: seoGrade },
        { label: "API Calls", value: metrics?.apiCalls || 0, icon: "hub", color: "text-purple-400" },
        { label: "Trackers", value: trackerCount, icon: "fingerprint", color: "text-pink-400" },
    ];

    return (
        <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {tiles.map((tile, idx) => (
                <div key={idx} className="bg-surface-dark rounded-[24px] p-5 flex flex-col justify-between outline outline-1 outline-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex justify-between items-start">
                        <span className={`material-symbols-outlined ${tile.color} text-2xl`}>{tile.icon}</span>
                        <div className="flex items-center gap-2">
                            {tile.badge && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    tile.badge === 'A' ? 'bg-green-500/20 text-green-400' :
                                    tile.badge === 'B' ? 'bg-blue-500/20 text-blue-400' :
                                    tile.badge === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                                    tile.badge === 'D' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {tile.badge}
                                </span>
                            )}
                            {tile.hasInfo && (
                                <button 
                                    onClick={() => {
                                        if (tile.infoKey === 'cpu') setShowCpuInfo(!showCpuInfo);
                                        if (tile.infoKey === 'seo') setShowSeoInfo(!showSeoInfo);
                                    }}
                                    className="w-5 h-5 rounded-full border border-white/20 text-white/40 text-[10px] flex items-center justify-center hover:border-[#1ae0b5] hover:text-[#1ae0b5] transition-colors"
                                >
                                    ?
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white tracking-tighter leading-none">{tile.value}</p>
                        <p className="text-gray-500 text-[9px] uppercase font-bold tracking-[0.15em] mt-2">{tile.label}</p>
                    </div>

                    {/* CPU Explainer Popup */}
                    {tile.infoKey === 'cpu' && showCpuInfo && (
                        <div className="absolute z-50 top-20 left-4 right-4 md:left-auto md:right-auto md:w-64 bg-surface-dark border border-[#1ae0b5]/30 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200">
                            <p className="text-[#1ae0b5] text-[10px] font-black uppercase mb-2 tracking-widest">Forensic Logic</p>
                            <p className="text-gray-300 text-[11px] leading-relaxed">
                                This captures the <strong>Computational Energy Debt</strong>. It's the stress placed on the user's hardware by background scripts. High usage = direct battery drain and thermal waste.
                            </p>
                            <button onClick={() => setShowCpuInfo(false)} className="mt-3 text-[10px] text-[#1ae0b5] font-bold uppercase hover:underline">Dismiss</button>
                        </div>
                    )}

                    {/* SEO Explainer Popup */}
                    {tile.infoKey === 'seo' && showSeoInfo && (
                        <div className="absolute z-50 top-20 left-4 right-4 md:left-auto md:right-auto md:w-80 bg-surface-dark border border-orange-400/30 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200">
                            <p className="text-orange-400 text-[10px] font-black uppercase mb-2 tracking-widest">SEO Health Check</p>
                            <p className="text-gray-300 text-[11px] leading-relaxed mb-3">
                                Evaluates search engine optimization quality including meta tags, headings, mobile-friendliness, structured data, and content optimization.
                            </p>
                            
                            {seo?.issues && seo.issues.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-red-400 text-[10px] font-bold uppercase mb-1">Top Issues:</p>
                                    <ul className="space-y-1">
                                        {seo.issues.slice(0, 3).map((issue, i) => (
                                            <li key={i} className="text-[10px] text-gray-400 flex items-start gap-1">
                                                <span className="text-red-400 mt-0.5">•</span>
                                                <span>{issue}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                <span className="text-[10px] text-gray-400">Grade: <strong className="text-orange-400">{seoGrade}</strong></span>
                                <button onClick={() => setShowSeoInfo(false)} className="text-[10px] text-orange-400 font-bold uppercase hover:underline">Dismiss</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Final Risk Tile (8th Tile) */}
            <div className={`rounded-[24px] p-5 flex flex-col justify-between bg-surface-dark transition-all outline outline-1 outline-white/5 ${isHighRisk ? 'bg-red-500/10 border border-red-500/20' : 'bg-[#12161f]'}`}>
                <span className={`material-symbols-outlined text-2xl ${isHighRisk ? 'text-red-500 animate-pulse' : 'text-[#1ae0b5]'}`}>
                    {isHighRisk ? 'security' : 'verified'}
                </span>
                <div>
                    <p className={`text-2xl font-black tracking-tighter leading-none ${isHighRisk ? 'text-red-500' : 'text-white'}`}>
                        {isHighRisk ? 'HIGH' : 'LOW'}
                    </p>
                    <p className="text-gray-500 text-[9px] uppercase font-bold tracking-[0.15em] mt-2">Threat Level</p>
                </div>
            </div>
        </div>
    );
}