export default function MetricTiles({ weight = 0, co2 = 0, count = 0 }) {
    // Logic to determine risk color based on tracker count
    const isHighRisk = count > 10;

    return (
        <>
            {/* 1. Metric Tile: Page Weight */}
            <div className="col-span-1 bg-surface-dark rounded-[28px] p-6 flex flex-col gap-4 group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-[#24473f] text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">weight</span>
                    </div>
                    <span className="text-primary text-sm font-bold flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                        {weight > 2 ? 'HEAVY' : 'OPTIMIZED'}
                    </span>
                </div>
                <div>
                    <p className="text-gray-400 font-medium text-sm">Total Page Weight</p>
                    <p className="text-3xl font-bold text-white mt-1">{weight} MB</p>
                </div>
                <div className="flex gap-1 h-12 items-end mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-600 w-1/5 h-[40%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[60%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[30%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[50%] rounded-t-sm"></div>
                    <div className="bg-primary w-1/5 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(26,224,181,0.5)]"></div>
                </div>
            </div>

            {/* 2. Metric Grid: CO2, Trackers, Latency, Malware */}
            <div className="col-span-1 grid grid-cols-2 gap-4">
                {/* CO2 Emissions */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-green-400">eco</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{co2}g</p>
                        <p className="text-gray-400 text-xs">CO2 / View</p>
                    </div>
                </div>

                {/* Tracker Count */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-purple-400">hub</span>
                        <span className="text-xs text-purple-400 font-bold">+{count}</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{count}</p>
                        <p className="text-gray-400 text-xs">Trackers</p>
                    </div>
                </div>

                {/* CPU / Latency (Static or from Props) */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-blue-400">speed</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">1.2s</p>
                        <p className="text-gray-400 text-xs">Latency</p>
                    </div>
                </div>

                {/* Malware / Risk Status */}
                <div className={`bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between transition-colors outline outline-1 outline-white/5 ${isHighRisk ? 'bg-red-900/10 border border-red-500/20' : ''}`}>
                    <div className="flex justify-between items-start">
                        <span className={`material-symbols-outlined ${isHighRisk ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                            {isHighRisk ? 'bug_report' : 'verified_user'}
                        </span>
                        <span className={`text-[10px] font-bold ${isHighRisk ? 'text-red-500' : 'text-primary'}`}>
                            {isHighRisk ? 'RISK' : 'SAFE'}
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{isHighRisk ? 'High' : 'Low'}</p>
                        <p className="text-gray-400 text-xs">Threat Level</p>
                    </div>
                </div>
            </div>
        </>
    );
}