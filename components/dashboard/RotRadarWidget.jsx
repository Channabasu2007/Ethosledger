export default function RotRadarWidget() {
    return (
        <div className="col-span-1 md:col-span-2 min-h-[320px] bg-surface-dark rounded-[28px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden outline outline-1 outline-white/5">
            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="text-2xl font-bold text-white">Rot Radar</h3>
                    <p className="text-gray-400 text-sm">Broad analysis of digital waste</p>
                </div>
                <span className="material-symbols-outlined text-primary/50">radar</span>
            </div>
            {/* Radar Chart Visualization (SVG) */}
            <div className="flex-1 flex items-center justify-center relative my-4">
                {/* Background circles */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="w-[200px] h-[200px] rounded-full border border-white"></div>
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-white"></div>
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-white"></div>
                </div>
                {/* The Chart Shape */}
                <svg className="w-full h-full max-h-[240px] drop-shadow-[0_0_15px_rgba(26,224,181,0.3)]" viewBox="0 0 200 200">
                    {/* Polygon Points: Top(SEO), Right(Perf), Bottom(Access), Left(Best Prac) */}
                    <polygon fill="#1ae0b5" fillOpacity="0.2" points="100,30 170,90 100,160 50,100" stroke="#1ae0b5" strokeLinejoin="round" strokeWidth="3"></polygon>
                    {/* Axis Lines */}
                    <line stroke="white" strokeOpacity="0.1" x1="100" x2="100" y1="100" y2="10"></line>
                    <line stroke="white" strokeOpacity="0.1" x1="100" x2="190" y1="100" y2="100"></line>
                    <line stroke="white" strokeOpacity="0.1" x1="100" x2="100" y1="100" y2="190"></line>
                    <line stroke="white" strokeOpacity="0.1" x1="100" x2="10" y1="100" y2="100"></line>
                </svg>
                {/* Labels placed absolutely for ease */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-surface-dark px-2 text-xs font-bold text-primary">SEO</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-surface-dark px-2 text-xs font-bold text-primary">BEST PRACTICES</div>
                <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 bg-surface-dark px-2 text-xs font-bold text-primary">A11Y</div>
                <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 bg-surface-dark px-2 text-xs font-bold text-primary">PERF</div>
            </div>
        </div>
    );
}
