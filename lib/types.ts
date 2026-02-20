export interface Category {
  attributes: number[];
  level: number;
  name: string;
  path: string;
  priority: number;
  slug: string;
  image?: string;
}

export interface ProductVariant {
  attributes: number[];
  isActive: boolean;
  price: number;
  oldPrice?: number;
  sku: string;
  vendorName?: string;
}

export interface Product {
  brand: string;
  categoryID: number;
  characteristic: string;
  description: string;
  isActive: boolean;
  name: string;
  slug: string;
  variants: ProductVariant[];
  images?: string[];
  badges?: ProductBadge[];
}

export interface ProductBadge {
  type: 'cashback' | 'discount' | 'hot';
  label: string;
}

export interface CartItem {
  attributes: number[];
  id: number;
  isActive: boolean;
  name: string;
  quantity: number;
  sku: string;
  totalPrice: number;
  unitPrice: number;
  image?: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  price: number;
  sessionID: number;
  userID: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  orderNumber: string;
  image?: string;
}

export type OrderStatus =
  | 'delivering'
  | 'awaiting_payment'
  | 'assembling'
  | 'handed_to_delivery'
  | 'cancelled'
  | 'ready_for_pickup';

export interface ProductCardData {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: ProductBadge;
  vendorCount?: number;
}

export interface PromoWidget {
  id: string;
  type: 'subscribe' | 'referral' | 'broken' | 'search';
  title: string;
  subtitle: string;
  icon?: string;
  gradient?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  bonuses: number;
}
