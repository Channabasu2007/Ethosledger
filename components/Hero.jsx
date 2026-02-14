'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const [url, setUrl] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url) {
            router.push(`/audit?url=${encodeURIComponent(url)}`);
        }
    };

    return (
        <main className="relative flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-12 w-full max-w-[1400px] mx-auto min-h-screen">
            {/* Ambient Background Blob Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blob-bg animate-blob pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center gap-10">
                {/* Headline Group */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-surface-container-high/50 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-medium tracking-wide uppercase text-gray-400">Live Carbon Audits</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white">
                        Is your website <br className="hidden md:block" />
                        <span className="text-error-pastel glitch-text inline-block" data-text="rotting?">rotting?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Digital carbon emissions are invisible. See how much your site contributes to the <span className="text-gray-200 font-medium">digital decay</span>.
                    </p>
                </div>

                {/* Interaction Area */}
                <div className="w-full flex flex-col items-center gap-8 mt-4">
                    {/* Floating Search Pill */}
                    <div className="group relative w-full max-w-3xl">
                        {/* Glow effect on hover/focus */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-error-pastel/20 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition duration-500"></div>
                        <form onSubmit={handleSubmit} className="relative flex items-center w-full h-20 bg-surface-container-high rounded-full shadow-2xl transition-transform transform hover:scale-[1.01] group-focus-within:scale-[1.01] ring-1 ring-white/5 group-focus-within:ring-primary/50">
                            <div className="pl-8 text-gray-400 group-focus-within:text-primary transition-colors">
                                <span className="material-symbols-outlined text-3xl">search</span>
                            </div>
                            <input
                                className="w-full h-full bg-transparent border-none text-xl md:text-2xl text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-6 font-medium"
                                placeholder="Paste your URL here (e.g., google.com)..."
                                required
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            {/* FAB Submit Button */}
                            <div className="pr-2">
                                <button className="flex items-center justify-center w-16 h-16 bg-primary rounded-full text-surface hover:bg-white transition-all shadow-[0_0_20px_rgba(26,224,181,0.4)] hover:shadow-[0_0_30px_rgba(26,224,181,0.6)] transform active:scale-95 cursor-pointer" type="submit">
                                    <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Ticker / Chips */}
                    <div className="w-full overflow-hidden relative">
                        {/* Fade masks for scroll area */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

                        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 px-12 snap-x no-scrollbar justify-start md:justify-center">
                            {/* Chip 1: Rotten */}
                            <div className="snap-center shrink-0 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-surface-container border border-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-default group">
                                <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error-pastel group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">skull</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Amazon</span>
                                    <span className="text-sm font-bold text-error-pastel">D- (Rotten)</span>
                                </div>
                            </div>
                            {/* Chip 2: Clean */}
                            <div className="snap-center shrink-0 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-surface-container border border-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-default group">
                                <div className="w-10 h-10 rounded-full bg-success-container flex items-center justify-center text-success-pastel group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Wikipedia</span>
                                    <span className="text-sm font-bold text-success-pastel">A+ (Clean)</span>
                                </div>
                            </div>
                            {/* Chip 3: Average */}
                            <div className="snap-center shrink-0 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-surface-container border border-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-default group">
                                <div className="w-10 h-10 rounded-full bg-warning-container flex items-center justify-center text-warning-pastel group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">warning</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Apple</span>
                                    <span className="text-sm font-bold text-warning-pastel">C (Average)</span>
                                </div>
                            </div>
                            {/* Chip 4: Clean */}
                            <div className="snap-center shrink-0 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-surface-container border border-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-default group">
                                <div className="w-10 h-10 rounded-full bg-success-container flex items-center justify-center text-success-pastel group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">eco</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Ecosia</span>
                                    <span className="text-sm font-bold text-success-pastel">A (Clean)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative grid overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0" data-alt="Subtle noise texture overlay"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-container-high to-transparent"></div>
        </main>
    );
}
