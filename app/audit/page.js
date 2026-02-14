'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ScoreCard from "@/components/dashboard/ScoreCard";
import RotRadarWidget from "@/components/dashboard/RotRadarWidget";
import MetricTiles from "@/components/dashboard/MetricTiles";
import BloatTimelineWidget from "@/components/dashboard/BloatTimelineWidget";
import CodeAnalysisWidget from "@/components/dashboard/CodeAnalysisWidget";

function AuditContent() {
    const searchParams = useSearchParams();
    const urlParam = searchParams.get('url');
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(urlParam || 'google.com');
    const [scanning, setScanning] = useState(true);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStep, setScanStep] = useState("Initializing...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/audit?url=${url}`);
                const result = await res.json();
                setData(result);
                // Allow the "Scanning" UI to finish its animation for drama
                setTimeout(() => setScanning(false), 2000);
            } catch (err) {
                console.error("Audit failed", err);
            }
        };
        fetchData();
    }, [url]);

    if (scanning) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                <div className="z-10 text-center space-y-8 max-w-lg w-full px-6">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-primary">{scanProgress}%</div>
                    </div>

                    <h2 className="text-3xl font-bold text-white tracking-tight animate-pulse">Scanning {url}...</h2>

                    <div className="w-full bg-surface-dark h-2 rounded-full overflow-hidden border border-white/10">
                        <div
                            className="h-full bg-primary transition-all duration-100 ease-out shadow-[0_0_15px_rgba(26,224,181,0.5)]"
                            style={{ width: `${scanProgress}%` }}
                        ></div>
                    </div>

                    <p className="text-primary/70 text-sm h-6">{scanStep}</p>

                    <div className="text-left bg-black/50 p-4 rounded-lg border border-white/5 font-mono text-xs text-gray-500 h-32 overflow-hidden flex flex-col-reverse">
                        <p>{`> waiting for header response...`}</p>
                        <p>{`> GET ${url} HTTP/1.1`}</p>
                        <p>{`> establishing secure connection...`}</p>
                        <p className="text-primary">{`> target acquired: ${url}`}</p>
                        <p>{`> initializing ethos_scanner_v2...`}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col font-display selection:bg-primary selection:text-black">
            {/* Main Container */}
            <div className="flex-1 flex flex-col h-full layout-container p-4 md:p-6 lg:p-8 pb-32">
                {/* Header - Custom for Dashboard */}
                <header className="flex items-center justify-between mb-8 px-2 animate-fade-in-up">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-primary/80 mb-1">
                            <span className="material-symbols-outlined text-xl">language</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Audit Report</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{url}</h1>
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                            Audit completed on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-white/5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">code</span>
                            View Code
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_15px_rgba(26,224,181,0.3)] cursor-pointer">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Report
                        </button>
                    </div>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <ScoreCard score={data?.scores?.sustainability} co2={data?.metrics?.co2} />
                    <RotRadarWidget scores={data?.scores} />
                    <MetricTiles metrics={data?.metrics} />
                    <BloatTimelineWidget timeline={data?.timeline} />
                    <CodeAnalysisWidget trackers={data?.killList} />
                </div>
            </div>


        </div>
    );
}

export default function AuditPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-primary">Loading...</div>}>
            <AuditContent />
        </Suspense>
    );
}
