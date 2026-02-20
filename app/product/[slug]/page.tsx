'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { fetchProduct, addCartItem } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { ProductVariant } from '@/lib/types';

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU');
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  });

  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [adding, setAdding] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-background">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-5 w-32 animate-pulse rounded bg-secondary/60" />
        </div>
        <div className="mx-4 aspect-square animate-pulse rounded-2xl bg-secondary/60" />
        <div className="flex flex-col gap-3 p-4">
          <div className="h-8 w-48 animate-pulse rounded bg-secondary/60" />
          <div className="h-5 w-full animate-pulse rounded bg-secondary/60" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-secondary/60" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
        <p className="text-lg font-semibold text-foreground">Товар не найден</p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 text-sm text-[#3b82f6]"
        >
          Вернуться на главную
        </button>
      </main>
    );
  }

  const variant: ProductVariant =
    product.variants[selectedVariant] ?? product.variants[0];
  const sortedByPrice = [...product.variants]
    .filter((v) => v.isActive)
    .sort((a, b) => a.price - b.price);

  const hasMultipleVendors = sortedByPrice.length > 1;

  const handleAddToCart = async () => {
    setAdding(true);
    await addCartItem(variant.sku);
    setAdding(false);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-background pb-32">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors active:bg-secondary/80"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="line-clamp-1 max-w-[60%] text-sm font-medium text-muted-foreground">
          {product.brand}
        </h1>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors active:bg-secondary/80"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-secondary/60">
          {product.images && product.images.length > 0 && (
            <Image
              src={product.images[currentImage]}
              alt={product.name}
              width={320}
              height={320}
              className="h-auto max-h-[280px] w-auto object-contain"
              priority
            />
          )}

          {product.badges?.map((badge, i) => (
            <span
              key={i}
              className={cn(
                'absolute right-3 top-3 rounded-lg px-2.5 py-1 text-xs font-bold',
                badge.type === 'discount' &&
                  'bg-[var(--accent)] text-[#000000]',
                badge.type === 'cashback' &&
                  'bg-[var(--accent)] text-[#000000]',
              )}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {product.images && product.images.length > 1 && (
          <div className="hide-scrollbar flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  'flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary/40 transition-colors',
                  i === currentImage
                    ? 'border-[#3b82f6]'
                    : 'border-transparent',
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 px-4 pt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[var(--primary)]">
            {formatPrice(variant.price)}
            {' \u20BD'}
          </span>
          {variant.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(variant.oldPrice)}
              {' \u20BD'}
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold leading-tight text-foreground">
          {product.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {product.characteristic}
        </p>
      </div>

      {hasMultipleVendors && (
        <div className="mx-4 mt-4 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setShowAllVendors((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-semibold text-[var(--primary)]">
                Найти дешевле
              </span>
              <span className="text-xs text-muted-foreground">
                {sortedByPrice.length}
                {' продавцов предлагают этот товар'}
              </span>
            </div>
            {showAllVendors ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {showAllVendors && (
            <div className="flex flex-col divide-y divide-border border-t border-border">
              {sortedByPrice.map((v, i) => (
                <button
                  type="button"
                  key={v.sku}
                  onClick={() => {
                    setSelectedVariant(product.variants.indexOf(v));
                    setShowAllVendors(false);
                  }}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 text-left transition-colors active:bg-secondary/60',
                    variant.sku === v.sku && 'bg-secondary/40',
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {v.vendorName ?? `Продавец ${i + 1}`}
                    </span>
                    {i === 0 && (
                      <span className="text-[10px] font-semibold text-[#22c55e]">
                        Лучшая цена
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-[var(--primary)]">
                      {formatPrice(v.price)}
                      {' \u20BD'}
                    </span>
                    {v.oldPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">
                        {formatPrice(v.oldPrice)}
                        {' \u20BD'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 px-4 pt-5">
        <h3 className="text-sm font-semibold text-foreground">Описание</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[var(--secondary)]/95 px-4  backdrop-blur-lg safe-bottom">
        <div className="mx-auto flex max-w-md items-center gap-3 py-3 pb-6">
          <div className="flex flex-1 flex-col">
            <span className="text-lg font-bold text-[var(--primary)]">
              {formatPrice(variant.price)}
              {' \u20BD'}
            </span>
            {variant.vendorName && (
              <span className="text-[10px] text-muted-foreground">
                {variant.vendorName}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[#ffffff] transition-all active:scale-95 disabled:opacity-60"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{adding ? 'Добавляем...' : 'В корзину'}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
