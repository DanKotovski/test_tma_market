import type {
  Category,
  Product,
  ProductCardData,
  Order,
  PromoWidget,
  Cart,
  UserProfile,
} from './types';

export const mockUser: UserProfile = {
  id: 1,
  username: '2busy',
  bonuses: 1250,
};

export const mockCategories: Category[] = [
  {
    attributes: [],
    level: 1,
    name: 'Iphone',
    path: '/category/iphone',
    priority: 1,
    slug: 'iphone',
    image: '/images/Type=Iphone.png',
  },
  {
    attributes: [],
    level: 1,
    name: 'MacBook',
    path: '/category/macbook',
    priority: 2,
    slug: 'macbook',
    image: '/images/Type=Macbook.png',
  },
  {
    attributes: [],
    level: 1,
    name: 'Galaxy',
    path: '/category/galaxy',
    priority: 3,
    slug: 'galaxy',
    image: '/images/Type=Galaxy.png',
  },
  {
    attributes: [],
    level: 1,
    name: 'Наушники',
    path: '/category/headphones',
    priority: 4,
    slug: 'headphones',
    image: '/images/Type=Headphones.png',
  },
  {
    attributes: [],
    level: 1,
    name: 'Playstation',
    path: '/category/playstation',
    priority: 5,
    slug: 'playstation',
    image: '/images/Type=Playstation.png',
  },
  {
    attributes: [],
    level: 1,
    name: 'Игрушки',
    path: '/category/toys',
    priority: 6,
    slug: 'toys',
    image: '/images/Type=Labubu.png',
  },
];

const iphoneImage = '/images/ProductImage.png';

export const mockProducts: Product[] = [
  {
    brand: 'Apple',
    categoryID: 1,
    characteristic: 'Оранжевый, 528GB',
    description:
      'Apple iPhone 17 Pro с чипом A19 Pro, потрясающим дисплеем Super Retina XDR и продвинутой системой камер.',
    isActive: true,
    name: 'Apple Iphone 17 Pro Оранжевый 528gb',
    slug: 'apple-iphone-17-pro-orange-528',
    variants: [
      {
        attributes: [1, 2],
        isActive: true,
        price: 97500,
        oldPrice: 105500,
        sku: 'IP17-PRO-OR-528-V1',
        vendorName: 'TechShop',
      },
      {
        attributes: [1, 2],
        isActive: true,
        price: 98200,
        oldPrice: 106000,
        sku: 'IP17-PRO-OR-528-V2',
        vendorName: 'MobileWorld',
      },
      {
        attributes: [1, 2],
        isActive: true,
        price: 99000,
        oldPrice: 107500,
        sku: 'IP17-PRO-OR-528-V3',
        vendorName: 'GadgetPro',
      },
    ],
    images: [iphoneImage, iphoneImage, iphoneImage, iphoneImage, iphoneImage],
    badges: [{ type: 'discount', label: '-20%' }],
  },
  {
    brand: 'Apple',
    categoryID: 1,
    characteristic: 'Оранжевый, 256GB',
    description: 'Apple iPhone 17 Pro с чипом A19 Pro, 256GB.',
    isActive: true,
    name: 'Apple Iphone 17 Pro Оранжевый 256gb',
    slug: 'apple-iphone-17-pro-orange-256',
    variants: [
      {
        attributes: [1, 3],
        isActive: true,
        price: 87500,
        oldPrice: 95500,
        sku: 'IP17-PRO-OR-256-V1',
        vendorName: 'TechShop',
      },
      {
        attributes: [1, 3],
        isActive: true,
        price: 88200,
        oldPrice: 96000,
        sku: 'IP17-PRO-OR-256-V2',
        vendorName: 'MobileWorld',
      },
    ],
    images: [iphoneImage, iphoneImage],
    badges: [{ type: 'cashback', label: '2X' }],
  },

  {
    brand: 'Apple',
    categoryID: 2,
    characteristic: 'Оранжевый, 528GB',
    description:
      'Apple iPhone 17 Pro — тот же самый товар, появляющийся в другой категории каталога.',
    isActive: true,
    name: 'Apple Iphone 17 Pro Оранжевый 528gb',
    slug: 'apple-iphone-17-pro-orange-528',
    variants: [
      {
        attributes: [1, 2],
        isActive: true,
        price: 97500,
        oldPrice: 105500,
        sku: 'IP17-PRO-OR-528-V1',
        vendorName: 'TechShop',
      },
    ],
    images: [iphoneImage],
  },
  {
    brand: 'Apple',
    categoryID: 1,
    characteristic: 'Черный, 1TB',
    description: 'Apple iPhone 17 Pro Max с чипом A19 Pro, 1TB.',
    isActive: true,
    name: 'Apple Iphone 17 Pro Max Черный 1TB',
    slug: 'apple-iphone-17-pro-max-black-1tb',
    variants: [
      {
        attributes: [4, 5],
        isActive: true,
        price: 149500,
        oldPrice: 165000,
        sku: 'IP17-PM-BL-1TB-V1',
        vendorName: 'TechShop',
      },
    ],
    images: [iphoneImage],
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    status: 'delivering',
    orderNumber: '4545',
    image: iphoneImage,
  },
  {
    id: '2',
    status: 'awaiting_payment',
    orderNumber: '4546',
  },
];

export const mockWidgets: PromoWidget[] = [
  {
    id: 'subscribe',
    type: 'subscribe',
    title: 'Подпишись на канал',
    subtitle: 'Узнавай об акциях первым!',
  },
  {
    id: 'referral',
    type: 'referral',
    title: 'Приглашай друзей и зарабатывай!',
    subtitle: '',
  },
  {
    id: 'broken',
    type: 'broken',
    title: 'Сломалась техника?',
    subtitle: 'Обратись к нашим мастерам!',
  },
  {
    id: 'search',
    type: 'search',
    title: 'Не нашли что хотели?',
    subtitle: 'Найдем товар под ваш запрос!',
  },
];

export const mockCart: Cart = {
  id: 1,
  items: [
    {
      attributes: [1, 2],
      id: 1,
      isActive: true,
      name: 'Apple Iphone 17 Pro Оранжевый 528gb',
      quantity: 1,
      sku: 'IP17-PRO-OR-528-V1',
      totalPrice: 97500,
      unitPrice: 97500,
      image: iphoneImage,
    },
  ],
  price: 97500,
  sessionID: 1,
  userID: 1,
};

export function getDeduplicatedProductCards(): ProductCardData[] {
  const seen = new Set<string>();
  const cards: ProductCardData[] = [];

  for (const product of mockProducts) {
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);

    const cheapestVariant = product.variants.reduce((min, v) =>
      v.price < min.price ? v : min,
    );

    cards.push({
      slug: product.slug,
      name: product.name,
      price: cheapestVariant.price,
      oldPrice: cheapestVariant.oldPrice,
      image: product.images?.[0] ?? iphoneImage,
      badge: product.badges?.[0],
      vendorCount: product.variants.length,
    });
  }

  return cards;
}
