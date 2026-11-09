import { DocumentContent } from '@/components/document-content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('updates');
export default function Page() { return <DocumentContent kind="updates" />; }
