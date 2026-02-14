import Link from 'next/link';
import Image from 'next/image';

export default function HallOfShamePage() {
    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col font-display selection:bg-primary selection:text-on-primary">
            {/* Top Navigation */}
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
                {/* Hero Section */}
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
                                The internet&#39;s heaviest carbon footprints, ranked by digital waste. These sites are optimized for bloat, not the planet.
                            </p>
                        </div>
                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-surface-container hover:bg-surface-container-high border border-surface-container-high transition-all text-sm font-medium group cursor-pointer">
                                <span className="material-symbols-outlined !text-[18px] group-hover:text-primary transition-colors">filter_list</span>
                                Most Polluting
                            </button>
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-surface-container-low hover:bg-surface-container transition-all text-sm font-medium text-on-surface-variant cursor-pointer">
                                Page Weight
                            </button>
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-surface-container-low hover:bg-surface-container transition-all text-sm font-medium text-on-surface-variant cursor-pointer">
                                Tracker Count
                            </button>
                        </div>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="masonry-grid">
                    {/* Card 1: The Worst Offender (Tall Card) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        {/* Image Header */}
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred screenshot of a cluttered e-commerce website showing many products" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpmOTj4OPxpL-XEGxnNfHIdSDzOAaXWP5kcpu1oKFKzXlEP6pFGXNpDNbIqv7-4zfxRpQxTTK9y9ROmzJF8JzdtbWigMkPP9R9eK6LLdYdi3NG4cRJewK0B6SMrQ51EN6GXEBLTj5qU7boA1i9zaeeG03YPefZBiThua9jWWIHkNLmeulqs72ft-ubT4cRQohHtNdRffPGGl-xZA96PfScPmUcXeb-v3BQ7AtosK0REp54_P1Q-mWg4wwcOIl54Iwo22OjUVw97WE" />
                            {/* Rank Badge */}
                            <div className="absolute top-4 right-4 z-20 bg-red-500 text-white font-black px-4 py-2 rounded-full shadow-lg border border-red-400 flex items-center gap-1 transform rotate-3 hover:rotate-0 transition-transform">
                                <span className="material-symbols-outlined !text-lg">local_fire_department</span>
                                #1 SINNER
                            </div>
                        </div>
                        {/* Content */}
                        <div className="p-6 pt-2 flex flex-col gap-6 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="text-3xl font-bold text-on-surface leading-tight break-words">shop-fast.com</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">E-COMMERCE</span>
                                </div>
                                <Link className="text-primary hover:underline text-sm opacity-80 decoration-primary/50" href="#">View detailed audit →</Link>
                            </div>
                            {/* Metric: Rot Score */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Digital Rot Score</span>
                                    <span className="text-2xl font-black text-red-400">98<span className="text-sm font-normal text-on-surface-variant ml-1">/ 100</span></span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-[98%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                </div>
                            </div>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                    <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">co2</span>
                                    <span className="text-2xl font-bold text-on-surface">4.8g</span>
                                    <span className="text-xs text-on-surface-variant">Carbon per visit</span>
                                </div>
                                <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                    <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">data_usage</span>
                                    <span className="text-2xl font-bold text-on-surface">12MB</span>
                                    <span className="text-xs text-on-surface-variant">Page weight</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: News Portal (Medium Card) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred image of a complex news website layout with multiple columns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTxg_MuemdRrtNMjt6yK1hijm9z09_FAfHfrFXIa9caXumpioBquEqUcTNE0hS6CveGl8jHJ3fRXKOZ9ZnBT1GqYDzZ1ge21wp4NomP9pF07q5s2UW2-rFoWfGZ8DxiHIS0yKWU7cmK2nUMa0eJSNTewItYcwtppr5qYQ-Nnl0dLpJwuEjxBIUISAONG_kvRC4I0z110rXY4sjq0IqCrssSplt5xQgiJ6taEaqMJro9-a8tIqCW5hGavI2ZFI196xDiPtaZJA7qtE" />
                            <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                <span className="text-orange-400">#2</span>
                            </div>
                        </div>
                        <div className="p-6 pt-2 flex flex-col gap-5 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="text-2xl font-bold text-on-surface leading-tight">daily-noise.org</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">NEWS</span>
                                </div>
                                <div className="text-on-surface-variant text-sm mt-1">42 trackers blocked</div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Digital Rot Score</span>
                                    <span className="text-xl font-bold text-orange-400">92</span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Streaming Service (Short Card) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        <div className="relative h-40 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred abstract interface of a video streaming platform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBES5jT97zvum8V_v_bEAijuwh52C2oXpsP_rRa1sCaI35VZGRzPS86IVx32qiwmsR1h6ivlq9O_nj3f7mGiGHC6bx4pN17JWur-ZNC3U1aubyZJnIcsSV9rFJ4iRA9TEWxYdfApRYiJ5OPlOswLstqwi2KOvs_cfcdHs6cJssawpL-ZpDrmvGtWH6vEW71OIyVkckZH036ZA9IUFfjZ6HFIWyVO8xXb0SQ3OGdgQvrAkLwap84w7qVK9lSp-NdTLgTLqak-5n9Nwk" />
                            <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                <span className="text-orange-300">#3</span>
                            </div>
                        </div>
                        <div className="p-6 pt-2 flex flex-col gap-4 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="text-2xl font-bold text-on-surface leading-tight">stream-bloat.tv</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">MEDIA</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Rot Score</span>
                                    <span className="text-xl font-bold text-orange-300">88</span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full w-[88%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Social Network (Tall Card) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred social media feed on a mobile device screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe6C29oYwRxbuarSef4XRHl_9kfP7ipQlisThGV_kISoKDFEi8dbqphtC_YQfbGQa048dfW0hlwccuz5VSoa8fxrNLW9O8DMFgO0mkqhgPEZpXScvt1SuU2r9aDSHDG1j87gV1C1Zu0Y5V0KgQDriP0XFooeORkplXCvW6qyva3hLZXSXfLc5bY06B0J1KqZWVVqIeJ_tuhbn6EQMaleVCMhXQt41Q94PN2LFzI95On_SP3MC7zMw2SHXHJeGSMQuG7V3CqbAzCcM" />
                            <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                <span className="text-yellow-400">#4</span>
                            </div>
                        </div>
                        <div className="p-6 pt-2 flex flex-col gap-6 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 class="text-3xl font-bold text-on-surface leading-tight">social-trap.io</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">SOCIAL</span>
                                </div>
                                <p className="text-on-surface-variant mt-2 text-sm">Autoplay videos on load contribute to massive data spikes.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Rot Score</span>
                                    <span className="text-2xl font-black text-yellow-400">85<span className="text-sm font-normal text-on-surface-variant ml-1">/ 100</span></span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full w-[85%]"></div>
                                </div>
                            </div>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                    <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">speed</span>
                                    <span className="text-2xl font-bold text-on-surface">8.2s</span>
                                    <span className="text-xs text-on-surface-variant">Load time</span>
                                </div>
                                <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1">
                                    <span className="material-symbols-outlined text-on-surface-variant !text-xl mb-1">javascript</span>
                                    <span className="text-2xl font-bold text-on-surface">5.1MB</span>
                                    <span className="text-xs text-on-surface-variant">JS Payload</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Travel Booking (Medium) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred image of an airplane wing in the sky representing travel site" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM-pp9rYxbPel74HIdF0ICV6Kv3ra_Vj0CC4spL-I6gl9RbvizPo33al4_lWabvSiBlxDaM-erXV7YZa4UFKFzoJ4Kox4-uVPYxqR14mz9pJpbDeWzYio5X9kkAaFmL20AacVJT3Ye_m2yraYHr6hnxlPQA9JMvdYYVOXDuNPUa70NIyEi7F6Zjcgv2DBZcYOSQCO-a3mpgg6jLSSV6qKf1UwwYZLOhuFAm6jeFNt3-Y-Vr4SjGIdBsmY6OqhtflmejQbe_SunlBo" />
                            <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                <span className="text-primary">#5</span>
                            </div>
                        </div>
                        <div className="p-6 pt-2 flex flex-col gap-5 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="text-2xl font-bold text-on-surface leading-tight">fly-heavy.com</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">TRAVEL</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Rot Score</span>
                                    <span className="text-xl font-bold text-primary">81</span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-teal-800 to-primary rounded-full w-[81%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 6: Corporate Blog (Short) */}
                    <div className="masonry-item card-hover relative group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                        <div className="relative h-32 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                            <img className="card-img w-full h-full object-cover filter blur-[2px] opacity-60" alt="Blurred modern corporate office interior representing business site" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAakrzbdNxNZbeKvBBDD5OncQXM0Glz7e-gFY2crHf809vTuh2mr3qqv88KdZstJ_LWyLR_imnefx1Su0uric1t8zhfWRSr9acCk-Ei7wdYFdviSPXnyxvBKhbvowPdS_mfuqhabBA6J18urnl1D7N-xyCW_8Nu0joTtIcLsCmCr8uyLuYwtYwoP5O4zYVpCOIriBBJLtSqeM3gxWtqf9a_q-TQjlrOCMhA2fTJgnfvlwXXfzExsG5lItCDAoi3cBOiFRocN8wwc0" />
                            <div className="absolute top-4 right-4 z-20 bg-surface-container text-on-surface font-bold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1">
                                <span className="text-primary">#6</span>
                            </div>
                        </div>
                        <div className="p-6 pt-2 flex flex-col gap-4 relative z-20">
                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="text-xl font-bold text-on-surface leading-tight">corp-lag.net</h3>
                                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">BIZ</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-on-surface-variant">Rot Score</span>
                                    <span className="text-lg font-bold text-primary">78</span>
                                </div>
                                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-gradient-to-r from-teal-800 to-primary rounded-full w-[78%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="flex items-center gap-3 bg-primary text-on-primary pl-4 pr-6 h-14 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-all font-bold text-lg group cursor-pointer">
                    <span className="material-symbols-outlined !text-[28px]">add_link</span>
                    Audit a Site
                </button>
            </div>
        </div>
    );
}
