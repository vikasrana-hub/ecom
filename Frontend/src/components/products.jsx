import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get('https://ecom-1-t5j1.onrender.com/api/user/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching products.");
        console.error("Error fetching products:", error);
      }
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-xl text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <a href={`/Products/${product._id}`} className="group block">
                <img
                  alt={product.imageAlt || product.name || "Product image"}
                  src={product.URL || "/placeholder.jpg"}
                  className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-indigo-600">₹{product.price}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
