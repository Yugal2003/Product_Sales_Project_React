import React, { useState } from "react";
import { addProduct } from '../api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        category: "",
        quantity: "",
        price: "",
        producttype: "",
        color: "",
        weight: "",
        guarantee: "",
      });

      const navigate = useNavigate();

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const uploadImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };

      const closeCreateForm = () => {
        setFormData({
          name: "",
          image: "",
          category: "",
          quantity: "",
          price: "",
          producttype: "",
          color: "",
          weight: "",
          guarantee: "",
        });
        navigate('/');
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    console.log(formData);
        try {
          await addProduct(formData);
          toast.success("Add Product successfully!");
          setFormData({
            name: "",
            image: "",
            category: "",
            quantity: "",
            price: "",
            producttype: "",
            color: "",
            weight: "",
            guarantee: "",
          });
        navigate('/');
        } catch (error) {
          console.log(error.message);
          toast.error("Error While Create Product !");
        }
      };

  return (
    <div>
      <div className="mt-8 text-center flex items-center justify-center">
        <div className="p-6 rounded-lg w-[38%]">
          <h2 className="text-2xl mb-4">Add Products</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="">
              <label>Name:</label>
              <input
                className="border-2 border-black rounded ml-5 pl-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="">
              <label>Category:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="">
              <label>Quantity:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="">
              <label>Price:</label>
              <input
                className="border-2 border-black rounded ml-8 pl-1"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="">
              <label>Weight:</label>
              <input
                className="border-2 border-black rounded ml-4 pl-1"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="">
              <label>Guarantee:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="number"
                name="guarantee"
                value={formData.guarantee}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex justify-center gap-8 items-center pt-2">
              <div className="flex flex-row">
                <label className="pr-1">Product Type:</label>
                <div>
                  <input
                    type="radio"
                    name="producttype"
                    value="Physical"
                    onChange={handleInputChange}
                    required
                  />
                  <label className="ml-1">Physical</label>
                  <input
                    type="radio"
                    name="producttype"
                    value="Visual"
                    onChange={handleInputChange}
                    required
                  />
                  <label className="ml-1">Visual</label>
                </div>
              </div>

              <div className="flex flex-row">
                <label className="">Color:</label>
                <div>
                  <select
                    className=""
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                  >
                    <option className="" value="Red">
                      Red
                    </option>
                    <option className="" value="Sky">
                      Sky
                    </option>
                    <option className="" value="Gray">
                      Gray
                    </option>
                    <option className="" value="Blue">
                      Blue
                    </option>
                    <option className="" value="Black">
                      Black
                    </option>
                    <option className="" value="White">
                      White
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-center">
              <label className="pl-20">Upload Image:</label>
              <input
                className="ml-1 pl-1"
                required
                type="file"
                name="image"
                onChange={uploadImage}
              />
            </div>

            <div className="flex justify-evenly space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                onClick={closeCreateForm}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;