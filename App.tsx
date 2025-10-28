import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from './types';
import { translations } from './constants';
import UseOfFundsChart from './components/UseOfFundsChart';
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

// --- Sub-components (Sections) ---

interface HeaderProps {
    currentLang: Language;
    onSwitchLang: (lang: Language) => void;
    tFunc: (key: string) => string;
}
const Header: React.FC<HeaderProps> = ({ currentLang, onSwitchLang, tFunc }) => (
    <header className="py-4">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
            <a href="#hero" className="logo text-2xl font-black text-white flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="15" fill="var(--bg-graphite-light)"/>
                    <path d="M50 15 C 75 15, 85 25, 85 50 C 85 75, 75 85, 50 85 C 25 85, 15 75, 15 50 C 15 25, 25 15, 50 15 Z" stroke="var(--accent-cyan)" strokeWidth="6"/>
                    <circle cx="50" cy="50" r="12" fill="var(--accent-cyan)"/>
                    <path d="M50 30 V 18 M 50 70 V 82 M 30 50 H 18 M 70 50 H 82" stroke="var(--accent-cyan)" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                <span>HAVENIS AI</span>
            </a>
            <div className="flex items-center">
                <nav className="hidden md:flex space-x-6 mr-6 text-sm">
                    <a href="#vision" className="text-text-secondary hover:text-text-primary transition">{tFunc('nav_vision')}</a>
                    <a href="#product" className="text-text-secondary hover:text-text-primary transition">{tFunc('nav_product')}</a>
                    <a href="#use-cases" className="text-text-secondary hover:text-text-primary transition">{tFunc('nav_tech')}</a>
                    <a href="#market" className="text-text-secondary hover:text-text-primary transition">{tFunc('nav_market')}</a>
                    <a href="#contact" className="text-text-secondary hover:text-text-primary transition">{tFunc('nav_contact')}</a>
                </nav>
                <div className="lang-switcher">
                    <button onClick={() => onSwitchLang(Language.DE)} className={currentLang === Language.DE ? 'active' : ''}>DE</button>
                    <button onClick={() => onSwitchLang(Language.EN)} className={currentLang === Language.EN ? 'active' : ''}>EN</button>
                    <button onClick={() => onSwitchLang(Language.FR)} className={currentLang === Language.FR ? 'active' : ''}>FR</button>
                </div>
            </div>
        </div>
    </header>
);

const HeroSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="hero" className="text-center min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
             <OptimizedImage
                src="/images/hero-image.webp"
                alt="Konzeptbild einer Person, die in einem modernen Wohnzimmer meditiert, umgeben von Datenvisualisierungen"
                className="w-full h-full object-cover"
                widths={[640, 1024, 1280, 1920]}
                sizes="100vw"
                loading="eager"
            />
        </div>
        <div className="max-w-4xl mx-auto px-5 fade-in-up relative z-10">
            <T tKey="hero_title" tFunc={tFunc} as="h1" dangerously />
            <T tKey="hero_subtitle" tFunc={tFunc} as="p" className="mt-6 text-xl text-text-secondary max-w-2xl mx-auto" />
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact" className="btn btn-primary">
                    <MailIcon className="mr-2 h-5 w-5"/><span>{tFunc('hero_cta_primary')}</span>
                </a>
                <a href="#product" className="btn btn-outline">
                    <CpuIcon className="mr-2 h-5 w-5"/><span>{tFunc('hero_cta_secondary')}</span>
                </a>
            </div>
        </div>
    </section>
);

const VisionSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="vision">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
                <h2>{tFunc('vision_title')}</h2>
                <T tKey="vision_text_1" tFunc={tFunc} className="text-text-secondary text-lg mb-6"/>
                <T tKey="vision_text_2" tFunc={tFunc} className="text-text-secondary text-lg"/>
                <T tKey="vision_promise" tFunc={tFunc} className="mt-6 font-semibold text-lg"/>
            </div>
            <div className="fade-in-up delay-1">
                 <OptimizedImage
                    src="/images/vision-innovation.webp"
                    alt={tFunc('vision_vis')}
                    className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                    widths={[400, 640, 800]}
                    sizes="(min-width: 768px) 50vw, 100vw"
                 />
            </div>
        </div>
    </section>
);

const ProductSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="product">
        <div className="max-w-7xl mx-auto px-5">
            <h2>{tFunc('product_title')}</h2>
            <p className="text-text-secondary text-lg max-w-3xl mb-12">{tFunc('product_subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="fade-in-up">
                    <h3><Layers3Icon className="inline-block mr-2 h-6 w-6" /><span>{tFunc('product_schema_title')}</span></h3>
                    <p className="text-text-secondary">{tFunc('product_schema_text')}</p>
                    <div className="mt-6">
                        <OptimizedImage
                            src="/images/product-showcase.webp"
                            alt={tFunc('product_schema_vis')}
                            className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                            widths={[400, 640, 800]}
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
                <div className="fade-in-up delay-1">
                    <h3><BrainCircuitIcon className="inline-block mr-2 h-6 w-6" /><span>{tFunc('product_layers_title')}</span></h3>
                    <p className="text-text-secondary">{tFunc('product_layers_text')}</p>
                    <div className="mt-6">
                        <OptimizedImage
                            src="/images/product-showcase.webp"
                            alt={tFunc('product_layers_vis')}
                            className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                            widths={[400, 640, 800]}
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const UseCasesSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="use-cases">
        <div className="max-w-7xl mx-auto px-5">
            <h2>{tFunc('use_cases_title')}</h2>
            <p className="text-text-secondary text-lg max-w-3xl mb-12">{tFunc('use_cases_subtitle')}</p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="card fade-in-up flex flex-col">
                    <GemIcon className="w-12 h-12 mb-4 text-accent-cyan" />
                    <h3>{tFunc('use_case1_title')}</h3>
                    <p className="text-text-secondary flex-grow">{tFunc('use_case1_text')}</p>
                    <div className="mt-6">
                        <OptimizedImage
                            src="/images/use-cases.webp"
                            alt={tFunc('use_case1_vis')}
                            className="w-full h-auto rounded-lg"
                            widths={[300, 400, 600]}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
                <div className="card fade-in-up delay-1 flex flex-col">
                    <HeartPulseIcon className="w-12 h-12 mb-4 text-accent-cyan" />
                    <h3>{tFunc('use_case2_title')}</h3>
                    <p className="text-text-secondary flex-grow">{tFunc('use_case2_text')}</p>
                     <div className="mt-6">
                        <OptimizedImage
                            src="/images/use-cases.webp"
                            alt={tFunc('use_case2_vis')}
                            className="w-full h-auto rounded-lg"
                            widths={[300, 400, 600]}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
                <div className="card fade-in-up delay-2 flex flex-col">
                    <ShieldCheckIcon className="w-12 h-12 mb-4 text-accent-cyan" />
                    <h3>{tFunc('use_case3_title')}</h3>
                    <p className="text-text-secondary flex-grow">{tFunc('use_case3_text')}</p>
                    <div className="mt-6">
                         <OptimizedImage
                            src="/images/product-showcase.webp"
                            alt={tFunc('use_case3_vis')}
                            className="w-full h-auto rounded-lg"
                            widths={[300, 400, 600]}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const MarketSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="market">
        <div className="max-w-7xl mx-auto px-5">
            <h2>{tFunc('market_growth_title')}</h2>
            <p className="text-text-secondary text-lg max-w-3xl mb-12">{tFunc('market_growth_subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="fade-in-up">
                    <h3><TrendingUpIcon className="inline-block mr-2 h-6 w-6"/><span>{tFunc('market_chart_title')}</span></h3>
                    <p className="text-text-secondary">{tFunc('market_chart_desc')}</p>
                     <div className="mt-6">
                        <OptimizedImage
                            src="/images/market-analysis.webp"
                            alt={tFunc('market_chart_vis')}
                            className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                            widths={[400, 640, 800]}
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
                <div className="fade-in-up delay-1">
                    <h3><CheckCheckIcon className="inline-block mr-2 h-6 w-6"/><span>{tFunc('market_comparison_title')}</span></h3>
                    <p className="text-text-secondary">{tFunc('market_comparison_desc')}</p>
                    <div className="mt-6">
                        <OptimizedImage
                            src="/images/market-analysis.webp"
                            alt={tFunc('market_comparison_vis')}
                            className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                            widths={[400, 640, 800]}
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-16 fade-in-up delay-2">
                <h3>{tFunc('market_exit_title_detail')}</h3>
                <p className="text-text-secondary max-w-3xl">{tFunc('market_exit_text_detail')}</p>
            </div>
        </div>
    </section>
);

const FinancialsSection: React.FC<{ tFunc: (key: string) => string; currentLang: Language }> = ({ tFunc, currentLang }) => (
    <section id="financials">
        <div className="max-w-7xl mx-auto px-5">
            <h2>{tFunc('financials_title')}</h2>
            <p className="text-text-secondary text-lg max-w-3xl mb-12">{tFunc('financials_subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="fade-in-up">
                    <h3><CoinsIcon className="inline-block mr-2 h-6 w-6"/><span>{tFunc('financials_plan_title')}</span></h3>
                    <div className="relative mt-6 p-0 md:p-4 before:content-[''] before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[3px] before:bg-bg-graphite-light md:before:left-1/2 md:before:-translate-x-1/2">
                        <div className="relative mb-12 pl-8 md:pl-0 md:w-1/2 md:pr-8 md:text-right">
                            <div className="absolute top-2.5 left-0 w-4 h-4 bg-accent-cyan border-3 border-bg-graphite-dark rounded-full z-10 md:right-0 md:left-auto md:-mr-2"/>
                            <div className="p-4 bg-bg-graphite-light rounded-lg border border-cyan-500/10">
                                <div className="font-bold text-accent-cyan mb-2 font-orbitron">{tFunc('financials_t1_date')}</div>
                                <h4 className="font-semibold text-white mb-2">{tFunc('financials_t1_amount')}</h4>
                                <p className="text-sm text-text-secondary">{tFunc('financials_t1_use')}</p>
                            </div>
                        </div>
                        <div className="relative mb-12 pl-8 md:w-1/2 md:pl-8 md:left-1/2 md:text-left">
                            <div className="absolute top-2.5 left-0 w-4 h-4 bg-accent-cyan border-3 border-bg-graphite-dark rounded-full z-10 md:-ml-2"/>
                            <div className="p-4 bg-bg-graphite-light rounded-lg border border-cyan-500/10">
                                <div className="font-bold text-accent-cyan mb-2 font-orbitron">{tFunc('financials_t2_date')}</div>
                                <h4 className="font-semibold text-white mb-2">{tFunc('financials_t2_amount')}</h4>
                                <p className="text-sm text-text-secondary">{tFunc('financials_t2_use')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fade-in-up delay-1">
                    <h3><PieChartIcon className="inline-block mr-2 h-6 w-6"/><span>{tFunc('financials_alloc_title')}</span></h3>
                    <UseOfFundsChart currentLang={currentLang} />
                </div>
            </div>
            <div className="mt-16 card text-center fade-in-up delay-2">
                <h3>{tFunc('financials_cta_title')}</h3>
                <p className="text-text-secondary mb-6">{tFunc('financials_cta_desc')}</p>
                <a href="#contact" className="btn btn-primary">
                    <RocketIcon className="mr-2 h-5 w-5"/><span>{tFunc('financials_cta_button')}</span>
                </a>
            </div>
        </div>
    </section>
);

const TeamSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <section id="team">
        <div className="max-w-7xl mx-auto px-5 text-center">
            <h2 className="inline-block">{tFunc('team_detail_title')}</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-12">{tFunc('team_detail_subtitle')}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
                <div className="card !bg-transparent border-none shadow-none fade-in-up">
                    <img src="https://robohash.org/DaniloKuss?set=set4&bgset=bg2&size=160x160" alt="AI-generated avatar for Danilo Kuss" className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-accent-cyan shadow-[0_0_20px_var(--accent-neon-glow)] transition-transform duration-300 hover:scale-105" loading="lazy" decoding="async"/>
                    <h4 className="font-bold text-xl text-white">{tFunc('team_m1_name_detail')}</h4>
                    <p className="text-accent-cyan font-semibold">{tFunc('team_m1_role_detail')}</p>
                    <p className="text-text-secondary text-sm mt-2">{tFunc('team_m1_desc_detail')}</p>
                </div>
                <div className="card !bg-transparent border-none shadow-none fade-in-up delay-1">
                    <img src="https://robohash.org/SarahLeRoux?set=set4&bgset=bg2&size=160x160" alt="AI-generated avatar for Sarah Le Roux" className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-accent-cyan shadow-[0_0_20px_var(--accent-neon-glow)] transition-transform duration-300 hover:scale-105" loading="lazy" decoding="async"/>
                    <h4 className="font-bold text-xl text-white">{tFunc('team_m2_name_detail')}</h4>
                    <p className="text-accent-cyan font-semibold">{tFunc('team_m2_role_detail')}</p>
                    <p className="text-text-secondary text-sm mt-2">{tFunc('team_m2_desc_detail')}</p>
                </div>
                <div className="card !bg-transparent border-none shadow-none fade-in-up delay-2">
                    <div className="w-40 h-40 rounded-full mx-auto mb-4 bg-bg-graphite-light border-2 border-dashed border-accent-cyan flex flex-col items-center justify-center">
                        <UsersIcon className="w-12 h-12 text-accent-cyan mb-2"/>
                        <span className="text-xs text-accent-cyan uppercase tracking-wider">{tFunc('team_m3_name_detail')}</span>
                    </div>
                    <h4 className="font-bold text-xl text-white invisible">Placeholder</h4>
                    <p className="text-accent-cyan font-semibold">{tFunc('team_m3_role_detail')}</p>
                    <p className="text-text-secondary text-sm mt-2">{tFunc('team_m3_desc_detail')}</p>
                </div>
            </div>
            <div className="fade-in-up delay-3 max-w-4xl mx-auto">
                 <OptimizedImage
                    src="/images/team-collaboration.webp"
                    alt={tFunc('team_map_vis')}
                    className="w-full h-auto rounded-lg border border-cyan-500/20 shadow-lg"
                    widths={[640, 800, 1024]}
                    sizes="(min-width: 1024px) 896px, 100vw"
                />
            </div>
        </div>
    </section>
);

const ContactSection: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
            setStatus('success');
            formRef.current?.reset();
            setTimeout(() => setStatus('idle'), 6000);
        } else {
            setStatus('error');
        }
    };

    const getMessage = () => {
        switch(status) {
            case 'sending': return <span style={{color: 'var(--accent-cyan)'}}>{tFunc('cta_sending')}</span>;
            case 'success': return <span style={{color: 'var(--accent-cyan-light)'}}>{tFunc('cta_success')}</span>;
            case 'error': return <span style={{color: 'red'}}>{tFunc('cta_error')}</span>;
            default: return null;
        }
    };

    return (
        <section id="contact">
            <div className="max-w-3xl mx-auto px-5 text-center">
                <h2>{tFunc('contact_form_title')}</h2>
                <p className="text-text-secondary text-lg mb-10">{tFunc('contact_form_subtitle')}</p>
                <form ref={formRef} onSubmit={handleSubmit} className="card !bg-bg-graphite-light fade-in-up space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1 text-left">{tFunc('contact_name')}</label>
                        <input type="text" id="name" name="name" required placeholder={tFunc('contact_name')} className="w-full" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1 text-left">{tFunc('contact_email')}</label>
                        <input type="email" id="email" name="email" required placeholder={tFunc('contact_email')} className="w-full" />
                    </div>
                    <div>
                        <label htmlFor="investorType" className="block text-sm font-medium text-text-secondary mb-1 text-left">{tFunc('contact_type')}</label>
                        <select id="investorType" name="investorType" required className="w-full" defaultValue="">
                            <option value="" disabled>{tFunc('contact_select')}</option>
                            <option value="VC">{tFunc('contact_vc')}</option>
                            <option value="Angel">{tFunc('contact_angel')}</option>
                            <option value="FamilyOffice">{tFunc('contact_fo')}</option>
                            <option value="Strategic">{tFunc('contact_strategic')}</option>
                            <option value="Other">{tFunc('contact_other')}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1 text-left">{tFunc('contact_message')}</label>
                        <textarea id="message" name="message" rows={3} placeholder={tFunc('contact_message')} className="w-full"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full text-base" disabled={status === 'sending'}>
                        <FileCheckIcon className="mr-2 h-5 w-5"/><span>{tFunc('contact_button')}</span>
                    </button>
                    <p className="text-sm text-text-secondary h-5 mt-3">{getMessage()}</p>
                </form>
                <p className="text-xs text-text-secondary mt-6">{tFunc('contact_disclaimer')}</p>
            </div>
        </section>
    );
};

const Footer: React.FC<{ tFunc: (key: string) => string }> = ({ tFunc }) => (
    <footer className="py-10 text-center border-t border-t-white/10">
        <p className="text-sm text-text-secondary">{tFunc('footer_copy_detail')}</p>
        <p className="text-xs text-text-secondary mt-2">
            <a href="mailto:info@havenis.ai" className="hover:text-accent-cyan transition">{tFunc('footer_contact_detail')}</a> | <span>{tFunc('footer_version_detail')}</span>
        </p>
    </footer>
);

export default App;
