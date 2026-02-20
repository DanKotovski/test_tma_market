'use client';

import { ChevronRight } from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusLabels: Record<OrderStatus, string> = {
  delivering: 'Едет к вам',
  awaiting_payment: 'Ожидает оплаты',
  assembling: 'Собираем',
  handed_to_delivery: 'Передали в доставку',
  cancelled: 'Отменен',
  ready_for_pickup: 'Готов к выдаче',
};

const statusColors: Record<OrderStatus, string> = {
  delivering: 'text-[var(--primary)]',
  awaiting_payment: 'text-foreground',
  assembling: 'text-foreground',
  handed_to_delivery: 'text-foreground',
  cancelled: 'text-muted-foreground',
  ready_for_pickup: 'ttext-[var(--primary)]',
};

interface OrderBannerProps {
  orders: Order[];
  isLoading?: boolean;
}

export function OrderBanner({ orders, isLoading }: OrderBannerProps) {
  if (isLoading) {
    return (
      <div className="mx-4 flex h-[56px] animate-pulse items-center rounded-xl bg-secondary/60" />
    );
  }

  if (!orders.length) return null;

  const firstOrder = orders[0];

  return (
    <div className="mx-4 flex justify-between items-center gap-3  ">
      <div className="bg-[var(--secondary)] flex items-center flex-1 p-2 flex gap-2 rounded-md h-[70px]">
        <div className="h-6 w-6 h-full w-[54px] rounded-md bg-muted-foreground/20" />

        <div className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              'text-md font-medium',
              statusColors[firstOrder.status],
            )}
          >
            {statusLabels[firstOrder.status]}
          </span>
          <span className="text-xs text-muted-foreground">
            {'Заказ №'}
            {firstOrder.orderNumber}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-0  bg-[var(--secondary)] p-3 rounded-md h-[70px]">
        <span className="text-sm font-medium">Все заказы</span>
        <ChevronRight className="h-8 w-8" />
      </div>
    </div>
  );
}
