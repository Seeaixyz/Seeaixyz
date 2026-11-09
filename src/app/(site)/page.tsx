import { HomeContent } from '@/components/home-content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('index');
export default function Page() { return <HomeContent />; }
