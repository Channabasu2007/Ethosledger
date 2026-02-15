export default function ScoreCard({ score = null, co2 = "—" }) {
    const numericScore = typeof score === 'number' ? score : (score ? Number(score) : null);
    const displayScore = numericScore !== null && !Number.isNaN(numericScore) ? Math.round(numericScore) : '—';
    
    // Determine grade and status
    const getGradeInfo = (score) => {
        if (typeof score !== 'number') return { label: 'Not Rated', color: 'gray', isFailing: false };
        
        if (score >= 90) return { label: 'Excellent', color: 'green', isFailing: false };
        if (score >= 80) return { label: 'Good', color: 'primary', isFailing: false };
        if (score >= 70) return { label: 'Fair', color: 'yellow', isFailing: false };
        if (score >= 50) return { label: 'Poor', color: 'orange', isFailing: true };
        return { label: 'Critical', color: 'red', isFailing: true };
    };
    
    const gradeInfo = getGradeInfo(displayScore);
    
    // Color classes based on grade
    const badgeClasses = {
        green: 'text-green-400 bg-green-400/10 border-green-400/20',
        primary: 'text-primary bg-primary/10 border-primary/20',
        yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
        orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        red: 'text-red-400 bg-red-400/10 border-red-400/20',
        gray: 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    };
    
    const scoreGradient = {
        green: 'from-green-400 to-green-600',
        primary: 'from-[#1ae0b5] to-[#0db896]',
        yellow: 'from-yellow-400 to-yellow-600',
        orange: 'from-orange-400 to-orange-600',
        red: 'from-red-400 to-red-600',
        gray: 'from-white to-gray-500'
    };
    
    // Format CO2 value
    const formatCo2 = (value) => {
        if (value === '—' || value === null || value === undefined) return '—';
        const str = String(value);
        return str.endsWith('g') ? str : `${str}g`;
    };
    
    return (
        <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden rounded-[28px] bg-surface-dark outline outline-1 outline-white/5">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${scoreGradient[gradeInfo.color]} blur-3xl`}></div>
            </div>
            
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-medium text-gray-300">Sustainability Score</h2>
                        <span className={`font-bold text-sm px-3 py-1 rounded-full w-fit mt-2 border ${badgeClasses[gradeInfo.color]}`}>
                            {gradeInfo.label}
                        </span>
                    </div>
                    <span className={`material-symbols-outlined text-3xl ${
                        gradeInfo.isFailing ? 'text-red-500' : 'text-primary'
                    }`}>
                        {gradeInfo.isFailing ? 'warning' : 'eco'}
                    </span>
                </div>
                
                <div className="flex flex-col items-center justify-center py-8">
                    <h1 className={`text-[140px] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${scoreGradient[gradeInfo.color]}`}>
                        {displayScore}
                    </h1>
                    {typeof displayScore === 'number' && (
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                            {displayScore >= 80 ? 'Cleaner than average' : 
                             displayScore >= 50 ? 'Room for improvement' : 
                             'Immediate action needed'}
                        </p>
                    )}
                </div>
                
                <div className="text-sm text-gray-400 max-w-[280px]">
                    Your site produces <strong className={`${
                        gradeInfo.isFailing ? 'text-red-400' : 'text-white'
                    }`}>{formatCo2(co2)}</strong> of CO2 per visit. 
                    {gradeInfo.isFailing ? (
                        <> This is <strong className="text-red-400">above average</strong> and should be optimized.</>
                    ) : (
                        <> This represents a <strong className="text-primary">low carbon footprint</strong>.</>
                    )}
                </div>
            </div>
        </div>
    );
}