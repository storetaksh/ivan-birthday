import { ImageResponse } from 'next/og';
import eventData from '@/util/data/event-data.json';

export const alt = `${eventData.baby?.name || 'Baby'}'s ${eventData.eventType || 'Birthday'} Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const Star = ({ size = 24, left, top, opacity = 1 }: { size?: number, left: string | number, top: string | number, opacity?: number }) => (
  <svg
    viewBox="0 0 24 24"
    style={{
      position: 'absolute',
      left,
      top,
      width: size,
      height: size,
      opacity,
      fill: '#D0AE63',
    }}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
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
    }}
  >
    <path d="M 25 45 A 15 15 0 0 1 25 15 A 20 20 0 0 1 60 10 A 18 18 0 0 1 85 25 A 15 15 0 0 1 80 50 Z" />
  </svg>
);

export default async function Image() {
  const name = eventData.baby?.name || 'Baby';
  const eventType = eventData.eventType || '1st Birthday';
  const titleText = eventType === "1st Birthday" ? `${name}'s 1st Birthday` : (eventType || 'Baby Shower');
  const subText = eventType === "1st Birthday" ? "YOU'RE INVITED TO CELEBRATE" : "YOU'RE INVITED TO A";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Stars */}
        <Star left="10%" top="15%" size={40} opacity={0.8} />
        <Star left="85%" top="20%" size={50} opacity={0.6} />
        <Star left="20%" top="75%" size={35} opacity={0.9} />
        <Star left="75%" top="80%" size={45} opacity={0.7} />
        <Star left="5%" top="50%" size={30} opacity={0.5} />
        <Star left="90%" top="60%" size={25} opacity={0.8} />
        <Star left="50%" top="10%" size={30} opacity={0.6} />
        <Star left="60%" top="85%" size={40} opacity={0.4} />

        {/* Purple Clouds Background */}
        <Cloud left="-5%" top="-15%" width={400} color="#EBE0F4" transform="rotate(180deg)" />
        <Cloud left="40%" top="-20%" width={500} color="#EBE0F4" transform="rotate(175deg)" />
        <Cloud left="80%" top="-10%" width={350} color="#EBE0F4" transform="rotate(185deg)" />
        
        <Cloud left="-10%" top="85%" width={450} color="#EBE0F4" />
        <Cloud left="35%" top="80%" width={600} color="#EBE0F4" />
        <Cloud left="75%" top="90%" width={400} color="#EBE0F4" />

        {/* White Clouds Foreground */}
        <Cloud left="10%" top="-20%" width={350} color="#FFFFFF" transform="rotate(180deg)" />
        <Cloud left="55%" top="-15%" width={400} color="#FFFFFF" transform="rotate(178deg)" />
        <Cloud left="95%" top="-25%" width={300} color="#FFFFFF" transform="rotate(182deg)" />
        
        <Cloud left="5%" top="90%" width={400} color="#FFFFFF" />
        <Cloud left="50%" top="85%" width={500} color="#FFFFFF" />
        <Cloud left="85%" top="95%" width={350} color="#FFFFFF" />

        {/* Text Area */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <p style={{ 
            fontSize: 32, 
            color: '#A67C00', 
            margin: 0, 
            textAlign: 'center',
            fontFamily: 'sans-serif',
            letterSpacing: '8px',
            fontWeight: 800,
            marginBottom: '20px'
          }}>
            {subText}
          </p>
          <h1 style={{ 
            fontSize: 100, 
            color: '#C69C54', 
            margin: 0, 
            textAlign: 'center',
            fontFamily: 'serif',
            fontStyle: 'italic',
            letterSpacing: '2px',
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
