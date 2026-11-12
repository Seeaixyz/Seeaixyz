import type { Metadata } from 'next';
import AccountPageBody from '@/components/AccountPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Account | See Image AI',
  description: 'Account — See Image: your plan and usage.',
  path: '/account',
  jsonLdName: 'Account | See Image AI',
});

export default function AccountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('Account | See Image AI', 'https://seeai.xyz/account'),
          ),
        }}
      />
      <AccountPageBody />
    </>
  );
}
