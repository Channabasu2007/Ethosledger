import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 backdrop-blur-sm bg-surface/80 border-b border-surface-container-high/30">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-transperant
                 text-primary">
                    <span className="material-symbols-outlined text-2xl">eco</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">Ethosledger</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <Link target="_blank" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors" href="https://github.com/Channabasu2007/Ethosledger">Github</Link>
                <Link target="_blank" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors" href="/hall-of-shame">Hall of Shame</Link>
            </nav>

        </header>
    );
}
