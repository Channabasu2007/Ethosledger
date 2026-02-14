export default function ScoreCard() {
    return (
        <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden rounded-[28px] bg-surface-dark group outline outline-1 outline-white/5">
            {/* Background Mesh */}
            <div className="absolute inset-0 opacity-20 mesh-gradient-bg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-medium text-gray-300">Sustainability Score</h2>
                        <span className="text-red-400 font-bold text-sm bg-red-400/10 px-3 py-1 rounded-full w-fit mt-2 border border-red-400/20">Failing Grade</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 text-3xl">eco</span>
                </div>
                <div className="flex flex-col items-center justify-center py-8">
                    <h1 className="text-[140px] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">34</h1>
                </div>
                <div className="flex gap-4 items-end justify-between">
                    <div className="text-sm text-gray-400 max-w-[200px]">
                        Your site produces <strong className="text-white">1.8g</strong> of CO2 per visit. That's dirtier than 76% of the web.
                    </div>
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
