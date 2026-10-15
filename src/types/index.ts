export type ProductCategory = "destaques" | "salgados" | "doces" | "bebidas" | "combos";

export interface ProductAddon {
  id: string;
  name: string;
  nameEn: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionEn: string;
  prepTime: string;
  spiciness?: "none" | "baixa" | "media" | "alta";
  serves: string;
  badge?: string;
  badgeEn?: string;
  image: string;
  isLiveFryer?: boolean;
  liveBadgeText?: string;
  liveBadgeTextEn?: string;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedAddons: ProductAddon[];
  notes?: string;
  itemTotal: number;
}

export type DeliveryType = "delivery" | "pickup";
export type PaymentMethod = "pix" | "card" | "cash";

export interface OrderDetails {
  customerName: string;
  deliveryType: DeliveryType;
  street: string;
  neighborhood: string;
  complement: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}
