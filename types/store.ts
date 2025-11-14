export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in USD
  priceInETH?: number; // Optional ETH price
  image: string;
  category: 'apparel' | 'accessories' | 'other';
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  paymentMethod: 'crypto' | 'card';
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: Date;
}
