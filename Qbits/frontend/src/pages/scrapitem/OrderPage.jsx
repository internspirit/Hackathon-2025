import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useGetCurrentDealerQuery } from '../../redux/features/dealer/dealerApi';

const OrderPage = () => {
    // Fetch the current dealer (user)
    const { data: currentDealer, isLoading: isDealerLoading } = useGetCurrentDealerQuery();
    
    // Check if the user is logged in
    if (isDealerLoading) {
        return <div className="text-center text-lg font-semibold">Checking login status...</div>;
    }
    if (!currentDealer) {
        return <div className="text-red-500 text-center">You must be logged in to view your orders.</div>;
    }

    // Fetch orders using the logged-in dealer's email
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentDealer.email);

    if (isLoading) return <div className="text-center text-lg font-semibold">Loading your orders...</div>;
    if (isError) return <div className="text-red-500 text-center">Error retrieving order data. Please try again later.</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-3xl font-bold mb-6'>Your Scrap Material Orders</h2>
            {orders.length === 0 ? (
                <div className='text-gray-500 text-center'>No scrap material orders found!</div>
            ) : (
                <div className='space-y-6'>
                    {orders.map((order, index) => (
                        <div key={order._id} className='border border-gray-300 p-6 rounded-lg shadow-sm'>
                            <p className='p-1 bg-green-600 text-white w-fit rounded-md mb-2 px-3'>Order #{index + 1}</p>
                            <h2 className='font-bold text-lg text-gray-800'>Order ID: {order._id}</h2>
                            <p className='text-gray-600'><strong>Name:</strong> {order.name}</p>
                            <p className='text-gray-600'><strong>Email:</strong> {order.email}</p>
                            <p className='text-gray-600'><strong>Phone:</strong> {order.phone}</p>
                            <p className='text-gray-800 font-semibold'><strong>Total Price:</strong> ${order.totalPrice}</p>
                            
                            <h3 className='font-semibold mt-4 text-gray-700'>Pickup Address:</h3>
                            <p className='text-gray-600'>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            
                            <h3 className='font-semibold mt-4 text-gray-700'>Scrap Materials:</h3>
                            <ul className='list-disc ml-6 text-gray-600'>
                                {order.scrapMaterials.map((scrap) => (
                                    <li key={scrap.id} className='mt-1'>
                                        <strong>{scrap.type}</strong> - {scrap.quantity} {scrap.unit} ({scrap.condition})
                                    </li>
                                ))}
                            </ul>
                            
                            <h3 className='font-semibold mt-4 text-gray-700'>Order Status:</h3>
                            <p className={`text-sm font-semibold px-3 py-1 rounded-md ${order.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>{order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
