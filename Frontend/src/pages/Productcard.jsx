import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Productcard() {
  const [product, setProduct] = useState({});
  const { id: productid } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://ecom-1-t5j1.onrender.com/api/user/product/${productid}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product data.");
      }
    }
    fetchProduct();
  }, [productid]);

  const addToCart = async () => {
    try {
      await axios.post(`https://ecom-1-t5j1.onrender.com/api/user/cart/${productid}`, {}, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      toast.success("Item added to cart!");
      setTimeout(() => {
        window.location.href = '/user/cart';
      }, 1500);
    } catch (error) {
      toast.error("Failed to add to cart. Are you logged in?");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-bl from-blue-100 to-blue-200">
      <div className="max-w-4xl mx-auto p-6 mt-10 shadow-lg rounded-xl bg-white/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <img
              src={product.URL}
              alt={product.name}
              onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.jpg"; }}
              className="rounded-lg object-cover w-full h-[300px] shadow-md border"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-xl text-green-600 font-semibold">₹ {product.price}</p>
            <p className="text-gray-700">{product.description}</p>
            <button
              onClick={addToCart}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Productcard;
