export default function MetricTiles({ metrics }) {
    return (
        <>
            {/* Page Weight Card */}
            <div className="col-span-1 bg-surface-dark rounded-[28px] p-6 flex flex-col gap-4 outline outline-1 outline-white/5">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-[#24473f] text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">weight</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-400 font-medium text-sm">Total Page Weight</p>
                    <p className="text-3xl font-bold text-white mt-1">{metrics?.totalWeight || "0.00"} MB</p>
                </div>
            </div>

            {/* Forensic Grid */}
            <div className="col-span-1 grid grid-cols-2 gap-4">
                {/* CPU Stress */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
                    <span className="material-symbols-outlined text-yellow-400">memory</span>
                    <div>
                        <p className="text-2xl font-bold text-white">82%</p>
                        <p className="text-gray-400 text-xs">CPU Usage</p>
                    </div>
                </div>

                {/* Network Latency */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
                    <span className="material-symbols-outlined text-blue-400">speed</span>
                    <div>
                        <p className="text-2xl font-bold text-white">{metrics?.loadTime || "0.00"}s</p>
                        <p className="text-gray-400 text-xs">Latency</p>
                    </div>
                </div>

                {/* API surveillance */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5">
                    <span className="material-symbols-outlined text-purple-400">hub</span>
                    <div>
                        <p className="text-2xl font-bold text-white">{metrics?.trackers || "0"}</p>
                        <p className="text-gray-400 text-xs">API Calls</p>
                    </div>
                </div>

                {/* Carbon Card - Added as requested */}
                <div className="bg-surface-dark rounded-[24px] p-4 flex flex-col justify-between outline outline-1 outline-white/5 border border-primary/20">
                    <span className="material-symbols-outlined text-primary">cloud</span>
                    <div>
                        <p className="text-2xl font-bold text-white">{metrics?.co2 || "0.00"}g</p>
                        <p className="text-gray-400 text-xs">CO2 / Visit</p>
                    </div>
                </div>
            </div>
        </>
    );
}