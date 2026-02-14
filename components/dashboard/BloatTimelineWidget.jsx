export default function BloatTimelineWidget() {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-surface-dark rounded-[28px] p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Digital Bloat Timeline
                        <span className="material-symbols-outlined text-gray-500 text-sm" title="Historical data">history</span>
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Page weight has increased by <span className="text-red-400 font-bold">40%</span> in the last 6 months.
                    </p>
                </div>
                {/* Legend */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-xs text-gray-300">Scripts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-300">Images</span>
                    </div>
                </div>
            </div>

            {/* Timeline Visual */}
            <div className="relative w-full h-[150px] mt-4">
                {/* Months Axis */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 font-mono translate-y-6">
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                </div>

                {/* Chart Area */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 150">
                    <defs>
                        <linearGradient id="timelineGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#1ae0b5" stopOpacity="0.4"></stop>
                            <stop offset="100%" stopColor="#1ae0b5" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>

                    {/* Grid Lines (Vertical) */}
                    <line x1="0" y1="0" x2="0" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="160" y1="0" x2="160" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="320" y1="0" x2="320" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="480" y1="0" x2="480" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="640" y1="0" x2="640" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="800" y1="0" x2="800" y2="150" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />

                    {/* Data Path */}
                    <path d="M0,120 C100,115 150,130 200,100 C250,70 300,80 400,90 C500,100 550,60 650,70 C750,80 800,20 800,20 V150 H0 Z" fill="url(#timelineGradient)"></path>
                    <path d="M0,120 C100,115 150,130 200,100 C250,70 300,80 400,90 C500,100 550,60 650,70 C750,80 800,20" fill="none" stroke="#1ae0b5" strokeLinecap="round" strokeWidth="3"></path>

                    {/* Annotations */}
                    <g transform="translate(650, 70)">
                        <circle r="4" fill="#11211e" stroke="#fff" strokeWidth="2" />
                        <foreignObject x="-60" y="-40" width="120" height="40">
                            <div className="bg-black/80 text-white text-[10px] p-1 rounded text-center border border-white/10 shadow-xl">
                                v2.0 Release
                            </div>
                        </foreignObject>
                    </g>
                </svg>
            </div>
        </div>
    );
}
