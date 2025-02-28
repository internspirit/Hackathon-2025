import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddItemMutation } from '../../../redux/features/items/itemsApi';
import Swal from 'sweetalert2';

const AddItem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [addItem, { isLoading, isError }] = useAddItemMutation();
    const [imageFileName, setImageFileName] = useState('');

    const onSubmit = async (data) => {
        const newItemData = {
            ...data,
            image: imageFileName
        };
        try {
            await addItem(newItemData).unwrap();
            Swal.fire({
                title: "Item listed",
                text: "Your scrap item has been listed successfully!",
                icon: "success",
                confirmButtonColor: "#4CAF50",
            });
            reset();
            setImageFileName('');
            setImageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Failed to list item",
                text: "Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">List Your Scrap Item</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Item Name"
                    name="name"
                    placeholder="Enter scrap item name"
                    register={register}
                />
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Describe the item"
                    type="textarea"
                    register={register}
                />
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Select Category' },
                        { value: 'metal', label: 'Metal' },
                        { value: 'plastic', label: 'Plastic' },
                        { value: 'paper', label: 'Paper' },
                        { value: 'electronics', label: 'Electronics' },
                    ]}
                    register={register}
                />
                <InputField
                    label="Expected Price"
                    name="price"
                    type="number"
                    placeholder="Set a price (optional)"
                    register={register}
                />
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-green-700 mb-2">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
                    {imageFileName && <p className="text-sm text-gray-600">Selected: {imageFileName}</p>}
                </div>
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {isLoading ? "Listing..." : "List Item"}
                </button>
            </form>
        </div>
    );
};

export default AddItem;
