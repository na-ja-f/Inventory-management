import { useEffect, useState } from "react";
import { getProducts } from '../services/apiMethods';
import { toast } from "sonner"
import { Minus, LogOut } from "lucide-react"
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Dashboard() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState()

  const openModal = (product) => {
    setProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const fetchProducts = () => {
    getProducts()
      .then((response) => {
        const productData = response.data
        setProducts(productData)
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.info("logout successfull")
    navigate("/login")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#ab7de1] relative">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleLogout}><LogOut size={30} strokeWidth={2} color="red" /></div>
      <div className="w-10/12 h-5/6 bg-[#bd97e6] border rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <h1 className='font-medium pb-4 -mt-8 text-2xl'>All Products</h1>
        <div className="w-10/12 h-5/6 bg-white border rounded-lg shadow-2xl p-10 overflow-scroll ">
          <table className='w-full text-center'>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length && products.map((product, index) => (
                <tr key={index}>
                  <td className="flex justify-center"><img src={product?.productImage} alt="image" width={100} /></td>
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product.quantity == 0 ? <p className="text-red-600">out of stock</p> : <p className="text-green-600">{product.quantity}</p>}</td>
                  <td>
                    <button className="bg-blue-500 py-1 px-2 rounded-lg" onClick={() => product.quantity != 0 ? openModal(product) : toast.error('product out of stock')}><Minus /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal isVisible={isModalVisible} onClose={closeModal} setProducts={setProducts} product={product} />
    </div>
  )
}

export default Dashboard
