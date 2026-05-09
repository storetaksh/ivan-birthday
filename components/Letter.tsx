import React, { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import RSVPForm from "./features/RSVPForm";

const PastelAnimations = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-pastel {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        .anim-float { animation: float-pastel 8s ease-in-out infinite; }
        .anim-float-delayed { animation: float-pastel 10s ease-in-out infinite 2s; }
    `}} />
);

const RainbowSVG = () => (
    <svg viewBox="0 0 100 50" className="w-32 h-16 opacity-80" fill="none" strokeWidth="6" strokeLinecap="round">
        <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#F1B6C1" />
        <path d="M 20 50 A 30 30 0 0 1 80 50" stroke="#FCE29F" />
        <path d="M 30 50 A 20 20 0 0 1 70 50" stroke="#B5D4F5" />
        <path d="M 40 50 A 10 10 0 0 1 60 50" stroke="#D3C1EB" />
    </svg>
);

const CloudAnimations = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-cloud {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(15px) translateY(-8px); }
            100% { transform: translateX(0) translateY(0); }
        }
        @keyframes float-cloud-reverse {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(-15px) translateY(12px); }
            100% { transform: translateX(0) translateY(0); }
        }
        @keyframes float-baby {
            0% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
            100% { transform: translateX(-50%) translateY(0); }
        }
        .anim-cloud-1 { animation: float-cloud 12s ease-in-out infinite; }
        .anim-cloud-2 { animation: float-cloud-reverse 15s ease-in-out infinite; }
        .anim-baby { animation: float-baby 6s ease-in-out infinite; }
    `}} />
);

const Cloud = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 60" className={className} fill="currentColor">
        <path d="M 25 45 A 15 15 0 0 1 25 15 A 20 20 0 0 1 60 10 A 18 18 0 0 1 85 25 A 15 15 0 0 1 80 50 Z" />
    </svg>
);




const StarPattern = () => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-40">
        <defs>
            <pattern id="star" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path fill="#E6C27A" d="M10,2 L12,8 L18,8 L13,12 L15,18 L10,14 L5,18 L7,12 L2,8 L8,8 Z" transform="scale(0.5)" />
                <path fill="#E6C27A" d="M10,2 L12,8 L18,8 L13,12 L15,18 L10,14 L5,18 L7,12 L2,8 L8,8 Z" transform="translate(50, 50) scale(0.3)" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star)" />
    </svg>
);

export default function Letter({ isOpen, onClose, className, eventData }: { isOpen: boolean, onClose?: () => void, className?: string, eventData?: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUnfolded, setIsUnfolded] = useState(false);

    const totalSections = 4;

    // Baby Shower Theme configuration
    const t = {
        bg: 'bg-[#FDF9F1]',
        textMain: 'text-stone-800',
        textMuted: 'text-stone-600',
        textLight: 'text-stone-500',
        textAccent: 'text-[#1A1A1A]', // Black cursive text
        border: 'border-[#D3C1EB]/40',
        btnSolid: 'bg-linear-to-r from-[#D3C1EB] to-[#B5D4F5] text-stone-700 hover:opacity-90 font-sans tracking-normal',
        btnOutline: 'border-[#B5D4F5] bg-transparent text-stone-700 hover:bg-[#B5D4F5]/10',
        card: 'border-white/50 bg-white/40 backdrop-blur-sm',
        lineBreak: 'hidden',
        sealOrbit: 'fill-stone-500',
        navBtnBg: 'bg-white/80 border-[#B5D4F5]/50 hover:bg-white',
        navBtnText: 'text-stone-600',
        navBtnIcon: 'text-[#B5D4F5]',
    };

    const babyName = eventData?.baby?.name || 'Leo';

    const generateCalendarLink = (celebration: any) => {
        if (!celebration) return "#";
        const title = encodeURIComponent(`${babyName}'s 1st Birthday`);
        const details = encodeURIComponent("We are so excited to celebrate with you!");
        const location = encodeURIComponent(celebration.venue || "");

        let dates = "";
        try {
            // Manual parsing to avoid Server UTC timezone hydration mismatches
            const dStr = celebration.date; // "May 6, 2026"
            const tStr = celebration.time; // "01:00 PM"
            const months: Record<string, string> = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };

            const mMatch = dStr.match(/([a-zA-Z]+) (\d+), (\d+)/);
            const tMatch = tStr.match(/(\d+):(\d+)\s*(AM|PM)/i);

            if (mMatch && tMatch) {
                const month = months[mMatch[1].substring(0, 3)] || "05";
                const day = mMatch[2].padStart(2, '0');
                const year = mMatch[3];

                let hour12 = parseInt(tMatch[1], 10);
                const min = tMatch[2];
                const ampm = tMatch[3].toUpperCase();

                if (ampm === "PM" && hour12 < 12) hour12 += 12;
                if (ampm === "AM" && hour12 === 12) hour12 = 0;

                const startHour = hour12.toString().padStart(2, '0');
                const endHour = ((hour12 + 4) % 24).toString().padStart(2, '0');

                // Format: 20260506T130000 (No Z character, meaning it is local to ctz)
                const dateStrStart = `${year}${month}${day}T${startHour}${min}00`;
                const dateStrEnd = `${year}${month}${day}T${endHour}${min}00`;

                dates = `&dates=${dateStrStart}/${dateStrEnd}&ctz=Asia/Kolkata`;
            }
        } catch (e) { }

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}${dates}&details=${details}&location=${location}`;
    };

    // Wait for the envelope to physically open before showing the first text
    useEffect(() => {
        if (isOpen) {
            // Reset physical scroll position while out of sight before sliding up
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            // 1200ms matches the envelope opening transition
            const timer = setTimeout(() => setIsUnfolded(true), 1200);
            return () => clearTimeout(timer);
        } else {
            setIsUnfolded(false);
            setActiveIndex(0); // Reset scroll on close
        }
    }, [isOpen]);

    // Track scroll position to determine which section to show
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, clientHeight } = scrollContainerRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    // Auto-scroll to the next section
    const scrollToNext = () => {
        if (!scrollContainerRef.current) return;
        const nextIndex = activeIndex + 1;
        if (nextIndex < totalSections) {
            scrollContainerRef.current.scrollTo({
                top: nextIndex * scrollContainerRef.current.clientHeight,
                behavior: "smooth"
            });
        }
    };

    return (
        <div
            className={`origin-bottom flex flex-col transition-all duration-1500 ease-[cubic-bezier(0.2,0.8,0.3,1)] ${className} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
                transform: `translateY(${isOpen ? "0%" : "100%"})`,
                width: "100%",
                zIndex: isOpen ? 40 : 10,
                transitionDelay: isOpen ? '300ms' : '0ms'
            }}
        >
            <CloudAnimations />

            {/* POP-OUT BABY */}
            <div className={`absolute left-0 right-0 top-0 h-0 pointer-events-none z-50 transition-all duration-1500 ease-[cubic-bezier(0.2,0.8,0.3,1)] origin-bottom ${isOpen ? 'scale-100 opacity-100 delay-500' : 'scale-50 opacity-0'}`}>
                {/* Baby Image */}
                <div className="absolute top-[-40px] md:top-[-70px] left-1/2 -translate-x-1/2 w-52 h-52 md:w-72 md:h-72 z-30 drop-shadow-2xl">
                    <img src="/assets/images/baby.png" alt="Baby" className="w-full h-full object-contain object-bottom pointer-events-auto" />
                </div>
            </div>

            {/* EDGE CLOUDS (Attached to letter, sliding naturally) */}
            <div className="absolute inset-0 pointer-events-none z-40">
                {/* Left Cloud */}
                <div className="absolute top-[120px] -left-6 md:-left-20 w-28 h-16 md:w-52 md:h-40 text-[#B5D4F5] anim-cloud-1 drop-shadow-lg opacity-90">
                    <Cloud className="w-full h-full" />
                </div>

                {/* Right Cloud */}
                <div className="absolute top-[65px] -right-8 md:-right-24 w-32 h-20 md:w-60 md:h-44 text-[#D3C1EB] anim-cloud-2 drop-shadow-xl opacity-90">
                    <Cloud className="w-full h-full" />
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={`w-full relative shadow-2xl rounded-sm overflow-x-hidden snap-y snap-mandatory scroll-smooth ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'} ${t.bg}`}
                style={{ height: "90dvh" }}
            >
                {/* STATIC BACKGROUND & FRAME EXPERIMENT */}
                <div className={`sticky top-0 left-0 w-full h-[90dvh] z-0 pointer-events-none overflow-hidden ${t.bg}`}>
                    <StarPattern />
                    <PastelAnimations />

                    {/* Rainbows */}
                    <div className="absolute top-[15%] -left-8 opacity-80 rotate-[15deg]">
                        <RainbowSVG />
                    </div>
                    <div className="absolute bottom-[20%] -right-8 opacity-80 -rotate-[20deg]">
                        <RainbowSVG />
                    </div>

                    {/* Pastel Clouds scattered */}
                    <div className="absolute top-[25%] right-4 w-24 h-16 text-[#B5D4F5] opacity-60 anim-float">
                        <Cloud className="w-full h-full" />
                    </div>
                    <div className="absolute top-[45%] left-2 w-32 h-20 text-[#D3C1EB] opacity-60 anim-float-delayed">
                        <Cloud className="w-full h-full" />
                    </div>
                    <div className="absolute bottom-[30%] left-8 w-20 h-12 text-[#FCE29F] opacity-70 anim-float">
                        <Cloud className="w-full h-full" />
                    </div>
                    <div className="absolute bottom-[10%] right-12 w-28 h-16 text-[#F1B6C1] opacity-60 anim-float-delayed">
                        <Cloud className="w-full h-full" />
                    </div>
                </div>

                {/* FIXED CONTENT WRAPPER */}
                <div className="sticky top-0 left-0 w-full h-[90dvh] z-10 flex flex-col items-center justify-center p-6 md:p-8 -mt-[90dvh]">

                    {/* SECTION 0: THE INTRO */}
                    <div className={`absolute inset-0 pt-32 md:pt-16 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out 
                        ${activeIndex === 0
                            ? (isUnfolded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none")
                            : "opacity-0 -translate-y-8 pointer-events-none"}`}
                    >
                        <h1 className={`font-script text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 drop-shadow-sm ${t.textAccent}`}>
                            {eventData?.eventType === "1st Birthday" ? (
                                <>Look Who's<br />Turning One!</>
                            ) : (
                                <>A Little One<br />is on the Way!</>
                            )}
                        </h1>
                        <p className={`font-sans tracking-wide text-sm md:text-base leading-relaxed max-w-[280px] md:max-w-sm ${t.textMain}`}>
                            {eventData?.messages?.inviteText || 
                                `Join ${eventData?.baby?.parents?.mother || "Sarah"} & ${eventData?.baby?.parents?.father || "Michael"} to celebrate the impending arrival of their little joy, baby ${babyName}!`}
                        </p>
                    </div>

                    {/* SECTION 1: THE DETAILS */}
                    <div className={`absolute inset-0 pt-10 pb-16 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${activeIndex === 1 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <p className={`font-script text-4xl md:text-5xl mb-4 ${t.textAccent}`}>When & Where</p>
                        <p className={`font-sans font-light text-xs md:text-sm tracking-wide max-w-xs mb-6 ${t.textMuted}`}>
                            We cannot wait to share this beautiful evening with our closest friends and family.
                        </p>

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`font-sans tracking-wide text-sm md:text-base ${t.textMain}`}>
                                    <span>{eventData?.celebrations?.[0]?.date || "Saturday, September 14th"}</span><br />
                                    <span>at {eventData?.celebrations?.[0]?.time || "2:00 PM"}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`font-sans tracking-wide text-sm md:text-base ${t.textMain}`}>
                                    <span>{eventData?.celebrations?.[0]?.venue || "123 Maple Drive, Anytown, CA"}</span>
                                </div>
                                <a
                                    href={generateCalendarLink(eventData?.celebrations?.[0])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-3 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${t.btnSolid} hover:scale-105`}
                                >
                                    Tap to Add to Calendar
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 mt-2">
                                <div className={`font-sans tracking-wide text-sm md:text-base ${t.textMain}`}>
                                    <span>RSVP by August 31st to</span><br />
                                    <span>Sarah at 555-0100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: THE CELEBRATION DETAILS */}
                    <div className={`absolute inset-0 pt-10 pb-16 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 2 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <p className={`font-script text-4xl md:text-5xl mb-4 ${t.textAccent}`}>The Celebration</p>

                        {/* Removed engagement rings image */}

                        <div className={`p-4 w-full max-w-sm rounded-sm ${t.card}`}>
                            <div className="mb-3">
                                <h4 className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] mb-1 ${t.textMain}`}>Dress Code</h4>
                                <p className={`font-serif text-xs md:text-sm ${t.textMuted}`}>{eventData?.celebrations?.[0]?.dressCode || "Black-Tie Optional"}</p>
                            </div>

                            <div className={`w-8 h-px mx-auto mb-3 ${t.border} border-t`}></div>

                            <div>
                                <h4 className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] mb-1.5 ${t.textMain}`}>Your Presence</h4>
                                <p className={`font-sans font-light text-[10px] md:text-sm leading-relaxed ${t.textLight}`}>
                                    Please bless us with your presence as we celebrate this beautiful new beginning. We look forward to sharing our joy with you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: CONTACT & SIGN OFF */}
                    <div className={`absolute inset-0 pt-16 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 3 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <h2 className={`font-script text-5xl md:text-6xl mb-6 drop-shadow-sm ${t.textAccent}`}>Reach Out</h2>
                        <p className={`font-sans font-light text-xs md:text-base tracking-wide leading-relaxed max-w-[280px] md:max-w-xs mb-8 ${t.textMuted}`}>
                            For any queries regarding the celebrations or venue directions, please feel free to reach out to us.
                        </p>

                        <div className={`p-6 w-full max-w-sm rounded-sm ${t.card} mb-8`}>
                            <h4 className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] mb-5 ${t.textMain}`}>Contact Details</h4>

                            {eventData?.contact?.phone ? (
                                <div className="space-y-5">
                                    {eventData.contact.phone.map((ph: any, i: number) => (
                                        <div key={i} className={`font-serif text-sm tracking-widest ${t.textMuted}`}>
                                            <span className={`font-sans font-bold ${t.textMain} text-[10px] md:text-xs tracking-wider uppercase`}>{ph.name}</span><br />
                                            <a href={`tel:${ph.number}`} className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity mt-1 inline-block">
                                                {ph.number}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`font-serif text-sm tracking-widest ${t.textMuted}`}>
                                    <span className={`font-sans font-bold ${t.textMain} text-[10px] tracking-wider uppercase`}>Joseph</span><br />
                                    <a href="tel:+919876543210" className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity mt-1 inline-block">
                                        +91 9876543210
                                    </a>
                                </div>
                            )}
                        </div>

                        <h3 className={`font-script text-5xl md:text-6xl mt-4 ${t.textMain}`}>See you there</h3>

                        {/* HALF SEAL FOR CLOSING */}
                        <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 z-50">
                            <button
                                onClick={onClose}
                                className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full group cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                            >
                                {/* Minimal Royal Aura */}

                                <div className="absolute inset-x-[-5%] inset-y-[-5%] -z-10 bg-[#BF953F] rounded-full mix-blend-screen animate-royal-glow" />

                                <div className="absolute inset-[-30px] md:inset-[-40px] -z-10 border border-[#BF953F]/20 rounded-full pointer-events-none" />

                                <img
                                    src="/assets/images/seal.png"
                                    alt="Close Envelope"
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-md z-10 relative"
                                />

                                {/* Circular Instruction Text */}
                                <div className="absolute inset-[-25px] md:inset-[-30px] z-0 pointer-events-none transition-opacity duration-1000 opacity-70 group-hover:opacity-100">
                                    <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow origin-center overflow-visible">
                                        <path
                                            id="closeCirclePath"
                                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                                            fill="none"
                                        />
                                        <text className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] pointer-events-none ${t.sealOrbit}`}>
                                            <textPath href="#closeCirclePath" startOffset="25%" textAnchor="middle">
                                                • Press here to reset •
                                            </textPath>
                                            <textPath href="#closeCirclePath" startOffset="75%" textAnchor="middle">
                                                • Press here to reset •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* NAVIGATION BUTTON */}
                    {isOpen && (
                        <div className="absolute bottom-8 left-0 w-full z-50 flex justify-center pointer-events-none">
                            <div className={`transition-all duration-700 flex flex-col items-center ${activeIndex === totalSections - 1 || !isUnfolded ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
                                <button
                                    onClick={scrollToNext}
                                    className={`flex flex-col items-center justify-center gap-2 group backdrop-blur-md px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 ${t.navBtnBg} cursor-pointer select-none mb-2`}
                                    style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                                >
                                    <span className={`text-xs uppercase tracking-[0.2em] font-bold ${t.navBtnText} pointer-events-none`}>
                                        {activeIndex === 0 ? "Tap to Read" : "Tap for More"}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 animate-bounce ${t.navBtnIcon} pointer-events-none`} strokeWidth={2.5} />
                                </button>
                                <span className={`text-[7px] md:text-[9px] uppercase font-sans tracking-[0.2em] opacity-80 ${t.textMuted} pointer-events-none`}>
                                    Or swipe to explore
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* SCROLL TRACKS */}
                <div className="w-full -mt-[90dvh] pointer-events-none">
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                </div>

            </div>
        </div>
    );
}