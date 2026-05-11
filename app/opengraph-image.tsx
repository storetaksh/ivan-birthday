import { ImageResponse } from 'next/og';
import eventData from '@/util/data/event-data.json';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// SVG components with direct fills to prevent black shapes
const GoldStar = ({ size = 24, left, top }: any) => (
  <svg viewBox="0 0 24 24" style={{ position: 'absolute', left, top, width: size, height: size, display: 'flex' }}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D0AE63" />
  </svg>
);

const Cloud = ({ width = 200, left, top, color = '#FFFFFF', transform = '' }: any) => (
  <svg viewBox="0 0 100 60" style={{ position: 'absolute', left, top, width, height: width * 0.6, transform, display: 'flex' }}>
    <path fill={color} d="M 25 45 A 15 15 0 0 1 25 15 A 20 20 0 0 1 60 10 A 18 18 0 0 1 85 25 A 15 15 0 0 1 80 50 Z" />
  </svg>
);

export default async function Image() {
  // 1. Load Fonts as ArrayBuffers
  const [greatVibesData, montserratData] = await Promise.all([
    fetch(new URL('https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf')).then(res => res.arrayBuffer()),
    fetch(new URL('https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat-Bold.ttf')).then(res => res.arrayBuffer()),
  ]);

  const name = eventData.baby?.name || 'Baby';
  const eventType = eventData.eventType || '1st Birthday';
  const titleText = eventType === "1st Birthday" ? `${name}'s 1st Birthday` : (eventType || 'Baby Shower');
  const subText = eventType === "1st Birthday" ? "YOU'RE INVITED TO CELEBRATE" : "YOU'RE INVITED TO A";

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
          backgroundColor: '#C1E8D5',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '24px 24px', opacity: 0.3, display: 'flex' }} />

        {/* Clouds - Z-index 1 (Background) */}
        <div style={{ display: 'flex', position: 'absolute', inset: 0, zIndex: 1 }}>
          <Cloud left="5%" top="-10%" width={400} color="#EBE0F4" transform="rotate(180deg)" />
          <Cloud left="55%" top="-12%" width={500} color="#EBE0F4" transform="rotate(175deg)" />
          <Cloud left="-5%" top="-15%" width={450} color="#FFFFFF" transform="rotate(180deg)" />
          <Cloud left="35%" top="-20%" width={480} color="#FFFFFF" transform="rotate(178deg)" />
          <Cloud left="80%" top="-10%" width={350} color="#FFFFFF" transform="rotate(185deg)" />
        </div>

        {/* Stars */}
        <GoldStar left="10%" top="15%" size={32} />
        <GoldStar left="85%" top="12%" size={40} />
        <GoldStar left="20%" top="45%" size={20} />

        {/* Text Area - Z-index 10 (Foreground) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          position: 'relative',
          marginTop: '-40px'
        }}>
          {/* Montserrat Text */}
          <p style={{
            fontSize: 24,
            color: '#A67C00',
            margin: 0,
            fontFamily: 'Montserrat',
            fontWeight: 800,
            letterSpacing: '8px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {subText}
          </p>
          {/* Great Vibes Text */}
          <h1 style={{
            fontSize: 110,
            color: '#C69C54',
            margin: 0,
            textAlign: 'center',
            fontFamily: 'Great Vibes',
            fontWeight: 400,
            letterSpacing: '2px',
          }}>
            {titleText}
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Great Vibes',
          data: greatVibesData,
          style: 'normal',
        },
        {
          name: 'Montserrat',
          data: montserratData,
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );
}