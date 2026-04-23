"use client"

import React, { useState } from 'react'

/**
 * Вспомогательный компонент для навигации
 */
const Link = ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
);

/**
 * Набор иконок (Меню, Закрыть, Стрелки, Корзина)
 */
const Icon = ({ name, size = 20, className = "" }: {name: string, size?: number, className?: string}) => {
    const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "square" as const, strokeLinejoin: "miter" as const, className };
    switch(name) {
        case "Menu": return <svg {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
        case "X": return <svg {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
        case "ArrowRight": return <svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
        case "ArrowLeft": return <svg {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
        case "ShoppingCart": return <svg {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
        default: return null;
    }
};

/**
 * Глобальные стили брутализма OBLIQUE
 */
const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
    
    body { 
        font-family: 'Inter', sans-serif; background-color: #F4F4F0; color: #000; 
        margin: 0; overflow-x: hidden; -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: -0.02em; }
    .font-serif { font-family: 'Playfair Display', serif; }

    .grain { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        pointer-events: none; z-index: 999; opacity: 0.04; 
        background-image: url('https://grainy-gradients.vercel.app/noise.svg'); 
    }
    
    .border-brutal { border: 2.5px solid #000; }
    .shadow-brutal { box-shadow: 10px 10px 0px 0px #000; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .shadow-brutal:hover { transform: translate(-3px, -3px); box-shadow: 13px 13px 0px 0px #000; }
    
    .img-editorial { filter: grayscale(100%) contrast(1.1); transition: all 0.8s ease; }
    .group:hover .img-editorial { filter: grayscale(0%) contrast(1); transform: scale(1.04); }
    
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: inline-block; animation: marquee 25s linear infinite; }
`;

export function HomePage({ data }: { data?: any }) {
    const [page, setPage] = useState('home');
    const [selectedArtId, setSelectedArtId] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Контент по умолчанию (показывается, если в Sanity пусто)
    const DEFAULT_ARTICLES = [
        { 
            id: 'demo1', title: "COLOSSUS: БЫВШИЙ ДОМ ПЕЧАТИ", category: "МЕСТА", author: "Эльвира Иванникова", date: "23.04.2026", readTime: "5",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200", 
            description: "Пространство, которое не заигрывает с посетителем. Оно подавляет масштабом.",
            content: "Городское пространство редко бывает статичным. Оно пульсирует, меняет агрегатные состояния, выталкивает из себя старые смыслы. Алматы сегодня — это не просто фасады зданий и сетка улиц. Это сложная экосистема, которая считывается через андеграунд.\nНаш проект исследует эти «трещины» в привычном городском облике, где рождается настоящая культура."
        },
        { 
            id: 'demo2', title: "TULPAN BERLIN: ГЛЯНЕЦ И КРАСНЫЙ ДЫМ", category: "КУЛЬТУРА", author: "Ева Головинцева", date: "18.04.2026", readTime: "4",
            image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1200", 
            description: "Днем — стерильный бокс для съемок. Ночью — вибрирующий резервуар ВИХОД."
        }
    ];

    const articles = (data && data.length > 0) ? data : DEFAULT_ARTICLES;

    const navigate = (p: string) => { setPage(p); setIsMenuOpen(false); window.scrollTo(0, 0); };
    const openArt = (id: string) => { setSelectedArtId(id); navigate('article'); };

    return (
        <div className="min-h-screen flex flex-col selection:bg-[#CCFF00] selection:text-black">
            <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
            <div className="grain"></div>

            {/* HEADER */}
            <header className="fixed top-0 w-full z-50 bg-[#F4F4F0]/90 backdrop-blur-md border-b-[2.5px] border-black h-20 flex items-center px-6 justify-between">
                <div className="flex items-center space-x-12">
                    <button onClick={() => navigate('home')} className="text-4xl font-display mt-1 hover:text-[#0033FF] transition-colors tracking-tighter">OBLIQUE</button>
                    <nav className="hidden md:flex space-x-10 font-sans text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                        <button onClick={() => navigate('archive')} className="hover:text-[#FF00FF]">Архив</button>
                        <button onClick={() => navigate('shop')} className="hover:text-[#FF00FF]">Stockroom</button>
                        <button onClick={() => navigate('about')} className="hover:text-[#FF00FF]">Манифест</button>
                    </nav>
                </div>
                <div className="flex items-center space-x-6">
                    <button className="relative hover:scale-110 transition-transform" onClick={() => navigate('shop')}>
                        <Icon name="ShoppingCart" size={24} />
                        {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-[#CCFF00] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">{cartCount}</span>}
                    </button>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
                    </button>
                </div>
            </header>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#0033FF] text-[#CCFF00] z-[100] p-10 flex flex-col">
                    <div className="flex justify-between items-center border-b-4 border-[#CCFF00] pb-8">
                        <span className="text-4xl font-display uppercase tracking-tight">Oblique</span>
                        <button onClick={() => setIsMenuOpen(false)}><Icon name="X" size={48} /></button>
                    </div>
                    <div className="flex flex-col space-y-8 text-7xl font-display uppercase mt-16 tracking-tighter">
                        <button onClick={() => navigate('home')}>Главная</button>
                        <button onClick={() => navigate('archive')}>Архив</button>
                        <button onClick={() => navigate('shop')}>Stockroom</button>
                        <button onClick={() => navigate('about')}>Манифест</button>
                    </div>
                </div>
            )}

            <main className="flex-grow pt-20">
                {page === 'home' && (
                    <>
                        <section className="flex flex-col lg:flex-row border-b-[2.5px] border-black min-h-[85vh] bg-white">
                            <div className="w-full lg:w-1/3 p-10 md:p-14 flex flex-col justify-between border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-black bg-white">
                                <div>
                                    <span className="bg-[#0033FF] text-white text-[10px] font-bold px-4 py-1.5 uppercase border-2 border-[#0033FF] tracking-widest inline-block mb-10 text-center">Issue 0.1 / KZ</span>
                                    <h1 className="text-8xl md:text-[10rem] font-display leading-[0.75] uppercase tracking-tighter text-black">Under<br/>ground<br/>Almaty</h1>
                                    <p className="text-sm font-bold uppercase opacity-50 mt-12 max-w-xs leading-relaxed italic">Первый журнал андеграунд культуры. Локальная кухня, бары, тусовки, театры и честный вайб города.</p>
                                </div>
                                <button onClick={() => navigate('shop')} className="mt-14 py-7 bg-[#CCFF00] border-[2.5px] border-black shadow-brutal flex justify-between px-10 font-bold uppercase text-xs hover:bg-black hover:text-[#CCFF00] transition-all">
                                    <span>В КАТАЛОГ ПРИНТОВ</span><Icon name="ArrowRight" size={20} />
                                </button>
                            </div>
                            <div className="w-full lg:w-2/3 relative group cursor-pointer overflow-hidden bg-black" onClick={() => openArt(articles[0].id)}>
                                <img src={articles[0].image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <span className="text-[#CCFF00] font-serif italic text-3xl mb-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-8 group-hover:translate-y-0 duration-500">Featured Story</span>
                                    <h2 className="text-white text-6xl md:text-[11rem] font-display uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">{articles[0].title}</h2>
                                </div>
                                <div className="absolute top-10 right-10 bg-[#FF00FF] text-white font-bold text-xs px-5 py-2.5 uppercase border-[2.5px] border-white shadow-2xl">{articles[0].category}</div>
                            </div>
                        </section>

                        <div className="bg-[#FF00FF] py-4 border-b-[2.5px] border-black overflow-hidden whitespace-nowrap text-white">
                            <div className="animate-marquee font-bold text-sm uppercase tracking-[0.4em]">
                                {Array(20).fill('LOCAL SCENE • TECHNO • ART • THEATRE • ALMATY • OBLIQUE • REBELLION +++ ').join('')}
                            </div>
                        </div>

                        <section className="p-10 md:p-24 bg-[#F4F4F0]">
                             <div className="flex justify-between items-end mb-24 border-b-8 border-black pb-8">
                                <h2 className="text-7xl md:text-[9rem] font-display uppercase tracking-tighter leading-none text-black">Платформа</h2>
                                <button onClick={() => navigate('archive')} className="font-bold uppercase text-[12px] border-b-4 border-black hover:text-[#0033FF] transition-colors mb-3">Смотреть всё</button>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                                {articles.slice(1).map((art: any) => (
                                    <div key={art.id} className="group cursor-pointer flex flex-col" onClick={() => openArt(art.id)}>
                                        <div className="aspect-[3/4] border-[2.5px] border-black shadow-brutal overflow-hidden mb-10 bg-black relative">
                                            <div className="absolute inset-0 bg-[#0033FF]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                            <img src={art.image} className="w-full h-full object-cover img-editorial" alt="" />
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold opacity-40 uppercase mb-5 tracking-[0.2em] border-b-2 border-black/10 pb-3">
                                            <span>{art.date}</span><span>{art.readTime} MIN READ</span>
                                        </div>
                                        <h3 className="text-5xl font-display uppercase leading-none group-hover:text-[#0033FF] transition-colors mb-5 tracking-tight">{art.title}</h3>
                                        <p className="text-sm uppercase font-medium opacity-60 line-clamp-3 leading-relaxed">{art.description}</p>
                                    </div>
                                ))}
                             </div>
                        </section>
                    </>
                )}

                {page === 'article' && (
                    <div className="flex flex-col lg:flex-row min-h-screen bg-white animate-in fade-in duration-700">
                        <div className="w-full lg:w-1/2 h-[70vh] lg:h-auto lg:sticky top-20 border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-black bg-black overflow-hidden">
                            <img src={articles.find((a:any)=>a.id===selectedArtId)?.image} className="w-full h-full object-cover opacity-85 scale-105 hover:scale-100 transition-transform duration-1500" alt="" />
                        </div>
                        <div className="w-full lg:w-1/2 p-10 md:p-24 lg:p-32 overflow-y-auto bg-white">
                            <button onClick={() => navigate('home')} className="flex items-center text-xs font-bold uppercase mb-24 hover:text-[#0033FF] transition-colors group tracking-widest">
                                <Icon name="ArrowLeft" size={20} className="mr-5 group-hover:-translate-x-3 transition-transform" /> Назад к ленте
                            </button>
                            <span className="text-[#FF00FF] font-bold text-sm uppercase tracking-[0.3em] mb-8 block border-l-8 border-[#FF00FF] pl-6">
                                {articles.find((a:any)=>a.id===selectedArtId)?.category}
                            </span>
                            <h1 className="text-7xl md:text-[9rem] font-display uppercase leading-[0.8] mb-16 tracking-tighter">
                                {articles.find((a:any)=>a.id===selectedArtId)?.title}
                            </h1>
                            <div className="flex space-x-16 text-xs font-bold uppercase opacity-40 mb-20 border-t-4 border-b-4 border-black py-6 tracking-widest">
                                <span>Автор: {articles.find((a:any)=>a.id===selectedArtId)?.author}</span>
                                <span>Дата: {articles.find((a:any)=>a.id===selectedArtId)?.date}</span>
                            </div>
                            <div className="prose max-w-none font-sans text-xl md:text-2xl leading-relaxed opacity-90 space-y-12 text-justify">
                                {articles.find((a:any)=>a.id===selectedArtId)?.content?.split('\n').map((p:string, i:number) => <p key={i}>{p}</p>) || "Контент загружается..."}
                            </div>
                        </div>
                    </div>
                )}

                {page === 'about' && (
                    <section className="bg-black text-white min-h-screen p-10 md:p-32 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none">
                            <h2 className="text-[50vw] font-display uppercase leading-none rotate-90 origin-top-right text-white">MANIFESTO</h2>
                        </div>
                        <h2 className="text-[14vw] font-display uppercase leading-none text-[#CCFF00] mb-24 tracking-tighter z-10">Манифест</h2>
                        <div className="bg-[#FF00FF] text-white p-12 md:p-20 mb-24 border-l-[30px] border-white max-w-6xl shadow-2xl z-10">
                             <p className="text-4xl md:text-6xl font-bold uppercase leading-[1.05] italic tracking-tighter">
                                «Этот журнал разрабатывался в качестве дипломного проекта. Тем не менее, мы чётко понимаем его цель и задачу.»
                             </p>
                        </div>
                        <div className="max-w-5xl z-10">
                            <p className="text-3xl md:text-5xl font-serif italic mb-16 opacity-90 leading-tight">
                                Наша родина бескрайняя и многослойная. Мы приоткрываем пласт казахстанского андеграунда, чтобы показать вам то, что остается незамеченным.
                            </p>
                            <p className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest opacity-60 leading-relaxed mb-32">
                                Облик города — это не только архитектура, но и люди, идеи, скрытые смыслы. OBLIQUE — это попытка зафиксировать этот неуловимый вайб здесь и сейчас.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-[12px] uppercase font-bold tracking-[0.4em] pt-32 border-t-2 border-white/20 z-10 text-left">
                            <div className="p-10 border-4 border-white/10 hover:bg-white hover:text-black transition-all group">
                                <span className="opacity-40 block mb-6 uppercase tracking-widest">Главный редактор</span>
                                <span className="text-2xl md:text-4xl font-display">Эльвира Иванникова</span>
                            </div>
                            <div className="p-10 border-4 border-white/10 hover:bg-white hover:text-black transition-all group">
                                <span className="opacity-40 block mb-6 uppercase tracking-widest">Дизайн / Шеф-ред</span>
                                <span className="text-2xl md:text-4xl font-display">Ева Головинцева</span>
                            </div>
                        </div>
                    </section>
                )}

                {page === 'shop' && (
                    <section className="p-10 md:p-24 bg-white min-h-screen">
                        <div className="flex justify-between items-baseline mb-24 border-b-8 border-black pb-8 text-black">
                            <h2 className="text-[12vw] font-display uppercase tracking-tighter leading-none">Stockroom</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 border-8 border-black divide-x-8 divide-black shadow-[30px_30px_0px_0px_#000]">
                            {[
                                { id: 1, name: "Oblique Issue #0.1", price: "5000 ₸", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800", cat: "PRINTED MEDIA" },
                                { id: 2, name: "Hoodie 'BETON'", price: "18000 ₸", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", cat: "APPAREL" },
                                { id: 3, name: "Tote Bag 'OBLIQUE'", price: "8000 ₸", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", cat: "ACCESSORIES" }
                            ].map((item) => (
                                <div key={item.id} className="p-12 group hover:bg-[#CCFF00] transition-all duration-500 flex flex-col justify-between bg-white relative">
                                    <div className="aspect-square mb-12 bg-[#F4F4F0] border-4 border-black overflow-hidden relative shadow-2xl">
                                        <div className="absolute top-6 left-6 bg-black text-white px-3 py-1.5 text-[10px] font-bold z-10 uppercase tracking-widest">{item.cat}</div>
                                        <img src={item.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-1000" alt="" />
                                    </div>
                                    <div className="text-black">
                                        <div className="flex justify-between items-end border-t-8 border-black pt-10">
                                            <div className="text-left">
                                                <h3 className="text-4xl md:text-5xl font-display uppercase leading-none mb-4 tracking-tighter">{item.name}</h3>
                                                <p className="text-2xl font-black text-[#0033FF] tracking-tight">{item.price}</p>
                                            </div>
                                            <button onClick={() => setCartCount(c => c + 1)} className="w-20 h-20 bg-black text-white flex items-center justify-center text-5xl hover:scale-110 transition-all shadow-brutal">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {page === 'archive' && (
                    <section className="p-10 md:p-24 bg-white min-h-screen text-black">
                        <h2 className="text-[12vw] font-display uppercase mb-24 tracking-tighter border-b-8 border-black pb-6 leading-none">Архив</h2>
                        <div className="space-y-6">
                            {articles.map((art: any, i: number) => (
                                <div key={art.id} onClick={() => openArt(art.id)} className="group border-b-4 border-black/10 py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-black hover:text-[#CCFF00] px-10 transition-all duration-300">
                                    <div className="flex items-center space-x-16">
                                        <span className="font-display text-5xl md:text-8xl uppercase tracking-tighter">{art.title}</span>
                                    </div>
                                    <span className="text-sm font-bold uppercase mt-8 md:mt-0 opacity-50 tracking-[0.2em] italic">{art.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="p-12 md:p-24 border-t-8 border-black bg-white">
                <h3 className="text-[18vw] font-display leading-[0.6] mb-20 hover:text-[#FF00FF] cursor-pointer transition-colors tracking-tighter text-black" onClick={() => navigate('home')}>OBLIQUE</h3>
                <div className="flex flex-col md:flex-row justify-between items-end gap-16 font-bold text-[12px] uppercase tracking-[0.4em] opacity-40 pt-20 border-t-8 border-black text-black">
                    <p>© 2026 OBLIQUE MAGAZINE. ALMATY CITY, KZ.</p>
                </div>
            </footer>
        </div>
    );
}

// Псевдоним для Sanity Next.js
export { HomePage as default };
