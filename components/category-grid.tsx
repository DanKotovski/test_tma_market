'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';

interface CategoryGridProps {
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryGrid({ categories, isLoading }: CategoryGridProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="px-4 text-base font-semibold text-foreground">
          Быстрая категория
        </h2>
        <div className="grid grid-cols-3 gap-2.5 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-[110px] animate-pulse flex-col items-center justify-end rounded-xl bg-secondary/60 p-2"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2.5 px-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.path}
            className="relative flex h-[110px] flex-col items-start justify-start overflow-hidden rounded-xl bg-secondary p-3 transition-transform active:scale-95"
          >
            <span className="relative z-10 text-xs font-semibold text-foreground">
              {cat.name}
            </span>
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.name}
                width={80}
                height={80}
                className="absolute bottom-0 right-0 h-[75px] w-[75px] object-contain opacity-90"
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
