import type { Metadata } from 'next';

// Plain unbranded "site unavailable" page. It deliberately has NO site
// chrome (no top bar, no menu, no footer, no analytics, no scripts) — the
// Edge Middleware rewrites flagged (VPN/proxy) visitors here with status 200
// so they think the site is down. Inline styles only, so the dark site theme
// from globals.css cannot bleed into it.
export const metadata: Metadata = {
  title: 'Website unavailable',
  robots: { index: false, follow: false },
};

export default function DecoyPage() {
  return (
    <div
      style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f4f5',
        color: '#3f3f46',
        font: '16px/1.6 system-ui, sans-serif',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div>
        <h1 style={{ fontSize: 22, color: '#18181b', margin: '0 0 8px' }}>
          This website is currently unavailable.
        </h1>
        <p style={{ margin: 0 }}>
          We are working on the issue. Please try again later.
        </p>
        <br />
        <code style={{ fontSize: 13, color: '#71717a' }}>
          ERR_503 · ref 7f3a-91c2
        </code>
      </div>
    </div>
  );
}
