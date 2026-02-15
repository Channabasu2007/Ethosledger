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

    // Core State
    const [url] = useState(urlParam || 'google.com');
    const [auditData, setAuditData] = useState(null);
    const [scanning, setScanning] = useState(true);
    const [error, setError] = useState(null);

    // UI Progress State
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStep, setScanStep] = useState("Initializing Forensic Engine...");
    const [trace, setTrace] = useState(null);

    useEffect(() => {
        if (!url) {
            setError("Audit Target Null: Please provide a valid URL.");
            setScanning(false);
            return;
        }

        let isMounted = true;

        const performUnifiedAudit = async () => {
            try {
                if (isMounted) {
                    setScanProgress(15);
                    setScanStep("Establishing Secure CDP Session...");
                }

                const response = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Forensic Pipeline Interrupted');

                if (isMounted) {
                    setScanProgress(45);
                    setScanStep("Running Lighthouse Performance Audit...");

                    await new Promise(r => setTimeout(r, 800));

                    setScanProgress(75);
                    setScanStep("Analyzing Security & Calculating Carbon Footprint...");

                    setAuditData(data);
                    setScanProgress(100);
                    setScanStep("Audit Verified: Report Ready");

                    setTimeout(() => {
                        if (isMounted) setScanning(false);
                    }, 800);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setScanning(false);
                }
            }
        };

        performUnifiedAudit();

        return () => { isMounted = false; };
    }, [url]);

    useEffect(() => {
        setTrace(`0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`);
    }, []);

    // Error State UI
    if (error) {
        return (
            <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-white p-6 font-mono">
                <span className="material-symbols-outlined text-red-500 text-6xl mb-4">gpp_maybe</span>
                <h2 className="text-xl font-bold uppercase tracking-widest text-red-400">Pipeline Error</h2>
                <p className="border border-red-500/20 bg-red-500/5 p-4 my-4 max-w-md text-center text-gray-400 text-sm">{error}</p>
                <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#1ae0b5] transition-all">
                    Re-Initialize Terminal
                </button>
            </div>
        );
    }

    // Scanning / Loading State UI
    if (scanning) {
        return (
            <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                <div className="z-10 text-center space-y-8 max-w-lg w-full px-6">
                    <div className="relative">
                        <div className="w-28 h-28 border-2 border-[#1ae0b5]/10 border-t-[#1ae0b5] rounded-full animate-spin mx-auto mb-8"></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-[#1ae0b5]">{scanProgress}%</div>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.4em]">Deconstructing Target</h2>
                        <p className="text-[#1ae0b5] font-bold truncate">{url}</p>
                    </div>
                    <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1ae0b5] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(26,224,181,0.6)]" style={{ width: `${scanProgress}%` }}></div>
                    </div>
                    <p className="text-[#1ae0b5]/50 text-[10px] uppercase tracking-widest animate-pulse h-4">{scanStep}</p>
                    <div className="text-left bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-[9px] text-gray-500 space-y-1">
                        <p>{`> GET ${url} - STATUS: ACTIVE`}</p>
                        <p suppressHydrationWarning>{trace ? `> TRACE: ${trace}` : '> TRACE: —'}</p>
                        <p className="text-[#1ae0b5]/40">{`> ANALYZING_RESOURCES: OK`}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard UI (Final Result)
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col font-display selection:bg-primary selection:text-black">
            <div className="flex-1 flex flex-col h-full layout-container p-4 md:p-6 lg:p-8 pb-32">
                {/* Header */}
                <header className="flex items-center justify-between mb-8 px-2 animate-fade-in-up">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-primary/80 mb-1">
                            <span className="material-symbols-outlined text-xl">language</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Audit Report</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{url}</h1>
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Audit completed on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                   
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <ScoreCard
                        score={auditData?.scores?.sustainability}
                        co2={auditData?.metrics?.co2}
                    />
                    <RotRadarWidget
                        scores={{
                            ...auditData?.scores,
                            seo: auditData?.seo?.score || 0,
                            bestPrac: auditData?.security?.score || 0
                        }}
                    />
                    <MetricTiles
                        metrics={auditData?.metrics}
                        seo={auditData?.seo}
                    />
                    {/* <BloatTimelineWidget 
                        timeline={auditData?.timeline} 
                    /> */}

                </div>
                <div className='mt-10'>
                    <CodeAnalysisWidget
                        url={url}
                        trackers={auditData?.killList}
                        seo={auditData?.seo}
                        da
                        ngerReport={auditData?.security?.dangers || []}
                    />
                </div>
                {/* LIGHTHOUSE SECTION */}
                {auditData?.lighthouse && (
                    <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-2xl">speed</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Google Lighthouse Audit</h2>
                                    <p className="text-sm text-gray-400">Official Performance & Best Practices Report</p>
                                </div>
                            </div>

                            {/* Lighthouse Scores Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {/* Performance */}
                                <div className="bg-black/40 rounded-lg p-6 border border-white/5 text-center">
                                    <div className="mb-2">
                                        <span className="material-symbols-outlined text-3xl text-orange-400">speed</span>
                                    </div>
                                    <div className={`text-4xl font-bold mb-1 ${auditData.lighthouse.scores.performance >= 90 ? 'text-green-400' :
                                            auditData.lighthouse.scores.performance >= 50 ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {auditData.lighthouse.scores.performance}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Performance</div>
                                </div>

                                {/* Accessibility */}
                                <div className="bg-black/40 rounded-lg p-6 border border-white/5 text-center">
                                    <div className="mb-2">
                                        <span className="material-symbols-outlined text-3xl text-blue-400">accessibility</span>
                                    </div>
                                    <div className={`text-4xl font-bold mb-1 ${auditData.lighthouse.scores.accessibility >= 90 ? 'text-green-400' :
                                            auditData.lighthouse.scores.accessibility >= 50 ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {auditData.lighthouse.scores.accessibility}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Accessibility</div>
                                </div>

                                {/* Best Practices */}
                                <div className="bg-black/40 rounded-lg p-6 border border-white/5 text-center">
                                    <div className="mb-2">
                                        <span className="material-symbols-outlined text-3xl text-purple-400">verified</span>
                                    </div>
                                    <div className={`text-4xl font-bold mb-1 ${auditData.lighthouse.scores.bestPractices >= 90 ? 'text-green-400' :
                                            auditData.lighthouse.scores.bestPractices >= 50 ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {auditData.lighthouse.scores.bestPractices}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Best Practices</div>
                                </div>

                                {/* SEO */}
                                <div className="bg-black/40 rounded-lg p-6 border border-white/5 text-center">
                                    <div className="mb-2">
                                        <span className="material-symbols-outlined text-3xl text-green-400">search</span>
                                    </div>
                                    <div className={`text-4xl font-bold mb-1 ${auditData.lighthouse.scores.seo >= 90 ? 'text-green-400' :
                                            auditData.lighthouse.scores.seo >= 50 ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {auditData.lighthouse.scores.seo}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">SEO</div>
                                </div>
                            </div>

                            {/* Core Web Vitals */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                                    Core Web Vitals
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">FCP</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.fcp}</div>
                                        <div className="text-xs text-gray-500">First Contentful Paint</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">LCP</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.lcp}</div>
                                        <div className="text-xs text-gray-500">Largest Contentful Paint</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">TBT</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.tbt}</div>
                                        <div className="text-xs text-gray-500">Total Blocking Time</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">CLS</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.cls}</div>
                                        <div className="text-xs text-gray-500">Cumulative Layout Shift</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">SI</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.si}</div>
                                        <div className="text-xs text-gray-500">Speed Index</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">TTI</div>
                                        <div className="text-lg font-bold text-white">{auditData.lighthouse.metrics.tti}</div>
                                        <div className="text-xs text-gray-500">Time to Interactive</div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Opportunities */}
                            {auditData.lighthouse.opportunities && auditData.lighthouse.opportunities.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">lightbulb</span>
                                        Performance Opportunities ({auditData.lighthouse.opportunities.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {auditData.lighthouse.opportunities.map((opp, idx) => (
                                            <div key={idx} className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                                                <div className="flex items-start gap-3">
                                                    <div className={`px-2 py-1 rounded text-xs font-bold ${opp.score < 50 ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {opp.score}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold text-white text-sm">{opp.title}</h4>
                                                            {opp.savings && (
                                                                <span className="text-xs text-green-400 font-mono">{opp.savings}</span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-400">{opp.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SEO SECTION */}
                {auditData?.seo && (
                    <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-3xl text-primary">search</span>
                                <div>
                                    <h2 className="text-2xl font-bold">Deep SEO Analysis</h2>
                                    <p className="text-sm text-gray-400">Advanced Search Engine Optimization Report</p>
                                </div>
                                <div className="ml-auto flex items-center gap-3">
                                    <div className="text-right">
                                        <div className="text-4xl font-bold text-primary">{auditData.seo.score}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Grade: {auditData.seo.grade}</div>
                                    </div>
                                </div>
                            </div>

                            {/* SEO Issues */}
                            {auditData.seo.issues && auditData.seo.issues.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">error</span>
                                        Issues Found ({auditData.seo.issues.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {auditData.seo.issues.map((issue, idx) => (
                                            <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-sm text-red-300">
                                                <span className="material-symbols-outlined text-xs mr-2 inline-block">close</span>
                                                {issue}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* SEO Suggestions */}
                            {auditData.seo.suggestions && auditData.seo.suggestions.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">lightbulb</span>
                                        Suggestions ({auditData.seo.suggestions.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {auditData.seo.suggestions.map((suggestion, idx) => (
                                            <div key={idx} className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-gray-300">
                                                <span className="material-symbols-outlined text-xs mr-2 inline-block text-primary">arrow_forward</span>
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* SEO Details Grid */}
                            {auditData.seo.details && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Page Title</div>
                                        <div className="text-sm font-mono truncate">{auditData.seo.details.title?.content || 'Not found'}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.title?.length || 0} characters</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Meta Description</div>
                                        <div className="text-sm font-mono line-clamp-2">{auditData.seo.details.metaDescription?.content || 'Not found'}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.metaDescription?.length || 0} characters</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">H1 Tags</div>
                                        <div className="text-2xl font-bold text-primary">{auditData.seo.details.headings?.h1Count || 0}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.headings?.h1Count === 1 ? 'Perfect' : 'Should be exactly 1'}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Images Alt Text</div>
                                        <div className="text-2xl font-bold text-primary">{auditData.seo.details.images?.altCoverage || 0}%</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.images?.withAlt || 0} of {auditData.seo.details.images?.total || 0} images</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Links</div>
                                        <div className="text-2xl font-bold text-primary">{auditData.seo.details.links?.total || 0}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.links?.internal || 0} internal, {auditData.seo.details.links?.external || 0} external</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Content</div>
                                        <div className="text-2xl font-bold text-primary">{auditData.seo.details.content?.wordCount || 0}</div>
                                        <div className="text-xs text-gray-500 mt-1">words</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Mobile Friendly</div>
                                        <div className="text-2xl font-bold">{auditData.seo.details.viewport?.isMobileFriendly ? '✓' : '✗'}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.viewport?.isMobileFriendly ? 'Yes' : 'No'}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Security</div>
                                        <div className="text-2xl font-bold">{auditData.seo.details.security?.isHttps ? '🔒' : '🔓'}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.security?.isHttps ? 'HTTPS' : 'HTTP'}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Structured Data</div>
                                        <div className="text-2xl font-bold text-primary">{auditData.seo.details.structuredData?.count || 0}</div>
                                        <div className="text-xs text-gray-500 mt-1">{auditData.seo.details.structuredData?.exists ? 'Found' : 'Not found'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SECURITY SECTION */}
                {auditData?.security && (
                    <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-3xl text-red-400">shield</span>
                                <div>
                                    <h2 className="text-2xl font-bold">Security & Code Analysis</h2>
                                    <p className="text-sm text-gray-400">Dangerous Code Detection Report</p>
                                </div>
                                <div className="ml-auto flex items-center gap-3">
                                    <div className="text-right">
                                        <div className={`text-4xl font-bold ${auditData.security.score >= 80 ? 'text-green-400' :
                                                auditData.security.score >= 60 ? 'text-yellow-400' :
                                                    'text-red-400'
                                            }`}>
                                            {auditData.security.score}
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                                            Grade: {auditData.security.grade}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Severity Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-red-400">{auditData.security.critical}</div>
                                    <div className="text-xs text-red-300 uppercase tracking-wider">Critical</div>
                                </div>
                                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-orange-400">{auditData.security.high}</div>
                                    <div className="text-xs text-orange-300 uppercase tracking-wider">High</div>
                                </div>
                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-yellow-400">{auditData.security.medium}</div>
                                    <div className="text-xs text-yellow-300 uppercase tracking-wider">Medium</div>
                                </div>
                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-blue-400">{auditData.security.low}</div>
                                    <div className="text-xs text-blue-300 uppercase tracking-wider">Low</div>
                                </div>
                            </div>

                            {/* Dangers List */}
                            {auditData.security.dangers && auditData.security.dangers.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">warning</span>
                                        Security Issues Found ({auditData.security.totalDangers})
                                    </h3>
                                    <div className="space-y-3">
                                        {auditData.security.dangers.map((danger, idx) => (
                                            <div
                                                key={idx}
                                                className={`rounded-lg p-4 border ${danger.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                                                        danger.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                                                            danger.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                                                'bg-blue-500/10 border-blue-500/30'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className={`material-symbols-outlined text-2xl ${danger.severity === 'critical' ? 'text-red-400' :
                                                            danger.severity === 'high' ? 'text-orange-400' :
                                                                danger.severity === 'medium' ? 'text-yellow-400' :
                                                                    'text-blue-400'
                                                        }`}>
                                                        {danger.type === 'security' ? 'security' :
                                                            danger.type === 'privacy' ? 'visibility_off' :
                                                                danger.type === 'malicious' ? 'virus' :
                                                                    'code'}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${danger.severity === 'critical' ? 'bg-red-500/20 text-red-300' :
                                                                    danger.severity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                                                                        danger.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                                                            'bg-blue-500/20 text-blue-300'
                                                                }`}>
                                                                {danger.severity}
                                                            </span>
                                                            <span className="text-xs text-gray-500 uppercase">{danger.type}</span>
                                                        </div>
                                                        <h4 className="font-bold text-white mb-1">{danger.issue}</h4>
                                                        <p className="text-sm text-gray-400 mb-2">{danger.description}</p>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span className="material-symbols-outlined text-sm text-primary">lightbulb</span>
                                                            <span>{danger.recommendation}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No Issues */}
                            {auditData.security.totalDangers === 0 && (
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                                    <span className="material-symbols-outlined text-5xl text-green-400 mb-2">verified</span>
                                    <h3 className="text-xl font-bold text-green-400 mb-2">No Security Issues Detected</h3>
                                    <p className="text-sm text-gray-400">Your site appears to follow security best practices!</p>
                                </div>
                            )}

                            {/* Code Summary */}
                            {auditData.security.summary && (
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Inline Scripts</div>
                                        <div className="text-xl font-bold text-white">{auditData.security.summary.inlineScripts}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">External Sources</div>
                                        <div className="text-xl font-bold text-white">{auditData.security.summary.externalScripts}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">iFrames</div>
                                        <div className="text-xl font-bold text-white">{auditData.security.summary.iframes}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">CSP</div>
                                        <div className="text-xl font-bold">{auditData.security.summary.hasCSP ? '✓' : '✗'}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Obfuscation</div>
                                        <div className="text-xl font-bold">{auditData.security.summary.hasObfuscation ? '⚠️' : '✓'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuditPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-[#1ae0b5] font-mono text-xs tracking-widest">WAKING UP TERMINAL...</div>}>
            <AuditContent />
        </Suspense>
    );
}