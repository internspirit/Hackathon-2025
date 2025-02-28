import React, { useEffect, useState } from 'react';
import InputField from '../addItem/InputField';
import SelectField from '../addItem/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchItemByIdQuery, useUpdateItemMutation } from '../../../redux/features/items/itemsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateItem = () => {
  const { id } = useParams();
  const { data: itemData, isLoading, isError, refetch } = useFetchItemByIdQuery(id);
  const [updateItem] = useUpdateItemMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');

  useEffect(() => {
    if (itemData) {
      setValue('name', itemData.name);
      setValue('description', itemData.description);
      setValue('category', itemData.category);
      setValue('price', itemData.price);
      setValue('condition', itemData.condition);
      setValue('image', itemData.image);
    }
  }, [itemData, setValue]);

  const onSubmit = async (data) => {
    const updatedItemData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      condition: data.condition,
      image: imageFileName || itemData.image,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/items/edit/${id}`, updatedItemData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      Swal.fire({
        title: "Item Updated",
        text: "Your scrap item has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });

      await refetch();
    } catch (error) {
      console.error("Failed to update item.", error);
      Swal.fire({
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
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

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-600 text-center">Error fetching item data.</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Update Your Scrap Item</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Item Name"
          name="name"
          placeholder="Enter item name"
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

        <SelectField
          label="Condition"
          name="condition"
          options={[
            { value: 'new', label: 'New' },
            { value: 'used', label: 'Used' },
            { value: 'damaged', label: 'Damaged' },
          ]}
          register={register}
        />

        <InputField
          label="Expected Price"
          name="price"
          type="number"
          placeholder="Enter price (optional)"
          register={register}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-green-700 mb-2">Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          {imageFileName && <p className="text-sm text-gray-600">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
