'use client';

import { useEffect, useState } from 'react';
import { useLang } from './LangProvider';

// Client-side VPN / proxy check (backup layer; the real enforcement is the
// server-side Edge Middleware). Fail-open on any error.
const VPN_RE =
  /(vpn|proxy|datacenter|data center|hosting|vps|dedicated|servers?|cloudflare|fastly|digitalocean|ovh|hetzner|linode|vultr|m247|choopa|leaseweb|datacamp|blazing|nordvpn|expressvpn|surfshark|proton|cyberghost|ipvanish|windscribe|tunnelbear|private internet|vypr|purevpn|hidemyass)/i;

export default function VpnBlock() {
  const { t } = useLang();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('https://ipwho.is/', { cache: 'no-store' });
        if (!r.ok) return;
        const j = (await r.json()) as {
          connection?: { org?: string; isp?: string; domain?: string };
        };
        const org = [j.connection?.org, j.connection?.isp, j.connection?.domain]
          .filter(Boolean)
          .join(' ');
        if (org && VPN_RE.test(org) && !cancelled) {
          setBlocked(true);
          document.body.style.overflow = 'hidden';
        }
      } catch {
        /* fail-open */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="vpnBlock" className="vpn-block" hidden={!blocked}>
      <div className="vpn-card">
        <img src="/assets/logo.png" width={52} height={52} alt="" draggable={false} />
        <h1>{t('vpnT')}</h1>
        <p className="mu">{t('vpnSub')}</p>
        <button
          id="vpnRetry"
          className="btn light big"
          onClick={() => window.location.reload()}
        >
          {t('vpnRetry')}
        </button>
      </div>
    </div>
  );
}
