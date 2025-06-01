import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Productcard() {
  const [product, setProduct] = useState({});
  const productid = useParams().id;

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(`https://ecom-1-t5j1.onrender.com/api/user/product/${productid}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        console.log(product.url)
      }
    }
    fetch();
  }, []);

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
              onClick={async () => {
                await axios.post(`http://localhost:3001/api/user/cart/${productid}`,{}, {

                  headers: {
                    authorization: window.localStorage.getItem('token')
                  },
                });
                window.location.href = '/user/cart';
              }

              }
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Productcard;
