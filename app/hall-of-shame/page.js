import Link from 'next/link';
import Image from 'next/image';
import connect from '../../lib/mongoose';
import Site from '../../lib/models/Site';

async function getSites() {
  try {
    await connect();
    // FIXED: Sort by LOWEST sustainability score (worst offenders first)
    const sites = await Site.find({})
      .sort({ 
        'scores.sustainability': 1,  // Ascending (lowest/worst first)
        'metrics.co2': -1              // Descending (highest CO2 first)
      })
      .limit(100)
      .lean();
    return sites;
  } catch (err) {
    console.error('Failed to load sites:', err?.message || err);
    return [];
  }
}

export default async function HallOfShamePage() {
    const sites = await getSites();

    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col font-display selection:bg-primary selection:text-on-primary">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-surface-container-high bg-background/80 backdrop-blur-md px-6 py-4 lg:px-10">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-on-surface hover:opacity-80 transition-opacity cursor-pointer">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined !text-[32px]">recycling</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">SustainCode</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        <Link className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-4 py-2 rounded-full text-sm font-medium transition-colors" href="/">Audit</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center bg-surface-container-high h-12 rounded-full px-4 w-64 ring-1 ring-transparent focus-within:ring-primary transition-all">
                        <span className="material-symbols-outlined text-on-surface-variant">search</span>
                        <input className="bg-transparent border-none text-on-surface placeholder-on-surface-variant focus:ring-0 w-full ml-2 text-sm focus:outline-none" placeholder="Search URL..." type="text" />
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full bg-surface-container-high hover:bg-surface-container-low text-on-surface transition-colors md:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 layout-container py-8 lg:py-12">
                <div className="flex flex-col gap-6 mb-12 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-200 text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="material-symbols-outlined !text-sm">warning</span>
                                Digital Waste Alert
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
                                The Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Shame</span>
                            </h1>
                            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
                                The internet's heaviest carbon footprints, ranked by digital waste. These sites are optimized for bloat, not the planet.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-surface-container hover:bg-surface-container-high border border-surface-container-high transition-all text-sm font-medium group cursor-pointer">
                                <span className="material-symbols-outlined !text-[18px] group-hover:text-primary transition-colors">filter_list</span>
                                Most Polluting
                            </button>
                        </div>
                    </div>
                </div>

                <div className="masonry-grid">
                    {sites.length === 0 && (
                        <div className="text-on-surface-variant">No entries yet — run an audit or seed the DB.</div>
                    )}

                    {sites.map((site, idx) => {
                        const metrics = site.metrics || {};
                        const scores = site.scores || {};
                        
                        // FIXED: Use sustainability score (lower = worse)
                        const sustainabilityScore = scores.sustainability ?? 0;
                        const co2 = metrics.co2 || '—';
                        const weight = metrics.totalWeight || '—';
                        const loadTime = metrics.loadTime || '—';
                        const rank = idx + 1; // Rank by position in sorted list
                        
                        // Determine shame level
                        const getShameLevel = (score) => {
                            if (score >= 80) return { label: 'Minor Offender', color: 'yellow' };
                            if (score >= 60) return { label: 'Moderate Waste', color: 'orange' };
                            if (score >= 40) return { label: 'Heavy Polluter', color: 'red' };
                            return { label: 'Digital Disaster', color: 'red' };
                        };
                        
                        const shameLevel = getShameLevel(sustainabilityScore);

                        return (
                            <div key={site._id || site.url} className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                                    {site.image ? (
                                        <Image src={site.image} alt={site.title || site.url} className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" width={1200} height={600} />
                                    ) : (
                                        <div className="bg-surface-container-high w-full h-full"></div>
                                    )}
                                    <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                        <span className="text-orange-400">#{rank}</span>
                                    </div>
                                    {/* Shame Badge */}
                                    <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
                                        shameLevel.color === 'red' ? 'bg-red-900/50 border-red-500/50 text-red-200' :
                                        shameLevel.color === 'orange' ? 'bg-orange-900/50 border-orange-500/50 text-orange-200' :
                                        'bg-yellow-900/50 border-yellow-500/50 text-yellow-200'
                                    }`}>
                                        {shameLevel.label}
                                    </div>
                                </div>

                                <div className="p-6 pt-2 flex flex-col gap-6 relative z-20">
                                    <div>
                                        <div className="flex items-baseline justify-between mb-1">
                                            <h3 className="text-2xl font-bold text-on-surface leading-tight break-words">{site.title || site.host || site.url}</h3>
                                            <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">{site.category || 'SITE'}</span>
                                        </div>
                                        <Link className="text-primary hover:underline text-sm opacity-80 decoration-primary/50" href={`/audit?url=${encodeURIComponent(site.url)}`}>View detailed audit →</Link>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-medium text-on-surface-variant">Sustainability Score</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-2xl font-black ${
                                                    sustainabilityScore >= 80 ? 'text-yellow-400' :
                                                    sustainabilityScore >= 60 ? 'text-orange-400' :
                                                    'text-red-400'
                                                }`}>
                                                    {sustainabilityScore}
                                                </span>
                                                <span className="text-sm font-normal text-on-surface-variant">/ 100</span>
                                            </div>
                                        </div>
                                        {/* FIXED: Progress bar - Lower score = fuller bar (worse) */}
                                        <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                            <div 
                                                className={`h-full rounded-full ${
                                                    sustainabilityScore >= 80 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                                    sustainabilityScore >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                                    'bg-gradient-to-r from-red-500 to-red-600'
                                                }`}
                                                style={{ width: `${100 - sustainabilityScore}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-on-surface-variant italic">
                                            Lower is worse — this site scored in the bottom {100 - sustainabilityScore}%
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                            <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">co2</span>
                                            <span className="text-xl font-bold text-on-surface">{co2}g</span>
                                            <span className="text-xs text-on-surface-variant">CO₂/visit</span>
                                        </div>
                                        <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                            <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">data_usage</span>
                                            <span className="text-xl font-bold text-on-surface">{weight}MB</span>
                                            <span className="text-xs text-on-surface-variant">Weight</span>
                                        </div>
                                        <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                            <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">speed</span>
                                            <span className="text-xl font-bold text-on-surface">{loadTime}s</span>
                                            <span className="text-xs text-on-surface-variant">Load</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <div className="fixed bottom-8 right-8 z-50">
                <Link href={"/"} className="flex items-center gap-3 bg-primary text-on-primary pl-4 pr-6 h-14 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-all font-bold text-lg group cursor-pointer">
                    <span className="material-symbols-outlined !text-[28px]">add_link</span>
                    Audit a Site
                </Link>
            </div>
        </div>
    );
}