import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentDealerQuery } from '../../redux/features/dealer/dealerApi';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    const { data: currentUser=true, isLoading: userLoading } = useGetCurrentDealerQuery();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            buyerName: data.name,
            email: currentUser?.email,
            address: {
                street: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode
            },
            phone: data.phone,
            scrapItems: cartItems.map(item => ({ id: item._id, name: item.name, weight: item.weight })),
            totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: 'Order Confirmed',
                text: 'Your scrap order has been placed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/orders');
        } catch (error) {
            Swal.fire({
                title: 'Order Failed',
                text: 'Could not place order. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry'
            });
        }
    };

    if (userLoading) return <div>Loading...</div>;
    if (!currentUser) return <div>Please log in to proceed with checkout.</div>;

    return (
        <section className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white shadow-lg rounded p-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Scrap Material Checkout</h2>
                    <p className="text-gray-600">Total Price: ${totalPrice}</p>
                    <p className="text-gray-600">Items: {cartItems.length} scrap materials</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-6">
                        <div>
                            <label className="block text-gray-700">Full Name</label>
                            <input {...register('name', { required: true })} className="border rounded w-full p-2" />
                            {errors.name && <p className="text-red-500">Full Name is required</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">Email Address</label>
                            <input type="email" defaultValue={currentUser?.email} disabled className="border rounded w-full p-2 bg-gray-100" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Phone Number</label>
                            <input {...register('phone', { required: true })} type="text" className="border rounded w-full p-2" />
                            {errors.phone && <p className="text-red-500">Phone Number is required</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">Street Address</label>
                            <input {...register('address', { required: true })} className="border rounded w-full p-2" />
                            {errors.address && <p className="text-red-500">Street Address is required</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">City</label>
                                <input {...register('city', { required: true })} className="border rounded w-full p-2" />
                            </div>
                            <div>
                                <label className="block text-gray-700">State</label>
                                <input {...register('state', { required: true })} className="border rounded w-full p-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Country</label>
                                <input {...register('country', { required: true })} className="border rounded w-full p-2" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Zipcode</label>
                                <input {...register('zipcode', { required: true })} className="border rounded w-full p-2" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" onChange={e => setIsChecked(e.target.checked)} className="mr-2" />
                            <label className="text-gray-700">I agree to the <Link className="text-blue-600 underline">Terms & Conditions</Link></label>
                        </div>

                        <button disabled={!isChecked} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Confirm Order</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
