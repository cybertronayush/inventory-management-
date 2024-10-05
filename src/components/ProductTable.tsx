// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { useProductStore } from "@/store/useProductStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from "@/ types/inventory";
import { Check, Eye, EyeOff, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { userStore } from "@/store/userStore";

function formatToDollar(amount: number) {
  return `$${amount}`;
}

export const ProductTable: React.FC = () => {
  const { isAdmin } = userStore();
  const { products, deleteProduct, disableProduct, updateProduct } =
    useProductStore();

  const [editedProduct, setEditedProduct] = useState<Product>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedProduct) {
      if (editedProduct.price && typeof editedProduct.price === "number") {
        const format = formatToDollar(editedProduct.price);
        editedProduct.price = format;
      }

      updateProduct(editedProduct.name, editedProduct);
      setShowModal(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.name}
              className={product.isDisabled ? "opacity-50" : ""}
            >
              <TableCell width={500}>{product.name}</TableCell>
              <TableCell width={500}>{product.price}</TableCell>
              <TableCell width={500}>{product.quantity}</TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => disableProduct(product.name)}
                    disabled={!isAdmin || product.isDisabled}
                    className={`p-2 rounded-full ${
                      !isAdmin || product.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {product.isDisabled ? (
                      <Eye color="white" />
                    ) : (
                      <EyeOff size={15} color="white" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (isAdmin) {
                        setShowModal(true);
                        setEditedProduct(product);
                      }
                    }}
                    disabled={!isAdmin || product.isDisabled}
                    className={`bg-transparent hover:bg-gray-200 p-2 rounded-full glassmorphic-btn ${
                      !isAdmin ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Pencil size={18} color="green" />
                  </button>

                  <button
                    disabled={!isAdmin || product.isDisabled}
                    onClick={() => isAdmin && deleteProduct(product.name)}
                    className={`p-2 rounded-md ${
                      !isAdmin || product.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Trash size={15} color="red" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-black">
                Edit Product
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Edit the product details below:
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-0">
              <input
                value={editedProduct?.name || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    name: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="name"
                placeholder="Product Name"
              />

              <input
                value={editedProduct?.price || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                name="price"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Price"
              />

              <input
                value={editedProduct?.quantity || 0}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
                name="quantity"
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Quantity"
              />

              <DialogFooter className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex items-center space-x-1 rounded"
                >
                  <Check size={18} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
