'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// Components (ensure these are updated to handle null/loading states)
import ScoreCard from "@/components/dashboard/ScoreCard";
import RotRadarWidget from "@/components/dashboard/RotRadarWidget";
import MetricTiles from "@/components/dashboard/MetricTiles";
import BloatTimelineWidget from "@/components/dashboard/BloatTimelineWidget";
import CodeAnalysisWidget from "@/components/dashboard/CodeAnalysisWidget";

function AuditContent() {
    const searchParams = useSearchParams();
    const urlParam = searchParams.get('url');
    
    const [url] = useState(urlParam || '');
    const [scanning, setScanning] = useState(true);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStep, setScanStep] = useState("Initializing Headless Browser...");
    const [auditData, setAuditData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setError("No URL provided for audit.");
            setScanning(false);
            return;
        }

        let isMounted = true;

        const performAudit = async () => {
            try {
                // The progress bar now represents the actual request lifecycle
                setScanProgress(20);
                setScanStep("Establishing Secure Connection...");

                const response = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
                
                setScanProgress(60);
                setScanStep("Analyzing DOM & Network Payloads...");

                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Audit failed');

                if (isMounted) {
                    setAuditData(data);
                    setScanProgress(100);
                    setScanStep("Report Generated Successfully");
                    
                    // Final transition
                    setTimeout(() => setScanning(false), 600);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setScanning(false);
                }
            }
        };

        performAudit();

        return () => { isMounted = false; };
    }, [url]);

    if (error) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-white p-6 font-mono">
                <div className="text-red-500 mb-4 text-6xl">![Error Icon]</div>
                <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest">Audit Terminal Error</h2>
                <p className="text-gray-400 mb-6 border border-red-500/50 p-4 bg-red-500/10">{error}</p>
                <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-white text-black rounded-none font-bold hover:bg-primary transition-colors">
                    RETURN TO BASE
                </button>
            </div>
        );
    }

    if (scanning) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center font-mono relative overflow-hidden">
                {/* Visual Scanner Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                
                <div className="z-10 text-center space-y-8 max-w-lg w-full px-6">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary">
                            {scanProgress}%
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white tracking-[0.2em] uppercase">Auditing Target</h2>
                        <p className="text-primary animate-pulse truncate">{url}</p>
                    </div>

                    <div className="w-full bg-surface-dark/50 h-1 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-primary transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(26,224,181,0.8)]"
                            style={{ width: `${scanProgress}%` }}
                        ></div>
                    </div>

                    <div className="text-left bg-black/80 p-6 border border-primary/20 font-mono text-[10px] text-gray-400 space-y-1">
                        <p className="text-primary-brightness-50">{`> STAGE: ${scanStep}`}</p>
                        <p>{`> TRACE_ID: ${Math.random().toString(36).substring(7).toUpperCase()}`}</p>
                        <p>{`> PACKET_LOSS: 0%`}</p>
                        <p className="text-white/50">{`> ANALYZING_BYTES: TRUE`}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark text-white flex flex-col font-mono selection:bg-primary selection:text-black">
            <div className="flex-1 flex flex-col h-full p-4 md:p-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                            <span className="text-xs font-bold uppercase tracking-widest">Live Audit Verified</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter truncate max-w-2xl">{url}</h1>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 italic">
                        <span>Report Ref: {auditData?.timestamp?.split('T')[0]}</span>
                        <div className="h-4 w-[1px] bg-white/10"></div>
                        <span>Latency: {auditData?.metrics?.loadTimeSeconds}s</span>
                    </div>
                </header>

                {/* The Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
                    <ScoreCard 
                        grade={auditData?.grade} 
                        score={auditData?.score} 
                    />
                    <RotRadarWidget 
                        trackers={auditData?.analysis} 
                    />
                    <MetricTiles 
                        weight={auditData?.metrics?.pageWeightMB} 
                        co2={auditData?.metrics?.co2Grams} 
                        trackers={auditData?.metrics?.trackerCount}
                    />
                    <BloatTimelineWidget 
                        loadTime={auditData?.metrics?.loadTimeSeconds} 
                    />
                    <CodeAnalysisWidget 
                        url={url} 
                        analysis={auditData?.analysis} 
                    />
                </div>
            </div>
        </div>
    );
}

export default function AuditPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-primary font-mono">LOADING TERMINAL...</div>}>
            <AuditContent />
        </Suspense>
    );
}