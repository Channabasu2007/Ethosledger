import ScoreCard from "@/components/dashboard/ScoreCard";
import RotRadarWidget from "@/components/dashboard/RotRadarWidget";
import MetricTiles from "@/components/dashboard/MetricTiles";
import BloatTimelineWidget from "@/components/dashboard/BloatTimelineWidget";

export default function AuditPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col font-display selection:bg-primary selection:text-black">
            {/* Main Container */}
            <div className="flex-1 flex flex-col h-full layout-container p-4 md:p-6 lg:p-8 pb-32">
                {/* Header - Custom for Dashboard */}
                <header className="flex items-center justify-between mb-8 px-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-primary/80 mb-1">
                            <span className="material-symbols-outlined text-xl">language</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Audit Report</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">google.com</h1>
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                            Audit completed on Oct 24, 2023
                        </p>
                    </div>


                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
                    <ScoreCard />
                    <RotRadarWidget />
                    <MetricTiles />
                    <BloatTimelineWidget />
                </div>
            </div>

            {/* Fixed Bottom App Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
                <div className="bg-[#1f3530]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full p-2 flex items-center justify-between gap-2 pointer-events-auto">
                    <button className="flex-1 h-12 px-6 rounded-full hover:bg-white/5 text-gray-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">download</span>
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                    <div className="w-px h-8 bg-white/10"></div>
                    <button className="flex-1 h-12 px-6 rounded-full bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(26,224,181,0.3)] min-w-max cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">share</span>
                        Share Shame
                    </button>
                    <div className="w-px h-8 bg-white/10"></div>
                    <button className="flex-1 h-12 px-6 rounded-full hover:bg-white/5 text-gray-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">code</span>
                        <span className="hidden sm:inline">View Code</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
