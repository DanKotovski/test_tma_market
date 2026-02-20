'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    query_id?: string;
    auth_date?: number;
    hash: string;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    onClick: (cb: () => void) => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string) => Promise<boolean>;
  disableVerticalSwipes: () => void;
}

export interface TelegramContextType {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isReady: boolean;
  initData: string | null;
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isReady: false,
  initData: null,
});

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initTelegram = () => {
      const tg = (window as any).Telegram?.WebApp as TelegramWebApp | undefined;

      if (tg) {
        tg.ready();
        tg.expand();

        tg.disableVerticalSwipes?.();

        setWebApp(tg);
        setIsReady(true);
      }
    };

    if ((window as any).Telegram?.WebApp) {
      initTelegram();
    } else {
      const interval = setInterval(() => {
        if ((window as any).Telegram?.WebApp) {
          clearInterval(interval);
          initTelegram();
        }
      }, 100);

      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  const value = useMemo((): TelegramContextType => {
    if (!webApp) {
      return { webApp: null, user: null, isReady: false, initData: null };
    }

    return {
      webApp,
      user: webApp.initDataUnsafe.user ?? null,
      isReady,
      initData: webApp.initData,
    };
  }, [webApp, isReady]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error(
      'useTelegram должен использоваться внутри TelegramProvider',
    );
  }
  return context;
};
