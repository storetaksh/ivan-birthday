import { ImageResponse } from 'next/og';
import eventData from '@/util/data/event-data.json';

export const alt = `${eventData.baby?.name || 'Baby'}'s ${eventData.eventType || 'Birthday'} Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const name = eventData.baby?.name || 'Baby';
  const eventType = eventData.eventType || '1st Birthday';
  const baseUrl = eventData.websiteUrl.endsWith('/') ? eventData.websiteUrl.slice(0, -1) : eventData.websiteUrl;

  // Grab the first image from eventData if available, otherwise use a default
  let imgUrl = `${baseUrl}/assets/images/baby.png`;
  if (eventData.sectionImages && eventData.sectionImages.length > 0) {
    imgUrl = `${baseUrl}${eventData.sectionImages[0]}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#FDF9F1', // t.bg equivalent
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
      >
        {/* Text Area at the Top */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: '80px',
        }}>
          <h1 style={{ 
            fontSize: 90, 
            color: '#1A1A1A', 
            margin: 0, 
            textAlign: 'center',
            fontFamily: 'serif',
            fontStyle: 'italic'
          }}>
            {eventType === "1st Birthday" ? "Look Who's Turning One!" : `${name}'s ${eventType}`}
          </h1>
          <p style={{ 
            fontSize: 45, 
            color: '#57534e', // text-stone-600
            marginTop: '20px',
            fontFamily: 'sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Celebrate with {name}
          </p>
        </div>

        {/* Envelope / Image Area */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
           <img 
              src={imgUrl} 
              width={450} 
              height={450} 
              style={{ 
                  objectFit: 'contain',
                  zIndex: 10
              }} 
           />
           {/* Decorative Envelope Backing */}
           <div style={{
              position: 'absolute',
              bottom: 0,
              width: '120%',
              height: '250px',
              backgroundColor: '#eaddcc',
              borderTopLeftRadius: '50%',
              borderTopRightRadius: '50%',
              zIndex: 1,
              borderTop: '4px solid rgba(0,0,0,0.05)',
           }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
