import type { Metadata } from 'next';

// Access-blocked page. The Edge Middleware rewrites flagged (VPN / proxy /
// datacenter) visitors here with status 200. It deliberately has NO site
// chrome (no top bar, no menu, no footer, no logo, no analytics, no scripts,
// no links back to the site) — it is a hard block, not a site page, and there
// is nothing on it for a bot to click through or bypass. Inline styles only,
// so the site theme from globals.css cannot bleed into it. English only.
export const metadata: Metadata = {
  title: 'Access Blocked',
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
        background: '#000000',
        color: '#e4e4e7',
        font: '16px/1.7 system-ui, -apple-system, sans-serif',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 20 }}>😈</div>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 14px',
          }}
        >
          Access Blocked
        </h1>
        <p style={{ margin: '0 0 14px', color: '#d4d4d8' }}>
          This site is protected. Any datacenter IP address will be blocked
          permanently for security.
        </p>
        <p style={{ margin: 0, color: '#a1a1aa' }}>
          To access this site, close your VPN, or open it from a residential
          IP address, or use a personal computer.
        </p>
      </div>
    </div>
  );
}
