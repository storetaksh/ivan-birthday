import InvitationExperience from "@/components/InvitationExperience";
import AudioPlayer from "@/components/features/AudioPlayer";
import eventData from "@/util/data/event-data.json";

export async function generateMetadata() {
  const baseUrl = eventData.websiteUrl.endsWith('/') ? eventData.websiteUrl.slice(0, -1) : eventData.websiteUrl;
  const imageUrl = `${baseUrl}/assets/images/social-share.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${eventData.baby?.name || 'Baby'}'s ${eventData.eventType || 'Birthday'}`,
    description: eventData.messages.inviteText,
    openGraph: {
      type: 'website',
      url: baseUrl,
      title: `${eventData.baby?.name || 'Baby'}'s ${eventData.eventType || 'Birthday'}`,
      description: eventData.messages.inviteText,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${eventData.eventType || 'Birthday'} Invitation map snippet`
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${eventData.baby?.name || 'Baby'}'s ${eventData.eventType || 'Birthday'} Invitation`,
      description: eventData.messages.inviteText,
      images: [imageUrl],
    }
  };
}

export const viewport = {
  themeColor: '#6B0D1E',
};

export default function Home() {
  return (
    <main className="w-full h-full overflow-hidden bg-black relative">
      <InvitationExperience eventData={eventData} />
      <AudioPlayer musicUrl="/assets/music/music.mp3" autoplay={true} />
    </main>
  );
}
