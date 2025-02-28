import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const ScrapItemCard = ({ scrapItem }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    return (
        <div className="rounded-lg shadow-md p-4 transition-shadow duration-300 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
                    <Link to={`/scrap/${scrapItem._id}`}>
                        <img
                            src={getImgUrl(scrapItem?.image)}
                            alt={scrapItem?.name}
                            className="w-full h-full object-cover p-2 cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={`/scrap/${scrapItem._id}`}>
                        <h3 className="text-xl font-semibold hover:text-green-600 mb-3">
                            {scrapItem?.name}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-3">
                        {scrapItem?.description.length > 80
                            ? `${scrapItem.description.slice(0, 80)}...`
                            : scrapItem?.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                        <strong>Condition:</strong> {scrapItem?.condition}
                    </p>
                    <p className="font-medium mb-4">
                        ₹{scrapItem?.price} per kg
                    </p>
                    <button
                        onClick={() => handleAddToCart(scrapItem)}
                        className="btn-primary px-6 py-2 flex items-center gap-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScrapItemCard;
