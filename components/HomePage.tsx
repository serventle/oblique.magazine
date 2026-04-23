"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Oswald:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    
    body { 
        font-family: 'Inter', sans-serif; background-color: #F4F4F0; color: #000; 
        margin: 0; overflow-x: hidden; -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: -0.01em; }
    .font-sans { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }

    .grain { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        pointer-events: none; z-index: 999; opacity: 0.05; 
        background-image: url('https://grainy-gradients.vercel.app/noise.svg'); 
    }
    
    .border-brutal { border: 2px solid #000; }
    .border-b-brutal { border-bottom: 2px solid #000; }
    .border-r-brutal { border-right: 2px solid #000; }
    .border-t-brutal { border-top: 2px solid #000; }
    .border-l-brutal { border-left: 2px solid #000; }
    
    .shadow-brutal { box-shadow: 6px 6px 0px 0px #000; transition: all 0.2s; }
    .shadow-brutal:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0px 0px #000; }
    
    .img-editorial { filter: grayscale(100%) contrast(1.15); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .group:hover .img-editorial, .img-editorial:hover { filter: grayscale(0%) contrast(1.0); transform: scale(1.02); }
    
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: inline-block; animation: marquee 15s linear infinite; }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F4F4F0; border-left: 1px solid #000; }
    ::-webkit-scrollbar-thumb { background: #000; }
    ::selection { background: #CCFF00; color: #000; }
`;

const DICT: any = {
    ru: {
        nav: { archive: "Архив", shop: "Магазин", about: "Манифест", issue: "ВЫПУСК 0.1 / КАЗАХСТАН" },
        home: { 
            subtitle: "Первый журнал андеграунд культуры. Локальная кухня, бары, тусовки, театры, люди и честный вайб города.",
            buyBtn: "Купить принт", platform: "Платформа", watchArchive: "Смотреть архив", read: "Читать",
            shaking: "КТО ШАТАЕТ", beton: "БЕТОН?", manifestoBtn: "Читать манифест",
            mission: "Мы приоткрываем пласт казахстанского андеграунда, чтобы показать вам то, что остается незамеченным."
        },
        article: { back: "Вернуться", readTime: "МИН. ЧТЕНИЯ", words: "АВТОР" }
    },
    en: {
        nav: { archive: "Archive", shop: "Store", about: "Manifesto", issue: "ISSUE 0.1 / KAZAKHSTAN" },
        home: { 
            subtitle: "The first underground culture magazine. Local cuisine, bars, raves, theaters, people, and the honest vibe of the city.",
            buyBtn: "Buy Print", platform: "Platform", watchArchive: "View Archive", read: "Read",
            shaking: "WHO SHAKES", beton: "THE CONCRETE?", manifestoBtn: "Read Manifesto",
            mission: "We uncover the layer of Kazakhstan's underground to show you what remains unnoticed."
        },
        article: { back: "Go Back", readTime: "MIN READ", words: "WORDS BY" }
    }
};

const Icon = ({ name, size = 20, className = "" }: {name: string, size?: number, className?: string}) => {
    const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "square", strokeLinejoin: "miter", className };
    switch(name) {
        case "Menu": return <svg {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
        case "X": return <svg {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
        case "ArrowRight": return <svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
        case "ArrowLeft": return <svg {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
        case "ShoppingCart": return <svg {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
        case "Settings": return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
        default: return null;
    }
};

const DEFAULT_ARTICLES = [
    { 
        id: 'demo1', 
        title_ru: "COLOSSUS: БЫВШИЙ ДОМ ПЕЧАТИ", title_en: "COLOSSUS: THE FORMER PRINTING HOUSE",
        category_ru: "МЕСТА", category_en: "PLACES", 
        author: "Эльвира Иванникова", date: "23.04.2026", readTime: "5",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200", 
        description_ru: "Пространство, которое не заигрывает с посетителем. Оно подавляет масштабом.",
        description_en: "A space that doesn't flirt with the visitor. It crushes with its scale.",
        quote_ru: "Архитектура здесь диктует масштаб человеческого опыта.",
        quote_en: "Architecture here dictates the scale of human experience.",
        content_ru: "Городское пространство редко бывает статичным. Оно пульсирует, меняет агрегатные состояния, выталкивает из себя старые смыслы.\nАлматы сегодня — это не просто фасады зданий и сетка улиц. Это сложная экосистема, которая считывается через андеграунд.",
        content_en: "Urban space is rarely static. It pulsates, changes states of matter, expels old meanings and absorbs new ones.\nAlmaty today is not just building facades and street grids. It's a complex ecosystem read through the underground."
    },
    { 
        id: 'demo2', 
        title_ru: "TULPAN BERLIN: ГЛЯНЕЦ И КРАСНЫЙ ДЫМ", title_en: "TULPAN BERLIN: GLOSS AND RED SMOKE",
        category_ru: "КУЛЬТУРА", category_en: "CULTURE", 
        author: "Ева Головинцева", date: "18.04.2026", readTime: "4",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1200", 
        description_ru: "Днем — стерильный бокс для съемок. Ночью — вибрирующий резервуар ВИХОД.",
        description_en: "By day — a sterile shooting box. By night — a vibrating reservoir VIKHOD.",
        quote_ru: "Когда пространство заливает густой красный дым, статусность аннулируется.",
        quote_en: "When thick red smoke fills the space, status is annulled.",
        content_ru: "Днем здесь снимают коммерческие лукбуки, а вечером натягивают плотные черные шторы.\nСтудия сбрасывает глянцевую оболочку, когда пространство заливает густой, непроглядный красный дым. Это момент чистого опыта.",
        content_en: "Commercial lookbooks are shot here during the day, and heavy black curtains are drawn in the evening.\nThe studio sheds its glossy shell when thick, impenetrable red smoke floods the space. It's a moment of pure experience."
    }
];

export function HomePage({ data }: { data: any }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState('ru');
    
    // Пока что используем демо-статьи. Как только ты увидишь, что дизайн загрузился, 
    // мы свяжем этот массив с переменной `data`, которая приходит из Sanity!
    const articles = DEFAULT_ARTICLES;
    const t = DICT[lang];

    const getL = (obj: any, field: string) => obj[`${field}_${lang}`] || obj[field] || "";

    const openArticle = (id: string) => {
        setSelectedArticleId(id);
        setCurrentPage('article');
        window.scrollTo(0, 0);
    };

    const Navigation = () => (
        <nav className="fixed top-0 w-full z-50 bg-[#F4F4F0]/95 backdrop-blur-md border-b-brutal">
            <div className="w-full px-6 flex justify-between items-center h-16 md:h-20">
                <div className="flex items-center space-x-12">
                    <button onClick={() => setCurrentPage('home')} className="text-3xl md:text-4xl font-display tracking-tight hover:text-[#0033FF] transition-colors mt-1">OBLIQUE</button>
                    <div className="hidden md:flex space-x-8 font-sans text-[10px] font-bold tracking-widest uppercase mt-1">
                        <button onClick={() => setCurrentPage('articles')} className="hover:text-[#FF00FF] transition-colors">{t.nav.archive}</button>
                        <button onClick={() => setCurrentPage('shop')} className="hover:text-[#FF00FF] transition-colors">{t.nav.shop}</button>
                        <button onClick={() => setCurrentPage('about')} className="hover:text-[#FF00FF] transition-colors">{t.nav.about}</button>
                    </div>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6">
                    <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="font-sans font-bold text-[10px] uppercase border-brutal px-2 py-1 hover:bg-[#CCFF00] transition-colors">
                        {lang === 'ru' ? 'EN' : 'RU'}
                    </button>
                    
                    {/* КНОПКА ВХОДА В SANITY STUDIO */}
                    <Link href="/studio" className="opacity-30 hover:opacity-100 transition-opacity hidden md:block" title="Открыть админку Sanity">
                        <Icon name="Settings" size={18} />
                    </Link>

                    <button className="relative hover:text-[#0033FF] transition-colors" onClick={() => setCurrentPage('shop')}>
                        <Icon name="ShoppingCart" size={22} />
                        {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-[#CCFF00] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-sans border-brutal">{cartCount}</span>}
                    </button>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Icon name={isMenuOpen ? "X" : "Menu"} size={26} />
                    </button>
                </div>
            </div>
        </nav>
    );

    const HomeView = () => {
        const heroArticle = articles[0];
        const gridArticles = articles.slice(1);

        return (
            <div className="pt-16 md:pt-20 w-full">
                <section className="flex flex-col lg:flex-row w-full border-b-brutal min-h-[85vh] bg-white">
                    <div className="w-full lg:w-1/3 border-b-brutal lg:border-b-0 lg:border-r-brutal p-8 md:p-12 flex flex-col justify-between order-2 lg:order-1 bg-white relative">
                        <div>
                            <span className="font-sans font-bold text-[10px] mb-8 inline-block bg-[#0033FF] text-white px-3 py-1 tracking-widest uppercase border-brutal border-[#0033FF]">{t.nav.issue}</span>
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display leading-[0.85] tracking-tight uppercase mb-6 text-black break-words">
                                UNDER<br/>GROUND<br/>ALMATY
                            </h1>
                            <p className="text-xs font-sans font-bold uppercase leading-relaxed opacity-60 mb-8 max-w-xs">{t.home.subtitle}</p>
                        </div>
                        <div className="mt-12">
                            <button onClick={() => setCurrentPage('shop')} className="w-full py-5 bg-[#CCFF00] text-black hover:bg-black hover:text-[#CCFF00] transition-colors flex items-center justify-between px-6 font-sans font-bold text-[10px] tracking-widest uppercase border-brutal shadow-brutal">
                                <span>{t.home.buyBtn}</span>
                                <Icon name="ArrowRight" size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 relative overflow-hidden group h-[60vh] lg:h-auto order-1 lg:order-2 bg-black cursor-pointer" onClick={() => openArticle(heroArticle.id)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroArticle.image} alt={heroArticle.title_ru} className="w-full h-full object-cover img-editorial absolute inset-0 opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <span className="text-[#CCFF00] font-serif italic text-xl md:text-3xl mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">Featured Story</span>
                            <h2 className="text-white text-5xl md:text-7xl lg:text-[8rem] font-display uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 text-center leading-[0.85] transform translate-y-8 group-hover:translate-y-0">
                                {getL(heroArticle, 'title')}
                            </h2>
                        </div>
                        <div className="absolute top-6 right-6 bg-[#FF00FF] text-white font-sans font-bold text-[9px] px-3 py-1 tracking-widest uppercase border-brutal border-white">{getL(heroArticle, 'category')}</div>
                    </div>
                </section>

                <div className="overflow-hidden whitespace-nowrap border-b-brutal bg-[#FF00FF] text-white py-3">
                    <div className="animate-marquee font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
                        {Array(15).fill('LOCAL SCENE • TECHNO • ART • THEATRE • ALMATY +++ ').join('')}
                    </div>
                </div>

                <section className="w-full bg-[#F4F4F0] py-20 md:py-32 border-b-brutal">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">{t.home.platform}</h2>
                            <button onClick={() => setCurrentPage('articles')} className="font-sans text-[10px] font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#0033FF]">{t.home.watchArchive}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {gridArticles.map((art) => (
                                <div key={art.id} className="group cursor-pointer flex flex-col" onClick={() => openArticle(art.id)}>
                                    <div className="relative overflow-hidden aspect-[3/4] border-brutal shadow-brutal mb-6 bg-black">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={art.image} alt={getL(art, 'title')} className="w-full h-full object-cover img-editorial opacity-90 group-hover:opacity-100" />
                                        <div className="absolute top-4 left-4 bg-white text-black font-sans font-bold text-[9px] px-3 py-1 tracking-widest uppercase border-brutal group-hover:bg-[#CCFF00]">{getL(art, 'category')}</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3 text-[9px] font-sans font-bold uppercase tracking-widest opacity-50 border-b border-black/20 pb-2">
                                        <span>{art.date}</span>
                                        <span>{art.readTime} {t.article.readTime}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-display uppercase leading-[0.9] mb-3 group-hover:text-[#0033FF]">{getL(art, 'title')}</h3>
                                    <p className="text-xs opacity-70 font-sans uppercase font-medium line-clamp-2">{getL(art, 'description')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-black text-white py-32 px-6 border-b-brutal">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-6xl md:text-[8rem] font-display uppercase tracking-tight mb-10 leading-[0.85] text-[#CCFF00]">
                            {t.home.shaking}<br/>{t.home.beton}
                        </h2>
                        <p className="text-xs md:text-sm font-sans font-medium uppercase mb-16 leading-relaxed opacity-80 max-w-lg mx-auto">{t.home.mission}</p>
                        <button onClick={() => setCurrentPage('about')} className="border-brutal border-white px-12 py-5 hover:bg-[#FF00FF] hover:border-[#FF00FF] hover:text-white font-sans font-bold text-[10px] uppercase tracking-widest">{t.home.manifestoBtn}</button>
                    </div>
                </section>
            </div>
        );
    };

    const SingleArticleView = () => {
        const article = articles.find(a => a.id === selectedArticleId) || DEFAULT_ARTICLES[0];
        return (
            <div className="pt-16 md:pt-20 w-full min-h-screen bg-[#F4F4F0]">
                <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">
                    <div className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-80px)] lg:sticky top-20 border-b-brutal lg:border-b-0 lg:border-r-brutal bg-black relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={article.image} alt={getL(article, 'title')} className="w-full h-full object-cover img-editorial opacity-90" />
                        <div className="absolute top-6 left-6 bg-[#CCFF00] text-black px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase border-brutal">{getL(article, 'category')}</div>
                    </div>
                    <div className="w-full lg:w-1/2 bg-white p-8 md:p-16 lg:p-20 overflow-y-auto">
                        <button onClick={() => setCurrentPage('home')} className="flex items-center text-[10px] font-sans font-bold uppercase tracking-widest hover:text-[#0033FF] mb-12"><Icon name="ArrowLeft" size={16} className="mr-3" /> {t.article.back}</button>
                        
                        <div className="flex flex-wrap gap-6 text-[9px] font-sans font-bold uppercase tracking-widest opacity-60 mb-8 border-b-2 border-black pb-4">
                            <span>{article.date}</span>
                            <span>{article.readTime} {t.article.readTime}</span>
                            <span>{t.article.words} {article.author}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-[0.85] mb-10">{getL(article, 'title')}</h1>
                        <p className="text-xl md:text-2xl font-display text-[#FF00FF] uppercase leading-snug mb-12 border-l-4 border-[#0033FF] pl-6">{getL(article, 'description')}</p>

                        <div className="font-sans text-sm md:text-base leading-relaxed opacity-90 space-y-8 max-w-2xl text-justify">
                            {getL(article, 'content').split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
                            {getL(article, 'quote') && (
                                <blockquote className="my-16 pl-6 md:pl-10 border-l-[6px] border-[#FF00FF]">
                                    <p className="text-2xl md:text-4xl font-serif italic text-[#0033FF] leading-snug">"{getL(article, 'quote')}"</p>
                                </blockquote>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ArticlesArchiveView = () => (
        <div className="pt-16 md:pt-20 w-full min-h-screen pb-20 bg-white">
            <div className="px-6 md:px-12 py-16 md:py-24 border-b-brutal bg-[#0033FF] text-[#CCFF00]">
                <h2 className="text-6xl md:text-[8rem] font-display uppercase tracking-tight leading-none">{t.nav.archive}</h2>
            </div>
            <div className="w-full">
                {articles.map((art, i) => (
                    <div key={art.id} className="group border-b-brutal flex flex-col lg:flex-row cursor-pointer hover:bg-[#F4F4F0] transition-colors" onClick={() => openArticle(art.id)}>
                        <div className="w-full lg:w-1/4 aspect-video lg:aspect-square overflow-hidden border-b-brutal lg:border-b-0 lg:border-r-brutal shrink-0 relative bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={art.image} alt={getL(art, 'title')} className="w-full h-full object-cover img-editorial opacity-80 group-hover:opacity-100 group-hover:scale-105" />
                            <div className="absolute top-4 left-4 bg-white text-black text-[9px] px-3 py-1 font-bold uppercase tracking-widest font-sans border-brutal">{getL(art, 'category')}</div>
                        </div>
                        <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center">
                            <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tight leading-[0.9] mb-4 group-hover:text-[#0033FF]">{getL(art, 'title')}</h3>
                            <p className="text-xs font-sans font-medium uppercase opacity-60 max-w-xl">{getL(art, 'description')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const ShopView = () => {
        const shopItems = [
            { id: '1', title: "OBLIQUE ISSUE #0.1", price: "5000 ₸", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800", type: "PRINT" },
            { id: '2', title: "BETON TEE", price: "12000 ₸", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800", type: "MERCH" }
        ];
        return (
            <div className="pt-16 md:pt-20 w-full min-h-screen bg-[#F4F4F0]">
                <div className="px-6 md:px-12 py-12 md:py-20 border-b-brutal bg-white">
                    <h2 className="text-6xl md:text-[8rem] font-display uppercase tracking-tight leading-none">{t.nav.shop}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full border-b-brutal bg-white">
                    {shopItems.map((item, idx) => (
                        <div key={item.id} className={`p-8 md:p-16 group flex flex-col hover:bg-[#CCFF00] ${idx !== 0 ? 'border-t-brutal lg:border-t-0 lg:border-l-brutal' : ''}`}>
                            <div className="aspect-square bg-white mb-12 relative overflow-hidden flex items-center justify-center border-brutal shadow-brutal group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                               {/* eslint-disable-next-line @next/next/no-img-element */}
                               <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply img-editorial" />
                            </div>
                            <div className="flex justify-between items-end mt-auto pt-6 border-t-2 border-black">
                                <div><h3 className="text-3xl md:text-5xl font-display mb-1">{item.title}</h3><p className="text-xl font-bold font-sans text-[#0033FF]">{item.price}</p></div>
                                <button onClick={() => setCartCount(c => c + 1)} className="bg-black text-white w-14 h-14 hover:bg-[#0033FF] border-brutal border-black"><span className="text-3xl font-bold">+</span></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const AboutView = () => (
        <div className="pt-16 md:pt-20 w-full min-h-screen bg-black text-white pb-32">
            <div className="px-6 md:px-12 py-20 md:py-32 border-b border-white/20">
                <h2 className="text-[12vw] font-display uppercase tracking-tight leading-[0.8] mb-12 text-[#CCFF00]">{t.nav.about}</h2>
                <div className="max-w-4xl font-serif italic text-2xl md:text-4xl leading-snug mb-16">"{t.home.mission}"</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
            <div className="grain"></div>
            
            <Navigation />

            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#0033FF] text-[#CCFF00] z-[100] p-8 flex flex-col">
                    <div className="flex justify-between items-center border-b-brutal border-[#CCFF00] pb-6">
                        <span className="text-4xl font-display uppercase tracking-wide">Oblique</span>
                        <button onClick={() => setIsMenuOpen(false)}><Icon name="X" size={40} /></button>
                    </div>
                    <div className="flex flex-col space-y-6 text-6xl md:text-8xl font-display uppercase tracking-tight mt-12">
                        <button onClick={() => {setCurrentPage('home'); setIsMenuOpen(false)}} className="text-left hover:text-white transition-colors">Главная</button>
                        <button onClick={() => {setCurrentPage('articles'); setIsMenuOpen(false)}} className="text-left hover:text-white transition-colors">{t.nav.archive}</button>
                        <button onClick={() => {setCurrentPage('shop'); setIsMenuOpen(false)}} className="text-left hover:text-white transition-colors">{t.nav.shop}</button>
                        <button onClick={() => {setCurrentPage('about'); setIsMenuOpen(false)}} className="text-left hover:text-white transition-colors">{t.nav.about}</button>
                    </div>
                </div>
            )}

            <div className="flex-grow">
                {currentPage === 'home' && <HomeView />}
                {currentPage === 'article' && <SingleArticleView />}
                {currentPage === 'articles' && <ArticlesArchiveView />}
                {currentPage === 'shop' && <ShopView />}
                {currentPage === 'about' && <AboutView />}
            </div>

            <footer className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 border-t-brutal">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-brutal pb-12 mb-12">
                    <h3 className="text-6xl md:text-9xl font-display uppercase tracking-tight leading-none mb-8 md:mb-0 hover:text-[#FF00FF] transition-colors cursor-pointer" onClick={() => window.scrollTo(0,0)}>OBLIQUE</h3>
                    <div className="flex gap-6">
                        <Icon name="Instagram" size={28} className="hover:text-[#0033FF]" />
                        <Icon name="Facebook" size={28} className="hover:text-[#0033FF]" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between text-[10px] font-bold font-sans uppercase opacity-80 tracking-widest gap-6">
                    <p>© 2026 OBLIQUE MAGAZINE.</p>
                    <div className="flex gap-12"><span>DESIGN: GOLOVINTSEVA</span><span>EDIT: IVANNIKOVA</span></div>
                </div>
            </footer>
        </div>
    );
}
