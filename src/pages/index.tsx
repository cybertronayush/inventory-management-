import { ProductTable } from "@/components/ProductTable";

import { Widgets } from "@/components/Widgets";
import { useProductStore } from "@/store/useProductStore";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { Product } from "@/ types/inventory";

export default function Home() {
  const { addProduct } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );
        const data: Product[] = await res.json();
        data.forEach((product) => addProduct(product));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [addProduct]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="mb-2 mt-0 text-2xl font-medium leading-tight text-white p-2">
          Inventory Management
        </h3>
        <div>
          <span className="p-1">admin</span>
          <Switch />
          <span className="p-1">user</span>
        </div>
      </div>

      <Widgets />
      <ProductTable />
    </div>
  );
}
