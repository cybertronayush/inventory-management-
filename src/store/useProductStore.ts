import { create } from "zustand";
import { Product } from "@/ types/inventory";

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  disableProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  updateProduct: (name, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) => {
        console.log("Updating product:", name, product);
        if (product.name === name) {
          const updated = { ...product, ...updatedProduct };
          console.log("Updating product:", product, "to", updated);
          return updated;
        }

        return product;
      }),
    })),

  deleteProduct: (name) =>
    set((state) => ({
      products: state.products.filter((product) => product.name !== name),
    })),

  disableProduct: (name) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.name === name ? { ...product, isDisabled: true } : product
      ),
    })),
}));
