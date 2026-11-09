import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Website unavailable' },
  robots: { index: false, follow: false },
};

export default function DecoyPage() {
  return (
    <main lang="en" dir="ltr" style={{
      position: 'fixed', inset: 0, zIndex: 99999, overflow: 'auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100dvh', boxSizing: 'border-box', padding: 24,
      background: '#f4f4f5', color: '#3f3f46',
      font: '16px/1.6 system-ui, sans-serif', textAlign: 'center',
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: '#18181b', margin: '0 0 8px' }}>
          This website is currently unavailable.
        </h1>
        <p style={{ margin: 0 }}>We are working on the issue. Please try again later.</p>
        <p style={{ margin: '24px 0 0' }}>
          <code style={{ fontSize: 13, color: '#71717a' }}>ERR_503 · ref 7f3a-91c2</code>
        </p>
      </div>
    </main>
  );
}
