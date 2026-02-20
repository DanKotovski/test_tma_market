'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProductCardData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Gem } from 'lucide-react';

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU');
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      draggable={false}
      className={cn(
        'group flex w-[160px] shrink-0 flex-col overflow-hidden rounded-xl bg-card',
        className,
      )}
    >
      <div className="relative flex aspect-square items-center justify-center bg-secondary/60 p-3">
        <Image
          src={product.image}
          alt={product.name}
          draggable={false}
          width={140}
          height={140}
          className="h-auto max-h-[120px] w-auto object-contain transition-transform group-hover:scale-105"
        />

        {product.badge && (
          <span
            className={cn(
              'absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold flex items-center gap-0.5',
              product.badge.type === 'discount' &&
                'bg-[var(--accent)] text-[#000000] ',
              product.badge.type === 'cashback' &&
                'bg-[var(--accent)] text-[#000000]',
            )}
          >
            {product.badge.label}
            {product.badge.type === 'cashback' && <Gem size={10} />}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-2.5 bg-secondary/60">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-[#2990FF]">
            {formatPrice(product.price)}
            {' \u20BD'}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
              {' \u20BD'}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-xs leading-tight text-foreground/80">
          {product.name}
        </p>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex w-[160px] shrink-0 flex-col overflow-hidden rounded-xl bg-card">
      <div className="aspect-square animate-pulse bg-secondary/60" />
      <div className="flex flex-col gap-2 p-2.5">
        <div className="h-4 w-20 animate-pulse rounded bg-secondary/60" />
        <div className="h-3 w-full animate-pulse rounded bg-secondary/60" />
      </div>
    </div>
  );
}

interface ProductSectionProps {
  title: string;
  products: ProductCardData[];
  isLoading?: boolean;
}

export function ProductSection({
  title,
  products,
  isLoading,
}: ProductSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="px-4 text-base font-semibold text-foreground">{title}</h2>
      <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((p) => (
              <ProductCard key={p.slug + p.price} product={p} />
            ))}

        {!isLoading && (
          <div className="flex w-[160px] shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-4 text-center">
            <p className="text-md font-semibold text-foreground">
              Не нашли подходящее?
            </p>
            <span className="mt-1 text-xs text-muted-foreground">
              {'Поискать ещё гемы >'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
