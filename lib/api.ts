import {
  mockCategories,
  mockProducts,
  mockOrders,
  mockWidgets,
  mockCart,
  mockUser,
  getDeduplicatedProductCards,
} from './mock-data';

import type {
  Category,
  Product,
  Order,
  PromoWidget,
  Cart,
  ProductCardData,
  UserProfile,
} from './types';

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function fetchCategories(): Promise<Category[]> {
  await delay();
  return mockCategories;
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  await delay(200);

  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function fetchProductCards(
  section: 'special' | 'hits' | 'new',
): Promise<ProductCardData[]> {
  await delay(250);
  const all = getDeduplicatedProductCards();

  switch (section) {
    case 'special':
      return all.slice(0, 2);
    case 'hits':
      return all.slice(0, 3);
    case 'new':
      return all;
    default:
      return all;
  }
}

export async function fetchCart(): Promise<Cart> {
  await delay(200);
  return mockCart;
}

export async function addCartItem(sku: string): Promise<Cart> {
  await delay(300);
  console.log('[mock-api] addCartItem:', sku);
  return mockCart;
}

export async function updateCartItem(
  sku: string,
  quantity: number,
): Promise<Cart> {
  await delay(300);
  console.log('[mock-api] updateCartItem:', sku, quantity);
  return mockCart;
}

export async function removeCartItem(sku: string): Promise<Cart> {
  await delay(300);
  console.log('[mock-api] removeCartItem:', sku);
  return { ...mockCart, items: mockCart.items.filter((i) => i.sku !== sku) };
}

export async function fetchOrders(): Promise<Order[]> {
  await delay(200);
  return mockOrders;
}

export async function fetchWidgets(): Promise<PromoWidget[]> {
  await delay(150);
  return mockWidgets;
}

export async function fetchUser(): Promise<UserProfile> {
  await delay(100);
  return mockUser;
}

export async function registerUser(initData: string): Promise<void> {
  await delay(500);
  console.log('[mock-api] registerUser with TMA initData:', initData);
}
