"use client";

export default function BloatTimelineWidget({ timeline }) {
  // Default/Fallback data
  const data = timeline?.length > 0 ? timeline : [
    { year: '2018', size: 1.2 },
    { year: '2020', size: 1.8 },
    { year: '2022', size: 2.1 },
    { year: '2024', size: 3.5 },
    { year: '2026', size: 4.8 }
  ];

  const startSize = parseFloat(data[0].size);
  const endSize = parseFloat(data[data.length - 1].size);
  const growth = ((endSize - startSize) / startSize) * 100;
  const maxSize = Math.max(...data.map(d => parseFloat(d.size))) * 1.2; // 20% padding

  // Generate Path Points
  const points = data.map((d, i) => {
    const x = i * 200; // 0, 200, 400, 600, 800
    const y = 100 - (parseFloat(d.size) / maxSize) * 90; // Scale to height, leave 10px bottom padding
    return { x, y };
  });

  // Simple smooth curve generator (Catmull-Rom to Bezier conversion or just simple cubic)
  // For simplicity, we'll use straight lines for now or a basic curve approximation
  // "M x0,y0 L x1,y1 ..." is easiest, let's try to make it slightly curved by hardcoding control points if we assume 5 points
  // Actually, let's just use L (Linear) for accuracy or a simple curve logic.
  // Let's use a simple L for now to ensure it works, styling can smooth it via CSS if available or just look "technical".
  // Wait, the "C" looked cool. Let's try to construct a path string.

  // Constructing a path: M p0 L p1 ... (Linear is safest for dynamic data without a library)
  // To make it look "Area chart" we close it: V 100 H 0 Z
  const linePath = `M${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} V100 H0 Z`;

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
            Weight <span className="text-red-400 font-bold">+{growth.toFixed(0)}%</span> (Since 2018)
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1ae0b5]"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Size (MB)</span>
          </div>
        </div>
      </div>

      {/* 2. Timeline Visual - Flex-1 ensures it fills the remaining 0.75 height space */}
      <div className="relative w-full flex-1 min-h-0 mt-2 mb-4">

        {/* Months Generated from Data Years */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-600 font-mono uppercase tracking-tighter translate-y-6">
          {data.map(d => <span key={d.year}>{d.year}</span>)}
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
          {[0, 200, 400, 600, 800].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
          ))}

          {/* Data Path Fill */}
          <path
            d={areaPath}
            fill="url(#timelineGradientFixed)"
          />

          {/* Main Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#1ae0b5"
            strokeLinecap="round"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Current Annotation Node */}
          <g transform={`translate(${points[points.length - 1].x}, ${points[points.length - 1].y})`}>
            <circle r="4" fill="#11211e" stroke="#fff" strokeWidth="2" />
            <foreignObject x="-60" y="-40" width="120" height="35">
              <div className="bg-black/80 text-white text-[9px] py-1 rounded-lg border border-white/10 shadow-2xl text-center font-bold italic uppercase">
                Current: {endSize}MB
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