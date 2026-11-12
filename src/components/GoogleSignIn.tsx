'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from './LangProvider';

interface DemoUser {
  name: string;
  email: string;
}

const KEY = 'see-demo-user';

// Demo-only Google sign-in: no OAuth, no network, nothing is verified.
// The button opens a Google-style account chooser; picking the demo
// account stores a local fake session so the UI can be tested end to end.
// Real Google sign-in opens at launch.
export default function GoogleSignIn() {
  const { t } = useLang();
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const signIn = () => {
    const demo: DemoUser = { name: t('demoAccountName'), email: 'demo@seeai.xyz' };
    setUser(demo);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(demo));
    } catch {
      /* storage unavailable */
    }
    setOpen(false);
    router.push('/create');
  };

  const signOut = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* storage unavailable */
    }
  };

  if (user) {
    return (
      <span className="gsi-user">
        <span className="gsi-avatar" aria-hidden>
          {user.name.charAt(0)}
        </span>
        <span className="gsi-name">{user.name}</span>
        <button type="button" className="gsi-signout" onClick={signOut}>
          {t('signOut')}
        </button>
      </span>
    );
  }

  return (
    <>
      <button type="button" className="btn gsi-btn" onClick={() => setOpen(true)}>
        <svg className="gsi-g" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.2-2.1 3.7-5.1 3.7-8.8z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.2C3.3 21.2 7.3 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.3 6.8C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l3.9-2.9z"
          />
          <path
            fill="#EA4335"
            d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.8 1.3 6.8l3.9 2.9c.9-2.9 3.6-5 6.8-5z"
          />
        </svg>
        {t('signInGoogle')}
      </button>
      {open && (
        <div className="gsi-overlay" role="dialog" aria-modal="true" aria-label={t('chooseAccount')}>
          <div className="gsi-dialog">
            <button type="button" className="icon-btn gsi-x" aria-label="Close" onClick={() => setOpen(false)}>
              ✕
            </button>
            <h3>{t('chooseAccount')}</h3>
            <button type="button" className="gsi-account" onClick={signIn}>
              <span className="gsi-avatar" aria-hidden>
                D
              </span>
              <span>
                <b>{t('demoAccountName')}</b>
                <i>demo@seeai.xyz</i>
              </span>
            </button>
            <p className="mu gsi-note">{t('demoSignInNote')}</p>
          </div>
        </div>
      )}
    </>
  );
}
