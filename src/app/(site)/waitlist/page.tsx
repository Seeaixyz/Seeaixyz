import { WaitlistContent } from '@/components/document-content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('waitlist');
export default function Page() { return <WaitlistContent />; }
