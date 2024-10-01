import { useEffect, useState } from "react";
import { getProducts, removeProduct } from '../services/apiMethods';
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Sales() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]); // All products
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product names
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product
    const [saleQuantity, setSaleQuantity] = useState(1);

    useEffect(() => {
        try {
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((response) => {
                const productData = response.data;
                setProducts(productData);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.info("Logout successful");
        navigate("/login");
    };

    // Handle search input change
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        if (searchValue.trim() === "") {
            setFilteredProducts([]); // Clear suggestions if search term is empty
        } else {
            // Filter products by name based on search term
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // Handle product selection from suggestions
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setSearchTerm(product.name);
        setFilteredProducts([]); // Clear suggestions after selecting a product
    };

    // Handle clearing the selected product
    const clearSelection = () => {
        setSelectedProduct(null); // Clear the selected product
        setSearchTerm(""); // Clear the search input
        setFilteredProducts([]); // Clear the filtered products
    };

    // Remove (simulate sale) function
    const remove = () => {
        let productId = selectedProduct._id;
        if ((selectedProduct.quantity - saleQuantity) < 0) {
            toast.error('Not enough product in inventory. Choose a lesser amount');
        } else {
            let values = {
                productId,
                quantity: saleQuantity,
            };
            removeProduct(values)
                .then((response) => {
                    const productData = response.data;
                    setProducts(productData); // Update the product list with the new data
                    setSelectedProduct(null); // Clear the selected product after the sale
                    toast.success('Sale added successfully');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    // Navigate to the Dashboard page
    const goToDashboard = () => {
        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#ab7de1] relative">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={handleLogout}>
                <LogOut size={30} strokeWidth={2} color="red" />
            </div>
            <div className="w-10/12 h-5/6 bg-[#bd97e6] border rounded-lg shadow-2xl flex flex-col items-center pt-10">
                {/* Button to go back to Dashboard */}
                <div className="w-full flex justify-center mb-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={goToDashboard}
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="w-full flex flex-col items-center">
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 w-1/2 border rounded"
                    />
                    {/* Show filtered product names as suggestions */}
                    {filteredProducts.length > 0 && (
                        <div className="w-1/2 bg-white border rounded shadow-lg max-h-40 overflow-auto">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleProductSelect(product)}
                                >
                                    {product.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-10/12 bg-white border rounded-lg shadow-2xl p-10 overflow-scroll">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Show selected product details */}
                            {selectedProduct ? (
                                <>
                                    <tr>
                                        <td className="flex justify-center">
                                            <img src={selectedProduct?.productImage} alt="image" width={100} />
                                        </td>
                                        <td>{selectedProduct?.name}</td>
                                        <td>{selectedProduct?.price}</td>
                                        <td>
                                            {selectedProduct.quantity === 0 ? (
                                                <p className="text-red-600">Out of stock</p>
                                            ) : (
                                                <input className="pl-2 w-10" type="number" value={saleQuantity} onChange={(e) => setSaleQuantity(e.target.value)} />
                                            )}
                                        </td>
                                    </tr>
                                    {/* Button to add a sale */}
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <button
                                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                                                onClick={remove} // Triggers the remove function
                                            >
                                                Add Sale
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Button to clear selection */}
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <button
                                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                                                onClick={clearSelection}
                                            >
                                                Clear Selection
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No product selected</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Sales;
