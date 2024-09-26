import { useState } from "react";
import { X } from "lucide-react"
import { removeProduct } from "../services/apiMethods";
import { toast } from 'sonner'

const ProductModal = ({ isVisible, onClose, setProducts, product }) => {
    if (!isVisible) return null;
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    const increment = () => {
        setQuantity((prev) => prev + 1); // Increase quantity by 1
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1); // Decrease quantity by 1, but not below 1
        }
    };

    const remove = () => {
        let productId = product._id
        if ((product.quantity - quantity) < 0) {
            toast.error('not enough product on inventory. choose a lesser amount')
        } else {
            let values = {
                productId,
                quantity,
            }
            removeProduct(values)
                .then((response) => {
                    const productData = response.data
                    setProducts(productData)
                    onClose()
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold mb-2">Remove Item From Inventory</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        <X />
                    </button>
                </div>
                <p className="pb-2 text-sm ">How many items to remove</p>
                <div className="flex items-center mb-4">
                    <button
                        onClick={decrement}
                        className="bg-gray-300 p-2 rounded-l-lg text-lg font-bold"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="text-center border border-gray-300 p-2"
                    />
                    <button
                        onClick={increment}
                        className="bg-gray-300 p-2 rounded-r-lg text-lg font-bold"
                    >
                        +
                    </button>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={remove}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
