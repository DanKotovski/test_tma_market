'use client';

import { BottomNav } from '@/components/bottom-nav';
import { useTelegram } from '@/lib/tma-provider';
import { User } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useTelegram();

  return (
    <main className="flex min-h-dvh flex-col bg-background pb-20">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Профиль</h1>
      </header>

      <div className="flex flex-col items-center gap-4 px-4 pt-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {user?.username ?? 'User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {user ? 'Авторизован через Telegram' : 'Режим предпросмотра'}
          </p>
        </div>
        {/* 
        {user?.bonuses !== undefined && (
          <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3">
            <Gem className="h-5 w-5 text-[var(--primary)]" />
            <span className="text-sm font-medium text-foreground">
              {user.bonuses.toLocaleString('ru-RU')}
              {' бонусов'}
            </span>
          </div>
        )} */}
      </div>

      <BottomNav />
    </main>
  );
}
