import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/button';
import Input from '../components/input';
import './Productsupload.css';

function Productsupload() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!name || !price || !description || !imageURL) {
            toast.error('Please fill out all fields.');
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                'https://ecom-1-t5j1.onrender.com/api/admin/uploadProduct',
                {
                    name,
                    price,
                    description,
                    URL: imageURL,
                },
                {
                    headers: {
                        authorization: window.localStorage.getItem('token'),
                    },
                }
            );
            toast.success('Product uploaded successfully!');
            setName('');
            setPrice('');
            setDescription('');
            setImageURL('');
        } catch (error) {
            toast.error('Failed to upload product. Please try again.');
            console.error('Upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full animated-bg flex items-center justify-center px-4">
            <div className="w-full max-w-md glass-card animate-fadeIn p-8 space-y-6">
                <h4 className="text-3xl font-bold text-center text-gray-800 drop-shadow">
                    Upload Product
                </h4>

                <Input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Product Image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                />

                <Button
                    label={loading ? 'Uploading...' : 'Upload Product'}
                    onClick={handleUpload}
                    disabled={loading}
                />
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
}

export default Productsupload;
