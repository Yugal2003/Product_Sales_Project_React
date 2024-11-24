import React, { useEffect, useState } from "react";
import axios from "axios";
// import { updateUserData } from "../api";
import { useParams,useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import toast from "react-hot-toast";

const SalesInvoiceSingleProduct = () => {
  const [singleProductData, setSingleProductData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({
    // name: singleProductData.name,
    // image: singleProductData.image,
    // category: singleProductData.category,
    quantity: "",
    // price: singleProductData.price,
    // producttype: singleProductData.producttype,
    // color: singleProductData.color,
    // weight: singleProductData.weight,
    // guarantee: singleProductData.guarantee,
  });

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const fetchProductList = async () => {
    try {
      const response = await API.get(`/products?id=${id}`);
      console.log(response.data[0]);
      setSingleProductData(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
    console.log(userData);
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (userData.quantity === '') {
      toast.error("Please Enter an Quantity Number !")
      return;
    }
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      console.error("User email not found. Ensure user is logged in.");
      return;
    }

    // Combine user data and product data
    const newProductData = {
      ...singleProductData,
      quantity: userData.quantity,
    };
    try {
      // Fetch existing user data from db.json to check if user already exists
      const response = await API.get(`/userData?email=${user.email}`);
      const existingUserData = response.data[0];

      if (existingUserData) {
        // If user exists, append the new product to their product list
        const updatedUserData = {
          ...existingUserData,
          products: [...(existingUserData.products || []), newProductData],
        };

        // Update user data in db.json
        await API.put(`/userData/${existingUserData.id}`, updatedUserData);
        toast.success("Product Added successfully!");
        navigate("/sales/invoice/allProducts");
      } else {
        // If user doesn't exist, create a new user with product data
        const newUserData = {
          id: user.id,
          email: user.email,
          products: [newProductData],
        };

        // Add new user data to db.json
        await API.post(`/userData`, newUserData);
        toast.success("Product added for new user successfully!");
      }
    }
    catch (error) {
      console.error("Error updating user data:", error.message);
      toast.error("Failed to add product. Please try again.");
    }
  }
  return (
    <div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex gap-2 justify-around mt-4">
          <h2 className="text-2xl mb-4">Menu</h2>
          <IoMenu
            size={35}
            onClick={toggleSidebar}
            className="bg-gray-800 text-white rounded-lg"
          />
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className="text-xl block hover:bg-gray-700 p-2 rounded"
          >
            Product
          </NavLink>

          <NavLink
            to="/sales"
            className="text-xl block hover:bg-gray-700 p-2 rounded"
          >
            Sale Product
          </NavLink>

          {/* <NavLink
              to="/sales"
              className="block hover:bg-gray-700 p-2 rounded"
            >
              Sales
            </NavLink> */}
        </nav>
      </div>

      {/* heading */}
      <div className="mt-8 flex flex-row w-[95%] mx-auto justify-between items-center">
        <div className="flex gap-4">
          <h1 className="text-2xl">Menu</h1>
          <IoMenu
            size={35}
            onClick={toggleSidebar}
            className="text-black rounded-lg"
          />
          {/* <h1 className="text-2xl">Product Management System</h1> */}
        </div>
        {/* <button
              onClick={toggleSidebar}
              className="p-2 bg-gray-800 text-white rounded-lg lg:hidden"
            >
              Menu
            </button> */}
        <div className="flex flex-row gap-4">
          {/* <NavLink to='/'>Product</NavLink> */}
          {/* <NavLink to='/sales'>Sale Products</NavLink> */}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg w-[100%]">
        <h2 className="text-2xl mb-4">Add Product</h2>

        <form className="space-y-4">
          <div className="">
            <label>Name:</label>
            <input
              disabled
              className="border-2 border-black rounded ml-5 pl-1"
              type="text"
              name="name"
              value={singleProductData.name}
            // onChange={handleEditInputChange}
            />
          </div>
          <div className="">
            <label>Category:</label>
            <input
              disabled
              className="border-2 border-black rounded ml-1 pl-1"
              type="text"
              name="category"
              value={singleProductData.category}
            // onChange={handleEditInputChange}
            />
          </div>
          <div className="">
            <label>Quantity:</label>
            <input
              required
              className="border-2 border-black rounded ml-1 pl-1"
              type="text"
              name="quantity"
              value={userData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label>Price:</label>
            <input
              disabled
              className="border-2 border-black rounded ml-8 pl-1"
              type="text"
              name="price"
              value={singleProductData.price}
            // onChange={handleEditInputChange}
            />
          </div>

          <div className="">
            <label>Weight:</label>
            <input
              disabled
              className="border-2 border-black rounded ml-4 pl-1"
              type="text"
              name="weight"
              value={singleProductData.weight}
            // onChange={handleEditInputChange}
            />
          </div>
          <div className="">
            <label>Guarantee:</label>
            <input
              disabled
              className="border-2 border-black rounded ml-1 pl-1"
              type="text"
              name="guarantee"
              value={singleProductData.guarantee}
            // onChange={handleEditInputChange}
            />
          </div>

          <div className="flex w-96 justify-evenly items-center pt-2">
            <div className="flex flex-row">
              <label className="pr-1">Product Type:</label>
              {/* <div>
                  <span class
                  Name="pl-2">{singleProductData.producttype}</span>
              </div> */}
              <input
                disabled
                className="w-[35%] border-black rounded ml-1 pl-1"
                type="text"
                name="producttype"
                value={singleProductData.producttype}
              // onChange={handleEditInputChange}
              />
            </div>

            <div className="flex flex-row">
              <label className="">Color:</label>
              {/* <div>
                  <span  className="">{singleProductData.color}</span>
              </div> */}
              <input
                disabled
                className="w-[30%] border-black rounded ml-1 pl-1"
                type="text"
                name="color"
                value={singleProductData.color}
              // onChange={handleEditInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-2">
            <span className="text-xl mt-4">Image</span>
            <img width={150} src={singleProductData.image} alt="llogo" />
            {/* <input
            disabled
              className="w-[30%] border-black rounded ml-1 pl-1"
              type="image"
              src={singleProductData.image}
              alt=""
              name="color"
              // onChange={handleEditInputChange}
            /> */}
            {/* <input
              type="file"
              // onChange={uploadEditImage}
            /> */}
          </div>

          <div className="flex justify-evenly space-x-4 mt-4">
            <NavLink to='/sales/invoice/allProducts'><button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
            >
              Cancel
            </button></NavLink>
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesInvoiceSingleProduct;