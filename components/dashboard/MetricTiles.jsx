export default function MetricTiles() {
    return (
        <>
            {/* 3. Metric Tile: Page Weight (Existing) */}
            <div className="col-span-1 bg-surface-dark rounded-[28px] p-6 flex flex-col gap-4 group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-[#24473f] text-primary flex items-center justify-center">
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
                    <div className="bg-primary w-1/5 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(26,224,181,0.5)]"></div>
                </div>
            </div>

            {/* 4. Metric Grid: CPU, Latency, API, Malware */}
            <div className="col-span-1 grid grid-cols-2 gap-4">
                {/* CPU Usage */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-yellow-400">memory</span>
                        <span className="text-xs text-red-400 font-bold">HIGH</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">82%</p>
                        <p className="text-gray-400 text-xs">CPU Usage</p>
                    </div>
                </div>

                {/* Latency */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-blue-400">speed</span>
                        <span className="text-xs text-gray-500">240ms</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">1.2s</p>
                        <p className="text-gray-400 text-xs">Latency</p>
                    </div>
                </div>

                {/* API Calls */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-purple-400">hub</span>
                        <span className="text-xs text-purple-400 font-bold">+45</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">128</p>
                        <p className="text-gray-400 text-xs">API Calls</p>
                    </div>
                </div>

                {/* Malware */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between group hover:bg-surface-dark-variant transition-colors outline outline-1 outline-white/5 bg-red-900/10 border border-red-500/20">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-red-500 animate-pulse">bug_report</span>
                        <span className="text-xs text-red-500 font-bold">DETECTED</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">3</p>
                        <p className="text-red-400 text-xs">Threats Found</p>
                    </div>
                </div>
            </div>
        </>
    );
}
