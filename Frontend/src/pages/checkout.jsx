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
                        authorization: window.localStorage.getItem('token')
                    }
                });
                setCart(res.data.cart);
            } catch (error) {
                toast.error('Failed to fetch cart!');
            }
        }
        fetchCart();
    }, []);

    const total = useMemo(() => {
        return cart.reduce((sum, items) =>
            sum + items.price * 1, 0)
    }, [cart]);

    const taxes = total * 0.08;
    const totalamount = total + 25 + taxes;

    async function updateOrder() {
        try {
            await axios.put('https://ecom-1-t5j1.onrender.com/api/user/order', {
                productid: cart.map((items) => items.product_id)
            }, {
                headers: {
                    authorization: window.localStorage.getItem('token')
                }
            });
        } catch (error) {
            toast.error("Failed to update order!");
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

    const upiQRCodeValue = `upi://pay?pa=your-upi@bank&pn=YourName&am=${totalamount}&cu=INR`;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-6 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-700">Shipping Address</h2>

                    <input
                        className="w-full p-3 border rounded-md"
                        type="text"
                        placeholder="Full Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input className="p-3 border rounded-md" type="text" placeholder="City" />
                        <input className="p-3 border rounded-md" type="text" placeholder="State/Province" />
                        <input className="p-3 border rounded-md" type="text" placeholder="Postal code" />
                    </div>

                    {/* Payment Method Slider */}
                    <h2 className="text-xl font-semibold text-gray-700">Choose Payment Method</h2>
                    <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                        {['googlepay', 'phonepe', 'paytm', 'cod'].map((method) => (
                            <button
                                key={method}
                                onClick={() => setPaymentMethod(method)}
                                className={`py-2 px-4 rounded-full border ${paymentMethod === method
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700'
                                    } hover:bg-blue-500 hover:text-white transition`}
                            >
                                {method === 'googlepay' && 'Google Pay'}
                                {method === 'phonepe' && 'PhonePe'}
                                {method === 'paytm' && 'Paytm'}
                                {method === 'cod' && 'Cash on Delivery'}
                            </button>
                        ))}
                    </div>

                    {/* QR Code if UPI selected */}
                    {paymentMethod !== 'cod' && (
                        <div className="mt-6 text-center">
                            <p className="text-gray-700 font-medium mb-2">
                                Scan QR using {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                            </p>
                            <div className="flex justify-center">
                                <QRCode value={upiQRCodeValue} size={180} />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handlePay}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                    >
                        Confirm Order
                    </button>

                    <ToastContainer position="top-right" autoClose={2000} />
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/2 bg-blue-900 text-white p-6 sm:p-8 space-y-6">
                    <h2 className="text-2xl font-bold">Amount Due <span className="block text-3xl mt-2">₹{totalamount}</span></h2>

                    <div className="space-y-4">
                        {cart.map((items) => (
                            <div key={items.product_id} className="flex justify-between items-start">
                                <div>
                                    <p>High Wall Tote</p>
                                    <p className="text-sm text-gray-300">{items.name}</p>
                                </div>
                                <p>₹{items.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-600 pt-4 space-y-2">
                        <div className="flex justify-between"><p>Subtotal</p><p>₹{total}</p></div>
                        <div className="flex justify-between"><p>Shipping</p><p>₹25.00</p></div>
                        <div className="flex justify-between"><p>Taxes</p><p>₹{taxes}</p></div>
                        <div className="flex justify-between mt-2 font-semibold text-lg"><p>Total</p><p>₹{totalamount}</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
