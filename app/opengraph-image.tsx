import { ImageResponse } from 'next/og';
import eventData from '@/util/data/event-data.json';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GoldStar = ({ size = 24, left, top, opacity = 1 }: { size?: number, left: string | number, top: string | number, opacity?: number }) => (
  <svg
    viewBox="0 0 24 24"
    style={{
      position: 'absolute',
      left,
      top,
      width: size,
      height: size,
      opacity,
      display: 'flex',
    }}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D0AE63" />
  </svg>
);

const Cloud = ({ width = 200, left, top, color = '#FFFFFF', transform = '' }: { width?: number, left: string | number, top: string | number, color?: string, transform?: string }) => (
  <svg
    viewBox="0 0 100 60"
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: width * 0.6,
      fill: color,
      transform,
      display: 'flex',
    }}
  >
    <path d="M 25 45 A 15 15 0 0 1 25 15 A 20 20 0 0 1 60 10 A 18 18 0 0 1 85 25 A 15 15 0 0 1 80 50 Z" />
  </svg>
);

export default async function Image() {
  const name = eventData.baby?.name || 'Baby';
  const eventType = eventData.eventType || '1st Birthday';

  const titleText = eventType === "1st Birthday"
    ? `${name}'s 1st Birthday`
    : (eventType || 'Baby Shower');

  const subText = eventType === "1st Birthday"
    ? "YOU'RE INVITED TO CELEBRATE"
    : "YOU'RE INVITED TO A";

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#C1E8D5', // Mint Green Base
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Radial Pattern Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
          backgroundSize: '24px 24px',
          opacity: 0.3,
          display: 'flex',
        }} />

        {/* Top Purple Clouds (Background Layer) */}
        <Cloud left="5%" top="-5%" width={450} color="#EBE0F4" transform="rotate(180deg)" />
        <Cloud left="40%" top="-8%" width={500} color="#EBE0F4" transform="rotate(175deg)" />
        <Cloud left="75%" top="-2%" width={400} color="#EBE0F4" transform="rotate(185deg)" />

        {/* Top White Clouds (Foreground Layer) */}
        <Cloud left="-10%" top="-15%" width={400} color="#FFFFFF" transform="rotate(180deg)" />
        <Cloud left="25%" top="-12%" width={450} color="#FFFFFF" transform="rotate(178deg)" />
        <Cloud left="65%" top="-18%" width={500} color="#FFFFFF" transform="rotate(182deg)" />

        {/* Scattered Stars - Replicating your UI positions */}
        <GoldStar left="10%" top="15%" size={32} opacity={1} />
        <GoldStar left="25%" top="8%" size={24} opacity={0.8} />
        <GoldStar left="80%" top="12%" size={28} opacity={0.9} />
        <GoldStar left="92%" top="5%" size={35} opacity={1} />

        {/* Bottom Clouds (Flipped) */}
        <Cloud left="0%" top="85%" width={450} color="#EBE0F4" />
        <Cloud left="45%" top="82%" width={550} color="#EBE0F4" />
        <Cloud left="10%" top="90%" width={400} color="#FFFFFF" />
        <Cloud left="60%" top="88%" width={500} color="#FFFFFF" />

        {/* Content Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          marginTop: '-50px', // Center text visually above where the envelope would be
        }}>
          <p style={{
            fontSize: 28,
            color: '#A67C00',
            margin: 0,
            fontFamily: 'sans-serif',
            letterSpacing: '6px',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            {subText}
          </p>
          <h1 style={{
            fontSize: 85,
            color: '#C69C54',
            margin: 0,
            textAlign: 'center',
            fontFamily: 'serif',
            fontStyle: 'italic',
            letterSpacing: '1px',
          }}>
            {titleText}
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}