import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import QRCode from 'react-qr-code';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CheckoutForm = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('googlepay');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get('https://ecom-1-t5j1.onrender.com/api/user/cart', {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        });
        setCart(res.data.cart);
      } catch (error) {
        toast.error('Failed to fetch cart!');
      }
    }
    fetchCart();
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, items) => sum + items.price * 1, 0);
  }, [cart]);

  const taxes = +(total * 0.08).toFixed(2);
  const totalAmount = +(total + 25 + taxes).toFixed(2);

  async function updateOrder() {
    try {
      await axios.put(
        'https://ecom-1-t5j1.onrender.com/api/user/order',
        {
          productid: cart.map((items) => items.product_id),
        },
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
    } catch (error) {
      toast.error('Failed to update order!');
    }
  }

  const handlePay = async () => {
    if (!address.trim()) {
      toast.warn('Please enter your address.');
      return;
    }

    if (paymentMethod === 'cod') {
      await updateOrder();
      toast.success('Order placed with Cash on Delivery!');
      setTimeout(() => {
        window.location.href = '/user/thankyou';
      }, 2000);
    } else {
      toast.info('Please scan the QR code to complete your payment.');
    }
  };

  const upiQRCodeValue = `upi://pay?pa=your-upi@bank&pn=YourName&am=${totalAmount}&cu=INR`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">📦 Shipping Details</h2>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            type="text"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input className="p-3 border border-gray-300 rounded-lg" type="text" placeholder="City" />
            <input className="p-3 border border-gray-300 rounded-lg" type="text" placeholder="State" />
            <input className="p-3 border border-gray-300 rounded-lg" type="text" placeholder="Postal Code" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">💳 Payment Method</h2>
          <div className="flex flex-wrap gap-3">
            {['googlepay', 'phonepe', 'paytm', 'cod'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  paymentMethod === method
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-blue-100'
                }`}
              >
                {method === 'googlepay' && 'Google Pay'}
                {method === 'phonepe' && 'PhonePe'}
                {method === 'paytm' && 'Paytm'}
                {method === 'cod' && 'Cash on Delivery'}
              </button>
            ))}
          </div>

          {paymentMethod !== 'cod' && (
            <div className="text-center mt-6">
              <p className="font-medium text-gray-700 mb-2">
                Scan to Pay via {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
              </p>
              <div className="inline-block bg-white p-3 rounded-xl shadow-lg">
                <QRCode value={upiQRCodeValue} size={160} />
              </div>
            </div>
          )}

          <button
            onClick={handlePay}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg mt-8 font-semibold hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Confirm Order
          </button>

          <ToastContainer position="top-right" autoClose={2000} />
        </div>

        {/* Right: Summary */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-8 space-y-6">
          <h2 className="text-2xl font-bold">🧾 Order Summary</h2>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-300">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.product_id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-300">High Wall Tote</p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-500 pt-4 space-y-2">
            <div className="flex justify-between text-gray-200"><p>Subtotal</p><p>₹{total}</p></div>
            <div className="flex justify-between text-gray-200"><p>Shipping</p><p>₹25.00</p></div>
            <div className="flex justify-between text-gray-200"><p>Taxes</p><p>₹{taxes}</p></div>
            <div className="flex justify-between mt-2 font-bold text-lg"><p>Total</p><p>₹{totalAmount}</p></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
