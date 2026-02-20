'use client';

import { BottomNav } from '@/components/bottom-nav';
import { useQuery } from '@tanstack/react-query';
import { fetchCart } from '@/lib/api';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU');
}

export default function CartPage() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });

  return (
    <main className="flex min-h-dvh flex-col bg-background pb-20">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Корзина</h1>
      </header>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-32 animate-pulse rounded bg-secondary/60" />
        </div>
      ) : cart && cart.items.length > 0 ? (
        <div className="flex flex-col gap-3 px-4">
          {cart.items.map((item) => (
            <div
              key={item.sku}
              className="flex items-center gap-3 rounded-xl bg-card p-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary/60">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {'Кол-во: '}
                  {item.quantity}
                </span>
              </div>
              <span className="text-sm font-bold text-[var(--primary)]">
                {formatPrice(item.totalPrice)}
                {' \u20BD'}
              </span>
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-card p-4">
            <span className="text-sm font-medium text-foreground">Итого</span>
            <span className="text-lg font-bold text-[var(--primary)]">
              {formatPrice(cart.price)}
              {' \u20BD'}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Корзина пуста</p>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
