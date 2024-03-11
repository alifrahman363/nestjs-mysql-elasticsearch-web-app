"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
}

const ProductComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<Product[]>('http://localhost:3000/products');
            // @ts-expect-error type error is not solved
            setProducts(response.data.data);
        } catch (error) {
            console.error('Axios Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const searchProducts = async (term: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<Product[]>(`http://localhost:3000/products/search/${term}`);
            // @ts-expect-error type error is not solved
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Axios Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            searchProducts(searchTerm);
        } else {
            // If search term is empty, show all products
            setSearchResults([]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch();
                        }}
                        className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                    />
                </div>

                {isLoading && <div className="text-center text-gray-400">Loading products...</div>}
                {error && <div className="text-center text-red-500">Error: {error.message}</div>}

                {searchTerm && (
                    <div className="mb-8 bg-gray-800 p-6 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold text-white mb-4">Search Results for "{searchTerm}"</h2>
                        {Array.isArray(searchResults) && searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {searchResults.map((result) => (
                                    <div key={result.id || result.id} className="bg-gray-700 rounded-md shadow-md p-6 transition-colors duration-300 hover:bg-gray-600">
                                        <h3 className="text-lg font-semibold text-white mb-2">{result.name}</h3>
                                        <p className="text-gray-300 mb-4">{result.description}</p>
                                        <p className="text-teal-400 font-bold">Price: {result.price}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400">No products found.</div>
                        )}
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">All Products:</h2>
                    {Array.isArray(products) && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id || product.id} className="bg-gray-700 rounded-md shadow-md p-6 transition-colors duration-300 hover:bg-gray-600">
                                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                                    <p className="text-gray-300 mb-4">{product.description}</p>
                                    <p className="text-teal-400 font-bold">Price: {product.price}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-400">No products found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
