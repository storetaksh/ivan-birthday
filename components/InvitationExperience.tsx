"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Letter from "./Letter";

const GoldStar = ({ className, style }: { className?: string, style?: any }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="#D0AE63">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const Cloud = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 60" className={className} style={style} fill="currentColor">
    <path d="M 25 45 A 15 15 0 0 1 25 15 A 20 20 0 0 1 60 10 A 18 18 0 0 1 85 25 A 15 15 0 0 1 80 50 Z" />
  </svg>
);

const generateClouds = (layer: 'white' | 'purple', isTop: boolean) => {
  const clouds = [];
  const bases = [-100, 25, 150, 275, 400, 525, 650, 775, 900, 1025, 1150, 1275, 1400, 1525, 1650, 1775, 1900, 2025, 2150, 2275];
  const widths = [240, 280, 220, 300, 250, 270, 230, 310, 260, 290, 220, 280, 250, 300, 240, 270, 230, 290, 260, 310];
  const rots = [0, -5, 5, -2, 2, -5, 0, 5, 0, -5, 2, -2, 0, 5, -5, 2, 0, -5, 5, -2];
  const tops = [-70, -80, -60, -75, -85, -65, -70, -80, -60, -75, -85, -65, -70, -80, -60, -75, -85, -65, -70, -80];

  for (let i = 0; i < 20; i++) {
    const offsetLeft = layer === 'purple' ? -40 : 0;
    const offsetTop = layer === 'purple' ? 25 : 0;
    const rot = isTop ? 180 + rots[i] : rots[i];

    clouds.push({
      id: `${layer}-${i}`,
      left: bases[i] + offsetLeft,
      w: widths[i],
      r: rot,
      t: tops[i] + offsetTop
    });
  }
  return clouds;
};

const topWhiteClouds = generateClouds('white', true);
const topPurpleClouds = generateClouds('purple', true);
const bottomWhiteClouds = generateClouds('white', false);
const bottomPurpleClouds = generateClouds('purple', false);

const CloudAnimations = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      @keyframes clouds-move-right {
        from { transform: translateX(0); }
        to { transform: translateX(2500px); }
      }
      .anim-clouds-bg {
        animation: clouds-move-right 100s linear infinite;
        will-change: transform;
      }
      .anim-clouds-fg {
        animation: clouds-move-right 60s linear infinite;
        will-change: transform;
      }
      @keyframes star-twinkle {
        0%, 100% { opacity: var(--max-op, 1); transform: scale(1) rotate(var(--star-rot, 0deg)); }
        50% { opacity: var(--min-op, 0.3); transform: scale(var(--min-scale, 0.5)) rotate(var(--star-rot, 0deg)); }
      }
      .anim-star {
        animation: star-twinkle var(--twinkle-dur, 4s) ease-in-out infinite;
        animation-delay: var(--twinkle-del, 0s);
      }
    `
  }} />
);

const TopCloudCluster = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2500px] h-[300px] pointer-events-none z-0 origin-top scale-[0.8] sm:scale-100">
    <div className="absolute inset-0 w-full h-full anim-clouds-bg">
      {topPurpleClouds.map(c => (
        <Cloud key={`bg1-${c.id}`} className="absolute text-[#EBE0F4] drop-shadow-md" style={{ left: c.left, top: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
      {topPurpleClouds.map(c => (
        <Cloud key={`bg2-${c.id}`} className="absolute text-[#EBE0F4] drop-shadow-md" style={{ left: c.left - 2500, top: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
    </div>
    <div className="absolute inset-0 w-full h-full anim-clouds-fg">
      {topWhiteClouds.map(c => (
        <Cloud key={`fg1-${c.id}`} className="absolute text-white drop-shadow-[0_8px_12px_rgba(0,0,0,0.06)]" style={{ left: c.left, top: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
      {topWhiteClouds.map(c => (
        <Cloud key={`fg2-${c.id}`} className="absolute text-white drop-shadow-[0_8px_12px_rgba(0,0,0,0.06)]" style={{ left: c.left - 2500, top: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
    </div>
  </div>
);

const BottomCloudCluster = () => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2500px] h-[300px] pointer-events-none z-0 origin-bottom scale-[0.8] sm:scale-100">
    <div className="absolute inset-0 w-full h-full anim-clouds-bg">
      {bottomPurpleClouds.map(c => (
        <Cloud key={`bg1-${c.id}`} className="absolute text-[#EBE0F4] drop-shadow-md" style={{ left: c.left, bottom: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
      {bottomPurpleClouds.map(c => (
        <Cloud key={`bg2-${c.id}`} className="absolute text-[#EBE0F4] drop-shadow-md" style={{ left: c.left - 2500, bottom: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
    </div>
    <div className="absolute inset-0 w-full h-full anim-clouds-fg">
      {bottomWhiteClouds.map(c => (
        <Cloud key={`fg1-${c.id}`} className="absolute text-white drop-shadow-[0_-8px_12px_rgba(0,0,0,0.06)]" style={{ left: c.left, bottom: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
      {bottomWhiteClouds.map(c => (
        <Cloud key={`fg2-${c.id}`} className="absolute text-white drop-shadow-[0_-8px_12px_rgba(0,0,0,0.06)]" style={{ left: c.left - 2500, bottom: c.t, width: c.w, transform: `rotate(${c.r}deg)` }} />
      ))}
    </div>
  </div>
);

export default function InvitationExperience({ eventData }: { eventData?: any }) {
  const [stage, setStage] = useState<"sealed" | "zoomed" | "opened" | "closing_letter" | "closing_flap">("sealed");
  const containerRef = useRef<HTMLDivElement>(null);

  const ZOOM_SCALE = 1.05;

  const handleSealClick = () => {
    if (stage === "sealed") {
      setStage("zoomed");
      // After zooming, automatically proceed to open after a delay
      setTimeout(() => {
        setStage("opened");
      }, 1500);
    }
  };

  const handleClose = () => {
    if (stage === "opened") {
      setStage("closing_letter");
      // Wait for letter to drop into envelope
      setTimeout(() => {
        setStage("closing_flap");
        // Wait for flap to close
        setTimeout(() => {
          setStage("sealed");
        }, 1500);
      }, 1500);
    }
  };

  const isZoomed = stage !== "sealed";
  const isFlapOpen = stage === "opened" || stage === "closing_letter";
  const areFoldsDown = stage === "opened" || stage === "closing_letter";
  const isLetterVisible = stage === "opened";
  const isSealHidden = stage === "opened" || stage === "closing_letter" || stage === "closing_flap";

  return (
    <>
      <div
        className="relative w-full h-dvh overflow-hidden bg-stone-900 select-none flex items-end justify-center"
        ref={containerRef}
      >
        {/* SCENIC FULL SCREEN BACKGROUND */}
        <div
          className="absolute inset-0 pointer-events-none origin-bottom overflow-hidden shadow-2xl transition-transform duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `scale(${isZoomed ? ZOOM_SCALE : 1}) translateY(${isLetterVisible ? "2%" : "0%"})`
          }}
        >
          {/* MINT GREEN BASE WITH SUBTLE PATTERN */}
          <div className="absolute inset-0 bg-[#C1E8D5]">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ffffff_2px,transparent_2px)] bg-size-[24px_24px]" />
          </div>

          {/* CLOUDS TOP */}
          <CloudAnimations />
          <TopCloudCluster />

          {/* CLOUDS BOTTOM */}
          <BottomCloudCluster />

          {/* SCATTERED STARS */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <GoldStar className="absolute top-[10%] left-[10%] w-6 h-6 anim-star" style={{ '--star-rot': '12deg', '--twinkle-dur': '4s', '--twinkle-del': '0s', '--max-op': 1 } as React.CSSProperties} />
            <GoldStar className="absolute top-[5%] left-[25%] w-4 h-4 anim-star" style={{ '--star-rot': '-6deg', '--twinkle-dur': '3s', '--twinkle-del': '1.5s', '--max-op': 0.8, '--min-op': 0.1, '--min-scale': 0.3 } as React.CSSProperties} />
            <GoldStar className="absolute top-[15%] right-[20%] w-5 h-5 anim-star" style={{ '--star-rot': '45deg', '--twinkle-dur': '5s', '--twinkle-del': '0.5s', '--max-op': 0.9, '--min-scale': 0.6 } as React.CSSProperties} />
            <GoldStar className="absolute top-[8%] right-[8%] w-7 h-7 anim-star" style={{ '--star-rot': '-12deg', '--twinkle-dur': '3.5s', '--twinkle-del': '2s', '--max-op': 1, '--min-op': 0.4, '--min-scale': 0.7 } as React.CSSProperties} />

            <GoldStar className="absolute bottom-[12%] left-[15%] w-5 h-5 anim-star" style={{ '--star-rot': '12deg', '--twinkle-dur': '4.5s', '--twinkle-del': '1s', '--max-op': 0.9, '--min-scale': 0.4 } as React.CSSProperties} />
            <GoldStar className="absolute bottom-[8%] left-[30%] w-6 h-6 anim-star" style={{ '--star-rot': '45deg', '--twinkle-dur': '3.2s', '--twinkle-del': '0.3s', '--max-op': 1, '--min-scale': 0.5 } as React.CSSProperties} />
            <GoldStar className="absolute bottom-[15%] right-[10%] w-6 h-6 anim-star" style={{ '--star-rot': '-12deg', '--twinkle-dur': '5.5s', '--twinkle-del': '2.5s', '--max-op': 0.85, '--min-scale': 0.6 } as React.CSSProperties} />
            <GoldStar className="absolute bottom-[5%] right-[25%] w-4 h-4 anim-star" style={{ '--star-rot': '12deg', '--twinkle-dur': '2.8s', '--twinkle-del': '1.2s', '--max-op': 0.8, '--min-op': 0.2, '--min-scale': 0.2 } as React.CSSProperties} />

            {/* Some extra stars in middle background */}
            <GoldStar className="absolute top-[35%] left-[5%] w-4 h-4 anim-star" style={{ '--star-rot': '45deg', '--twinkle-dur': '4s', '--twinkle-del': '0.8s', '--max-op': 0.6, '--min-op': 0.1, '--min-scale': 0.4 } as React.CSSProperties} />
            <GoldStar className="absolute top-[45%] right-[5%] w-5 h-5 anim-star" style={{ '--star-rot': '-12deg', '--twinkle-dur': '4.2s', '--twinkle-del': '1.8s', '--max-op': 0.6, '--min-op': 0.1, '--min-scale': 0.3 } as React.CSSProperties} />
          </div>

          {/* HEADER TEXT ABOVE ENVELOPE */}
          <div className="absolute top-[18dvh] md:top-[22dvh] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-2 text-center z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-2 transition-opacity duration-1000 ease-out">
              <h3 className="font-sans uppercase tracking-widest text-[#A67C00] text-sm md:text-base max-[400px]:text-[10px] font-bold">
                {eventData?.eventType === "1st Birthday" ? "You're Invited to celebrate" : "You're Invited to a"}
              </h3>
              <h2 className="font-script text-5xl md:text-7xl max-[400px]:text-4xl text-[#C69C54] drop-shadow-sm">
                {eventData?.eventType === "1st Birthday" ? `${eventData?.baby?.name}'s 1st Birthday` : (eventData?.eventType || 'Baby Shower')}
              </h2>
            </div>
          </div>
        </div>

        {/* ENVELOPE / SCENE CONTAINER */}
        <div
          className="relative z-10 w-full max-w-2xl px-4 pb-12 flex flex-col items-center justify-end origin-bottom transition-transform duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `scale(${isZoomed ? ZOOM_SCALE : 1}) translateY(${isZoomed ? "15%" : "0%"})`
          }}
        >
          {/* The Envelope */}
          <div className="relative w-full aspect-4/3 max-h-[60vh] mx-auto mt-auto perspective-1000">

            {/* Inner Envelope BG (Darker) */}
            <div
              className="absolute inset-x-0 bottom-0 top-[20%] bg-[#DED9D1] drop-shadow-inner border border-black/5 rounded-b-md transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${areFoldsDown ? "50vh" : "0%"})`,
                opacity: areFoldsDown ? 0 : 1,
                transitionDelay: stage === "opened" ? '1500ms' : '0ms'
              }}
            />

            {/* THE LETTER CLIP WRAPPER */}
            <div
              className="absolute inset-x-0 top-[20%] bottom-0 z-10 pointer-events-none"
              style={{ clipPath: "polygon(-50% -500%, 150% -500%, 150% 100%, -50% 100%)" }}
            >
              <Letter
                isOpen={stage === "opened"}
                onClose={handleClose}
                eventData={eventData}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>

            {/* LOWER ENVELOPE FOLDS (Front) -> Covers letter */}
            <div
              className="absolute inset-x-0 bottom-0 top-[20%] z-20 pointer-events-none transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${areFoldsDown ? "50vh" : "0%"})`,
                opacity: areFoldsDown ? 0 : 1,
                transitionDelay: stage === "opened" ? '1500ms' : '0ms'
              }}
            >
              <svg viewBox="0 0 800 500" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                  {/* Procedural paper texture filter */}
                  <filter id="paper-texture" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.98 0 0 0  0 0.94 0 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
                    <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
                  </filter>
                  <filter id="drop-shadow">
                    <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
                  </filter>
                </defs>
                {/* Left Flap */}
                <path d="M 0 0 L 35 60 L 360 230 Q 400 250 360 270 L 35 440 L 0 500 Z" fill="#F3EFE6" stroke="#E6E2D8" strokeWidth="2" filter="url(#paper-texture)" />
                {/* Right Flap */}
                <path d="M 800 0 L 765 60 L 440 230 Q 400 250 440 270 L 765 440 L 800 500 Z" fill="#F3EFE6" stroke="#E6E2D8" strokeWidth="2" filter="url(#paper-texture)" />
                {/* Bottom Flap */}
                <path d="M 0 500 L 35 440 L 350 250 Q 400 210 450 250 L 765 440 L 800 500 Z" fill="#F3EFE6" stroke="#E6E2D8" strokeWidth="2" filter="url(#paper-texture)" />
              </svg>
            </div>

            {/* TOP FLAP Z-INDEX LAYER - Switches slowly behind letter when open */}
            <div
              className="absolute inset-x-0 top-[20%] bottom-[20%] pointer-events-none"
              style={{
                zIndex: stage === "opened" ? 5 : 30, // 30 is above folds, 5 is below letter layer
              }}
            >
              {/* TOP FLAP Y-TRANSLATOR - Slides down after delay */}
              <div
                className="w-full h-full transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateY(${areFoldsDown ? "50vh" : "0%"})`,
                  opacity: areFoldsDown ? 0 : 1,
                  transitionDelay: stage === "opened" ? '1500ms' : '0ms'
                }}
              >
                {/* TOP FLAP ROTATOR - Flips open immediately */}
                <div
                  className="w-full h-full origin-top transition-transform duration-1200 ease-in-out"
                  style={{
                    transform: `rotateX(${isFlapOpen ? 180 : 0}deg)`
                  }}
                >
                  <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
                    <defs>
                      <filter id="paper-texture-top" x="0" y="0" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.98 0 0 0  0 0.94 0 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
                        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
                      </filter>
                    </defs>
                    {/* Updated path for curvature on the flap tip and corner cuts */}
                    <path d="M 0 0 L 35 60 L 350 270 Q 400 320 450 270 L 765 60 L 800 0 Z" fill="#FDFBF4" stroke="#E6E2D8" strokeWidth="2" filter="url(#paper-texture-top)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SEAL AND CALL TO ACTION OVERLAY */}
            <div
              className={`absolute left-1/2 top-[60%] z-40 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ease-out ${isSealHidden ? "opacity-0 scale-75 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-none"
                }`}
            >
              <button
                onClick={handleSealClick}
                className={`relative flex items-center justify-center cursor-pointer w-35 h-35 md:w-40 md:h-40 rounded-full group outline-none focus-visible:ring-4 focus-visible:ring-[#BF953F]/20 ${isSealHidden ? 'pointer-events-none' : 'pointer-events-auto'}`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Minimal Royal Aura */}
                {stage === "sealed" && (
                  <div className="absolute inset-x-[-15%] inset-y-[-15%] -z-10 bg-[#BF953F] rounded-full mix-blend-screen animate-royal-glow" />
                )}

                {/* Wax Seal Image Container */}
                <div className="w-full h-full relative z-10 overflow-hidden rounded-full transition-all duration-700 ease-out group-hover:scale-[1.03] group-active:scale-95 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <Image
                    src="/assets/images/seal.png"
                    alt="Wax Seal"
                    fill
                    sizes="(max-width: 768px) 120px, 144px"
                    className="object-contain drop-shadow-md pointer-events-none"
                    priority
                  />

                  {/* Ghostly Glint Effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent w-[50%] animate-glint" />
                  </div>
                </div>

                {/* Subtle outer gold ring */}
                {stage === "sealed" && (
                  <div className="absolute inset-0 -z-5 rounded-full border border-[#BF953F]/20 pointer-events-none transition-all duration-1000 scale-100" />
                )}
              </button>

              {/* Circular Instruction Text */}
              <div
                className={`absolute inset-0  z-0 pointer-events-none transition-opacity duration-1000 ${stage === "sealed" ? "opacity-100 delay-1000" : "opacity-0"
                  }`}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow origin-center overflow-visible">
                  <path
                    id="circlePath"
                    d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                    fill="none"
                  />
                  <text className="fill-[#C69C54] text-xs font-bold uppercase tracking-[0.2em] pointer-events-none">
                    <textPath href="#circlePath" startOffset="25%" textAnchor="middle">
                      • Tap to Open •
                    </textPath>
                    <textPath href="#circlePath" startOffset="75%" textAnchor="middle">
                      • Tap to Open •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}