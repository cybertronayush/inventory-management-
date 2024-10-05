export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  isDisabled: boolean;
}

export interface Inventory {
  products: Product[];
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  categories: string[];
}
