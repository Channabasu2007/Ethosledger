export default function BloatTimelineWidget() {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-surface-dark rounded-[28px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col gap-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Digital Bloat
                    <span className="material-symbols-outlined text-gray-500 text-sm" title="Historical data">info</span>
                </h3>
                <p className="text-gray-400 text-sm">Page size history (6 months)</p>
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-xs text-gray-300">Scripts (1.2MB)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-300">Images (0.8MB)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs text-gray-300">Fonts (0.4MB)</span>
                    </div>
                </div>
            </div>
            {/* Sparkline Area Chart */}
            <div className="flex-1 w-full h-[120px] relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10"></div>
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10"></div>
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10"></div>
                </div>
                <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 800 120">
                    <defs>
                        <linearGradient id="bloatGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#1ae0b5" stopOpacity="0.3"></stop>
                            <stop offset="100%" stopColor="#1ae0b5" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    {/* Area */}
                    <path d="M0,80 C100,75 150,90 200,60 C250,30 300,40 400,50 C500,60 550,20 650,30 C750,40 800,20 800,20 V120 H0 Z" fill="url(#bloatGradient)"></path>
                    {/* Line */}
                    <path d="M0,80 C100,75 150,90 200,60 C250,30 300,40 400,50 C500,60 550,20 650,30 C750,40 800,20" fill="none" stroke="#1ae0b5" strokeLinecap="round" strokeWidth="3"></path>
                    {/* Points */}
                    <circle cx="650" cy="30" fill="#11211e" r="4" stroke="#fff" strokeWidth="2"></circle>
                </svg>
            </div>
        </div>
    );
}
