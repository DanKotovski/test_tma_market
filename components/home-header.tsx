'use client';

import { TelegramUser } from '@/lib/tma-provider';
import type { UserProfile } from '@/lib/types';
import { Gem } from 'lucide-react';

interface HeaderProps {
  user: UserProfile | TelegramUser | undefined;
  isLoading?: boolean;
}

export function HomeHeader({ user, isLoading }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 px-4 pb-1 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-foreground">
          {isLoading ? (
            <span className="inline-block h-6 w-32 animate-pulse rounded bg-secondary/60" />
          ) : (
            <>
              {'Привет, '}
              {user?.username ?? 'User'}
              {'!'}
            </>
          )}
        </p>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-[#9829FF] px-3 py-1.5 text-xs font-semibold text-[#ffffff] transition-transform active:scale-95"
        >
          <Gem className="h-3.5 w-3.5" />
          <span>Бонусы</span>
        </button>
      </div>
    </header>
  );
}
