import { useEffect, useState } from "react";
import { getProducts } from '../services/apiMethods';
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Dashboard() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

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

  // Navigate to the sales page
  const goToSalesPage = () => {
    navigate("/sales");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#ab7de1] relative">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleLogout}>
        <LogOut size={30} strokeWidth={2} color="red" />
      </div>

      <div className="w-10/12 h-5/6 bg-[#bd97e6] border rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full px-24 pb-2">
          {/* "All Products" heading */}
          <div className="font-medium pb-4 -mt-8 text-2xl">Inventory</div>
          
          {/* "Add a Sale" button */}
          <button
            className="px-4 -mt-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={goToSalesPage}
          >
            Add a Sale
          </button>
        </div>
        <div className="w-10/12 h-5/6 bg-white border rounded-lg shadow-2xl p-10 overflow-scroll">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.length &&
                products.map((product, index) => (
                  <tr key={index}>
                    <td className="flex justify-center">
                      <img src={product?.productImage} alt="image" width={100} />
                    </td>
                    <td>{product?.name}</td>
                    <td>{product?.price}</td>
                    <td>
                      {product.quantity === 0 ? (
                        <p className="text-red-600">Out of stock</p>
                      ) : (
                        <p className="text-green-600">{product.quantity}</p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
