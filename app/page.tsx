'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchProductCards,
  fetchOrders,
  fetchWidgets,
  fetchUser,
} from '@/lib/api';
import { HomeHeader } from '@/components/home-header';
import { SearchBar } from '@/components/search-bar';
import { OrderBanner } from '@/components/order-banner';
import { CategoryGrid } from '@/components/category-grid';
import { WidgetsCarousel } from '@/components/promo-widgets';
import { ProductSection } from '@/components/product-card';
import { BottomNav } from '@/components/bottom-nav';

export default function HomePage() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const { data: categories, isLoading: catLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const { data: widgets } = useQuery({
    queryKey: ['widgets'],
    queryFn: fetchWidgets,
  });

  const { data: specialProducts, isLoading: specialLoading } = useQuery({
    queryKey: ['products', 'special'],
    queryFn: () => fetchProductCards('special'),
  });

  const { data: hitProducts, isLoading: hitsLoading } = useQuery({
    queryKey: ['products', 'hits'],
    queryFn: () => fetchProductCards('hits'),
  });

  const { data: newProducts, isLoading: newLoading } = useQuery({
    queryKey: ['products', 'new'],
    queryFn: () => fetchProductCards('new'),
  });

  return (
    <main className="flex min-h-dvh flex-col bg-background pb-20">
      <div className="py-3  bg-gradient-to-t from-[#284CAF] to-[#1A2350] rounded-b-2xl mb-2 flex flex-col gap-2">
        <HomeHeader user={user} isLoading={userLoading} />
        <SearchBar />
      </div>

      <div className="py-1.5">
        <OrderBanner orders={orders ?? []} isLoading={ordersLoading} />
      </div>

      <div className="py-3">
        <CategoryGrid categories={categories ?? []} isLoading={catLoading} />
      </div>

      {widgets && widgets.length > 0 && (
        <div className="py-3">
          <WidgetsCarousel widgets={widgets} />
        </div>
      )}

      <div className="flex flex-col gap-6 py-3">
        <ProductSection
          title="Специальные предложения"
          products={specialProducts ?? []}
          isLoading={specialLoading}
        />

        <ProductSection
          title="Хиты продаж"
          products={hitProducts ?? []}
          isLoading={hitsLoading}
        />

        <ProductSection
          title="Новинки"
          products={newProducts ?? []}
          isLoading={newLoading}
        />
      </div>

      <BottomNav />
    </main>
  );
}
