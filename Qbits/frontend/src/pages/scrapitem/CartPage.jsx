import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import { useGetCurrentDealerQuery } from '../../redux/features/dealer/dealerApi';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const { data: dealer=true, isLoading: dealerLoading } = useGetCurrentDealerQuery();

    if (dealerLoading) return <div className="text-center text-lg font-semibold">Checking authentication...</div>;
    if (!dealer) return <div className="text-red-500 text-center">You need to log in to access the cart.</div>;

    // Calculate total cost based on quantity
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="container mx-auto px-4 py-8 mb-16">
            {/* Main content container with proper spacing */}
            <div className="bg-white shadow-xl rounded-lg">
                {/* Header section */}
                <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Scrap Cart</h2>
                        {cartItems.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="py-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>

                {/* Cart items section with fixed max height and scrolling */}
                <div className="px-4 py-6 sm:px-6">
                    <div className="max-h-96 overflow-y-auto">
                        {cartItems.length > 0 ? (
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.map((scrap) => (
                                    <li key={scrap._id} className="py-6 flex">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={getImgUrl(scrap.image)}
                                                alt={scrap.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/scrap/${scrap._id}`} className="hover:text-green-600">
                                                            {scrap.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="ml-4">₹{scrap.price} per kg</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 capitalize">
                                                    <strong>Category: </strong>{scrap.category}
                                                </p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500"><strong>Qty:</strong> {scrap.quantity || 1} kg</p>

                                                <button
                                                    onClick={() => handleRemoveFromCart(scrap)}
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600 text-lg">Your cart is empty!</p>
                                <Link to="/scraps" className="mt-4 inline-block text-green-600 hover:text-green-700">
                                    Browse available scraps
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary and checkout section - always visible */}
                <div className="px-4 py-6 sm:px-6 bg-gray-50 rounded-b-lg">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    
                    {cartItems.length > 0 ? (
                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600 transition-all"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <button
                                disabled
                                className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;