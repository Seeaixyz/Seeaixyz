import type { Metadata } from 'next';
import ChatPageBody from '@/components/ChatPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Chat | See Image AI',
  description:
    'Chat — See Image: text to image and image to image in one chat.',
  path: '/chat',
  jsonLdName: 'Chat | See Image AI',
});

export default function ChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('Chat | See Image AI', 'https://seeai.xyz/chat'),
          ),
        }}
      />
      <ChatPageBody />
    </>
  );
}
