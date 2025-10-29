import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from './types';
import { translations } from './constants';
import UseOfFundsChart from './components/UseOfFundsChart';
import TeamSection from './TeamSection';
import { 
    MailIcon, CpuIcon, Layers3Icon, BrainCircuitIcon, GemIcon, 
    HeartPulseIcon, ShieldCheckIcon, LayoutDashboardIcon, 
    TrendingUpIcon, CheckCheckIcon, CoinsIcon, PieChartIcon, 
    RocketIcon, UsersIcon, FileCheckIcon
} from './components/Icons';

// --- Helper Components ---
// FIX: Use React.ElementType for the 'as' prop to correctly type the polymorphic component.
// This resolves issues with JSX namespace and allows dynamic rendering of HTML tags.
const T: React.FC<{ tKey: string; tFunc: (key: string) => string; className?: string; as?: React.ElementType; dangerously?: boolean }> = ({ tKey, tFunc, className, as: Component = 'p', dangerously = false }) => {
    const text = tFunc(tKey);
    if (dangerously) {
        return <Component className={className} dangerouslySetInnerHTML={{ __html: text }} />;
    }
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <Component className={className}>
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
        </Component>
    );
};

const OptimizedImage: React.FC<{
    src: string;
    alt: string;
    className: string;
    widths: number[];
    sizes: string;
    loading?: 'lazy' | 'eager';
}> = ({ src, alt, className, widths, sizes, loading = 'lazy' }) => {
    const baseUrl = src.split('?')[0];

    const generateSrcSet = (format: 'webp' | 'jpeg') => 
        widths.map(w => `${baseUrl}?fm=${format}&q=80&w=${w} ${w}w`).join(', ');

    return (
        <picture>
            <source type="image/webp" srcSet={generateSrcSet('webp')} sizes={sizes} />
            <source type="image/jpeg" srcSet={generateSrcSet('jpeg')} sizes={sizes} />
            <img 
                src={`${baseUrl}?fm=jpeg&q=80&w=${widths[widths.length - 1]}`}
                alt={alt}
                className={className}
                loading={loading}
                decoding="async"
            />
        </picture>
    );
};

// Import all section components
import Header from './Header';
import HeroSection from './HeroSection';
import VisionSection from './VisionSection';
import ProductSection from './ProductSection';
import UseCasesSection from './UseCasesSection';
import MarketSection from './MarketSection';
import FinancialsSection from './FinancialsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

// --- Main App Component ---
const App: React.FC = () => {
    const [lang, setLang] = useState<Language>(Language.DE);

    const t = useCallback((key: string): string => {
        return translations[lang][key as keyof typeof translations.de] || translations[Language.EN][key as keyof typeof translations.en] || `[${key}]`;
    }, [lang]);

    useEffect(() => {
        const userLang = navigator.language.split('-')[0] as Language;
        if ([Language.DE, Language.EN, Language.FR].includes(userLang)) {
            setLang(userLang);
        }
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);


    return (
        <>
            <Header currentLang={lang} onSwitchLang={setLang} tFunc={t} />
            <main>
                <HeroSection tFunc={t} />
                <VisionSection tFunc={t} />
                <ProductSection tFunc={t} />
                <UseCasesSection tFunc={t} />
                <MarketSection tFunc={t} />
                <FinancialsSection tFunc={t} currentLang={lang} />
                <TeamSection tFunc={t} />
                <ContactSection tFunc={t} />
            </main>
            <Footer tFunc={t} />
        </>
    );
};

export default App;
