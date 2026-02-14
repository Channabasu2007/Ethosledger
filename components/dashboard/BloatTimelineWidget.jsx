"use client";

export default function BloatTimelineWidget() {
  return (
    /* md:col-span-2 for half-width. min-h reduced to 240px (0.75 of 320px) */
    <div className="col-span-1 md:col-span-2 bg-[#11211e] rounded-[28px] p-6 md:p-8 flex flex-col gap-6 border border-white/5 outline outline-1 outline-white/5 h-full min-h-[240px] relative overflow-hidden">
      
      {/* 1. Header & Legend - Scaled spacing */}
      <div className="flex justify-between items-start flex-none">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 ">
            Digital Bloat Timeline
            <span className="material-symbols-outlined text-gray-500 text-sm" title="Historical data">history</span>
          </h3>
          <p className="text-gray-400 text-sm mt-1 lowercase">
            Weight <span className="text-red-400 font-bold">+40%</span> (6mo)
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1ae0b5]"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scripts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Images</span>
          </div>
        </div>
      </div>

      {/* 2. Timeline Visual - Flex-1 ensures it fills the remaining 0.75 height space */}
      <div className="relative w-full flex-1 min-h-0 mt-2 mb-4">
        
        {/* Months Axis - Positioned at bottom with adjusted scale */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-600 font-mono uppercase tracking-tighter translate-y-6">
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
        </div>

        {/* Chart Area - Scaled viewBox height to 100 for better 0.75 height aspect ratio */}
        <svg 
          className="w-full h-full overflow-visible" 
          preserveAspectRatio="none" 
          viewBox="0 0 800 100"
        >
          <defs>
            <linearGradient id="timelineGradientFixed" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1ae0b5" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="#1ae0b5" stopOpacity="0"></stop>
            </linearGradient>
          </defs>

          {/* Grid Lines (Vertical) - Scaled to Y=100 */}
          {[0, 160, 320, 480, 640, 800].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
          ))}

          {/* Data Path Fill - Scaled Y points by 0.75 (approx) */}
          <path 
            d="M0,80 C100,77 150,87 200,67 C250,47 300,53 400,60 C500,67 550,40 650,47 C750,53 800,13 V100 H0 Z" 
            fill="url(#timelineGradientFixed)"
          />
          
          {/* Main Stroke Line */}
          <path 
            d="M0,80 C100,77 150,87 200,67 C250,47 300,53 400,60 C500,67 550,40 650,47 C750,53 800,13" 
            fill="none" 
            stroke="#1ae0b5" 
            strokeLinecap="round" 
            strokeWidth="3" 
          />

          {/* v2.0 Annotation Node - Positioned on scaled path */}
          <g transform="translate(650, 47)">
            <circle r="4" fill="#11211e" stroke="#fff" strokeWidth="2" />
            <foreignObject x="-60" y="-40" width="120" height="35">
              <div className="bg-black/80 text-white text-[9px] py-1 rounded-lg border border-white/10 shadow-2xl text-center font-bold italic uppercase">
                v2.0 Release
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
      
      {/* 3. Small spacer for label breathing room */}
      <div className="h-2 flex-none"></div>
    </div>
  );
}