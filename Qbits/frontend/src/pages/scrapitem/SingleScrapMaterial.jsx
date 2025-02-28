import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import {  useFetchItemByIdQuery } from '../../redux/features/items/itemsApi';
import { getImgUrl } from '../../utils/getImgUrl';

const SingleScrapMaterial = () => {
    const { id } = useParams();
    const { data: scrap, isLoading, isError } =  useFetchItemByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (scrapItem) => {
        dispatch(addToCart(scrapItem));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading scrap material details</div>;

    return (
        <div className="max-w-lg shadow-md p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{scrap?.name}</h1>

            <div>
                <img
                    src={getImgUrl(scrap?.imageUrl)}
                    alt={scrap?.name}
                    className="mb-6 rounded-md w-full h-60 object-cover"
                />

                <div className='mb-4'>
                    <p className="text-gray-700 mb-2"><strong>Type:</strong> {scrap?.type}</p>
                    <p className="text-gray-700 mb-2"><strong>Condition:</strong> {scrap?.condition}</p>
                    <p className="text-gray-700 mb-2"><strong>Weight:</strong> {scrap?.weight} kg</p>
                    <p className="text-gray-700 mb-2"><strong>Price:</strong> ${scrap?.price} per kg</p>
                    <p className="text-gray-700"><strong>Description:</strong> {scrap?.description}</p>
                </div>

                <button 
                    onClick={() => handleAddToCart(scrap)} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default SingleScrapMaterial;
