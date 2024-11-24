import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [selectedEditProduct, setSelectedEditProduct] = useState({});

  const { id } = useParams();
  console.log(id);

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products?id=${id}`);
      console.log(response.data[0]);
      setSelectedEditProduct(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEditProduct((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const uploadEditImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedEditProduct((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };
  


  const backToHomePage = () => {
    navigate('/');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedEditProduct.name || selectedEditProduct.name.length < 3) {
        toast.error("A valid name with at least 3 characters is required!");
        return;
      }
      if (selectedEditProduct.category === "") {
        toast.error("Category is Required !");
        return;
      }
      if (selectedEditProduct.quantity === "") {
        toast.error("Quantity is Required !");
        return;
      }
      if (selectedEditProduct.price === "") {
        toast.error("Price is Required !");
        return;
      }
      if (selectedEditProduct.weight === "") {
        toast.error("Weight is Required !");
        return;
      }
      if (selectedEditProduct.guarantee === "") {
        toast.error("Guarantee is Required !");
        return;
      }
      if (selectedEditProduct.producttype === "") {
        toast.error("Product Type is Required !");
        return;
      }
      if (selectedEditProduct.color === "") {
        toast.error("Color is Required !");
        return;
      }
      if (selectedEditProduct.image === "") {
        toast.error("Image is Required !");
        return;
      }
      await API.put(`/products/${selectedEditProduct.id}`, selectedEditProduct);
      toast.success("Product Updated Successfully!");
        navigate('/');
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error While Updating Data!");
    }
  };

  return (
    <div>
      <div className="mt-8 text-center flex items-center justify-center">
        <div className="p-6 rounded-lg w-[38%]">
          <h2 className="text-2xl mb-4">Edit Product</h2>

          <form className="space-y-4">
            <div className="">
              <label>Name:</label>
              <input
                className="border-2 border-black rounded ml-5 pl-1"
                type="text"
                name="name"
                value={selectedEditProduct.name}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="">
              <label>Category:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="text"
                name="category"
                value={selectedEditProduct.category}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="">
              <label>Quantity:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="text"
                name="quantity"
                value={selectedEditProduct.quantity}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="">
              <label>Price:</label>
              <input
                className="border-2 border-black rounded ml-8 pl-1"
                type="text"
                name="price"
                value={selectedEditProduct.price}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="">
              <label>Weight:</label>
              <input
                className="border-2 border-black rounded ml-4 pl-1"
                type="text"
                name="weight"
                value={selectedEditProduct.weight}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="">
              <label>Guarantee:</label>
              <input
                className="border-2 border-black rounded ml-1 pl-1"
                type="text"
                name="guarantee"
                value={selectedEditProduct.guarantee}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="flex justify-center items-center">
              {/* <div className="flex flex-row">
                <label className="pr-1">Product Type:</label>
                <div>
                  <input
                    type="radio"
                    name="producttype"
                    value="Physical"
                    onChange={handleEditInputChange}
                  />
                  <label className="ml-1">Physical</label>
                  <input
                    type="radio"
                    name="producttype"
                    value="Visual"
                    onChange={handleEditInputChange}
                  />
                  <label className="ml-1">Visual</label>
                </div>
              </div> */}

              <div className="flex flex-row justify-center items-center">
                <label className="">Color:</label>
                <div>
                  <select
                    className="w-24 p-1"
                    name="color"
                    value={selectedEditProduct.color}
                    onChange={handleEditInputChange}
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

            <div className="mt-2 flex justify-center items-center">
              {/* <label className="pl-20">Upload Image:</label> */}
              <img className="img_edit_product" src={selectedEditProduct.image} alt="product_img"/>
              <input className="ml-1 pl-1" type="file" onChange={uploadEditImage} />
            </div>

            <div className="flex justify-evenly space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                onClick={backToHomePage}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleEditSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;