import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SalesInvoiceSingleProduct from "./SalesInvoiceSingleProduct";

const SalesInvoiceAllProducts = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const fetchProductList = async () => {
    try {
      const response = await API.get("/products");
      if (response) {
        console.log(response.data);
        setAllProductData(response.data);
      }
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

  const goToProductPage = () =>{
    // remove user from localstorage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate("/")
  }

  const goToSalesPage = () =>{
    // remove user from localstorage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate("/sales")
  }

  const goToSinglePageData = (ele) =>{
    navigate(`/sales/invoice/singleProduct/${ele.id}`)
  }
  return (
    <div>

{/* Sidebar */}
<div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex gap-2 justify-around mt-4">
            <h2 className="text-2xl mb-4">Menu</h2>
            <IoMenu size={35}
                onClick={toggleSidebar}
                className="bg-gray-800 text-white rounded-lg"/>
          </div>
          <nav className="space-y-2">

            <span onClick={goToProductPage} className="text-xl block hover:bg-gray-700 p-2 rounded">
              Product
            </span>

            <span
               onClick={goToSalesPage}
              className="text-xl block hover:bg-gray-700 p-2 rounded"
            >
              Sale Product
            </span>

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
              className="text-black rounded-lg"/>
            {/* <h1 className="text-2xl ml-16">Product List</h1> */}
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

      {/* table show */}
      <div>
        <h1 className="flex justify-center text-2xl underline">Products List</h1>
        <table className="mt-8 w-[72%] mx-auto text-center table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 text-center text-md">ID</th>
              <th className="border border-gray-300 text-center text-md">
                Name
              </th>
              <th className="border border-gray-300 text-center text-md">
                Image
              </th>
              <th className="border border-gray-300 text-center text-md">
                Category
              </th>
              <th className="border border-gray-300 text-center text-md">
                Quantity
              </th>
              <th className="border border-gray-300 text-center text-md">
                Price
              </th>
              <th className="border border-gray-300 text-center text-md">
                Product Type
              </th>
              <th className="border border-gray-300 text-center text-md">
                Color
              </th>
              <th className="border border-gray-300 text-center text-md">
                Weight
              </th>
              <th className="border border-gray-300 text-center text-md">
                Guarantee
              </th>
              <th className="border border-gray-300 text-center text-md">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allProductData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Products Available !!!
                </td>
              </tr>
            ) : (
              allProductData.map((ele, index) => (
                <tr key={ele.id}>
                  <td className="border border-gray-300">{index + 1}</td>
                  <td className="border border-gray-300">{ele.name}</td>
                  <img width={40} src={ele.image} alt="" />
                  <td className="border border-gray-300">{ele.category}</td>
                  <td className="border border-gray-300">{ele.quantity}</td>
                  <td className="border border-gray-300">{ele.price}</td>
                  <td className="border border-gray-300">{ele.producttype}</td>
                  <td className="border border-gray-300">{ele.color}</td>
                  <td className="border border-gray-300">{ele.weight}</td>
                  <td className="border border-gray-300">{ele.guarantee}</td>
                  <td className="cursor-pointer flex gap-4 items-center justify-center pb-2">
                    <span>
                      {/* <NavLink to={`/sales/invoice/singleProduct/${ele.id}`}><CiCirclePlus
                        size={25}
                      /></NavLink> */}
                      <CiCirclePlus
                      onClick={()=> goToSinglePageData(ele)}
                        size={25}
                      />
                    </span>
                    <span>
                      <FaEye
                        // onClick={() => handleViewClick(ele)}
                        size={20}
                      />
                    </span>
                  </td>
                  {/* <td className="cursor-pointer flex gap-2 items-center justify-center pb-4"><span className="bord" onClick={()=> handleEditClick(ele)}>Edit</span><span className="bord1" onClick={()=> handleViewClick(ele)}>View</span><span className="bord2" onClick={()=> handleDeleteClick(ele)}>Delete</span></td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInvoiceAllProducts;