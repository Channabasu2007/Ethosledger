export default function MetricTiles() {
    return (
        <>
            {/* 3. Metric Tile: Page Weight */}
            <div className="col-span-1 bg-surface-dark rounded-[28px] p-6 flex flex-col gap-4 group hover:bg-surface-dark-variant transition-colors">
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
                {/* Mini bar chart */}
                <div className="flex gap-1 h-12 items-end mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-600 w-1/5 h-[40%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[60%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[30%] rounded-t-sm"></div>
                    <div className="bg-gray-600 w-1/5 h-[50%] rounded-t-sm"></div>
                    <div className="bg-primary w-1/5 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(26,224,181,0.5)]"></div>
                </div>
            </div>

            {/* 4. Metric Tile: Server Location */}
            <div className="col-span-1 bg-surface-dark rounded-[28px] p-6 flex flex-col gap-4 group hover:bg-surface-dark-variant transition-colors relative overflow-hidden">
                {/* Map Background Image */}
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center grayscale mix-blend-overlay"
                    data-location="World Map"
                    style={{ backgroundImage: "url('https://placeholder.pics/svg/300')" }}
                ></div>
                <div className="flex justify-between items-start z-10">
                    <div className="w-10 h-10 rounded-full bg-[#24473f] text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">dns</span>
                    </div>
                    <span className="text-gray-500 text-xs font-mono bg-black/30 px-2 py-1 rounded">Unknown Region</span>
                </div>
                <div className="z-10 mt-auto">
                    <p className="text-gray-400 font-medium text-sm">Server Location</p>
                    <p className="text-3xl font-bold text-white mt-1">Unknown</p>
                    <p className="text-xs text-red-400 mt-2">Cannot verify green hosting</p>
                </div>
            </div>
        </>
    );
}
