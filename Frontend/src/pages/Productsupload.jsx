import axios from 'axios';
import { useState } from 'react';
import { Button } from '../components/button';
import Input from '../components/input'; // Make sure it's a default export

function Productsupload() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-200">
            

            <main className="flex-grow flex justify-center items-center px-4">
                <div className="w-full max-w-md bg-white dark:bg-white rounded-xl shadow-md p-6 space-y-4">
                    <h4 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-900">
                        Upload Product
                    </h4>

                    <Input
                        type="text"
                        placeholder="Product Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Product Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Product Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Product Image URL"
                        onChange={(e) => setImageURL(e.target.value)}
                    />

                    <Button label={"Upload Product"}
                        onClick={async()=>{
                            await axios.post("https://ecom-1-t5j1.onrender.com/api/admin/uploadProduct", {
                        name: name,
                        price: price,
                        description: description,
                        url: imageURL},{
                            headers:{
                            authorization:window.localStorage.getItem('token')
                        },
                        
                        })
                    }}
                    />
                </div>
            </main>

        
        </div>
    );
}

export default Productsupload;
