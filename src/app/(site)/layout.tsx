
import { Navbar } from '@/components/layout/Navbar';
import { Terminal } from '@/components/terminal/Terminal';
import HackerBackground from '@/components/3d/HackerBackground';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HackerBackground />
            <Navbar />
            <main className="min-h-screen relative overflow-hidden">
                {children}
            </main>
            <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/5">
                <p>© {new Date().getFullYear()} Krishna Singh. Built with Next.js & React Three Fiber.</p>
            </footer>
            <Terminal />
        </>
    );
}
