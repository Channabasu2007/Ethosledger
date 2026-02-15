export default function ScoreCard({ score = null, co2 = "—" }) {
    const numericScore = typeof score === 'number' ? score : (score ? Number(score) : null);
    const displayScore = numericScore !== null && !Number.isNaN(numericScore) ? Math.round(numericScore) : '—';
    const isFailing = typeof displayScore === 'number' ? displayScore < 50 : false;
    
    return (
        <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden rounded-[28px] bg-surface-dark outline outline-1 outline-white/5">
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-medium text-gray-300">Sustainability Score</h2>
                        <span className={`font-bold text-sm px-3 py-1 rounded-full w-fit mt-2 border ${isFailing ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-primary bg-primary/10 border-primary/20'}`}>
                            {isFailing ? 'Failing Grade' : 'Eco Certified'}
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 text-3xl">eco</span>
                </div>
                <div className="flex flex-col items-center justify-center py-8">
                    <h1 className="text-[140px] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        {displayScore}
                    </h1>
                </div>
                <div className="text-sm text-gray-400 max-w-[250px]">
                    Your site produces <strong className="text-white">{co2}{typeof co2 === 'string' && !co2.endsWith('g') ? 'g' : ''}</strong> of CO2 per visit. 
                    This represents the direct carbon impact of the site's data transfer.
                </div>
            </div>
        </div>
    );
}