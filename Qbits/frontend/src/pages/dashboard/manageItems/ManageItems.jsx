import React from 'react';
import { useDeleteItemMutation, useFetchAllItemsQuery } from '../../../redux/features/items/itemsApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageItems = () => {
    const navigate = useNavigate();
    const { data: items, refetch } = useFetchAllItemsQuery();
    const [deleteItem] = useDeleteItemMutation();

    // Handle deleting an item
    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id).unwrap();
            alert('Item deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete item:', error.message);
            alert('Failed to delete item. Please try again.');
        }
    };

    return (
        <section className="py-1 bg-green-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-green-700">All Scrap Items</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">#</th>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Item Name</th>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Category</th>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Condition</th>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                                    <th className="px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items && items.map((item, index) => (
                                    <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-green-700">{index + 1}</th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.name}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.category}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.condition}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${item.price}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                                            <Link to={`/dashboard/edit-item/${item._id}`} className="font-medium text-green-600 hover:text-green-700 mr-2 hover:underline underline-offset-2">Edit</Link>
                                            <button onClick={() => handleDeleteItem(item._id)} className="font-medium bg-red-500 py-1 px-4 rounded-full text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageItems;
