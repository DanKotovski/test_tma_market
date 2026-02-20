'use client';

import { useRef, useState } from 'react';
import { ChevronRight, Send, Users, Wrench, Search } from 'lucide-react';
import type { PromoWidget } from '@/lib/types';
import { cn } from '@/lib/utils';

const widgetIcons: Record<string, React.ElementType> = {
  subscribe: Send,
  referral: Users,
  broken: Wrench,
  search: Search,
};

const widgetStyles: Record<string, { bg: string; iconBg: string }> = {
  subscribe: { bg: 'bg-secondary', iconBg: 'bg-[#3b82f6]/20 text-[#3b82f6]' },
  referral: {
    bg: 'bg-gradient-to-r from-[#1e3a5f] to-[#1e40af]',
    iconBg: 'bg-[#ffffff]/20 text-[#ffffff]',
  },
  broken: {
    bg: 'bg-gradient-to-r from-[#1a1a2e] to-[#2d1f3d]',
    iconBg: 'bg-[#f97316]/20 text-[#f97316]',
  },
  search: {
    bg: 'bg-gradient-to-r from-[#0f172a] to-[#1e293b]',
    iconBg: 'bg-[#3b82f6]/20 text-[#3b82f6]',
  },
};

interface PromoWidgetCardProps {
  widget: PromoWidget;
  className?: string;
}

function PromoWidgetCard({ widget, className }: PromoWidgetCardProps) {
  const Icon = widgetIcons[widget.type] ?? Send;
  const style = widgetStyles[widget.type] ?? widgetStyles.subscribe;

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-transform active:scale-[0.98]',
        style.bg,
        className,
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          style.iconBg,
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold text-foreground">
          {widget.title}
        </span>
        {widget.subtitle && (
          <span className="text-xs text-muted-foreground">
            {widget.subtitle}
          </span>
        )}
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </button>
  );
}

interface WidgetsCarouselProps {
  widgets: PromoWidget[];
}

export function WidgetsCarousel({ widgets }: WidgetsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!widgets.length) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50 && current < widgets.length - 1) {
      setCurrent(current + 1);
    } else if (deltaX < -50 && current > 0) {
      setCurrent(current - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="block md:hidden relative mx-4 overflow-hidden rounded-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {widgets.map((widget) => (
          <div key={widget.id} className="w-full shrink-0">
            <PromoWidgetCard widget={widget} className="rounded-none" />
          </div>
        ))}
      </div>

      {widgets.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {widgets.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === current ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/40',
              )}
              aria-label={`Перейти к слайду ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
