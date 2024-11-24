import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SalesPageView = () => {
  const [productData, setProductData] = useState({});

  const { id } = useParams();
  console.log(id);

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const navigate = useNavigate();

const fetchProduct = async () => {
    try {
      const response = await API.get(`/userData?id=${id}`);
      console.log(response.data[0]);
      setProductData(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const backToSalesPage = (ele) =>{
    navigate(`/sales`)
  }

   // Calculate grand total
   const calculateGrandTotal = () => {
    return productData.products?.reduce((total, product) => {
      const quantity = parseInt(product.quantity, 10) || 0;
      const price = parseInt(product.price) || 0;
      return total + quantity * price;
    }, 0) || 0;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg w-[100%]">
        <h2 className="text-3xl mb-2">User Details</h2>

        <form className="space-y-2">
          {/* <div className='flex flex-row justify-start pl-4 items-center gap-4'>
              <img className='borderRadious' src={productData.image} alt=''/>
          </div> */}
          <div className="">
            <label>Name:</label>
            <input
            disabled
              className="border-2 border-black rounded ml-7 pl-1"
              type="text"
              name="name"
              value={productData.name || ""}
            // onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label>Email:</label>
            <input
            disabled
              className="border-2 border-black rounded ml-8 pl-1"
              type="text"
              name="email"
              value={productData.email || ""}
            // onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label>Address1:</label>
            <input
            disabled
              required
              className="border-2 border-black rounded ml-1 pl-1"
              type="text"
              name="shippingAddress"
              value={productData.shippingAddress || ""}
              // onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label>Address2:</label>
            <input
            disabled
              className="border-2 border-black rounded ml-1 pl-1"
              type="text"
              name="billingAddress"
              value={productData.billingAddress || ""}
            // onChange={handleInputChange}
            />
          </div>

          <div className="">
            <label>Phone:</label>
            <input
            disabled
              className="border-2 border-black rounded ml-7 pl-1"
              type="text"
              name="phone"
              value={productData.phone || ""}
            // onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label>Date:</label>
            <input
            disabled
              className="border-2 border-black rounded ml-10 pl-1"
              type="date"
              name="date"
              value={productData.date || ""}
            // onChange={handleInputChange}
            />
          </div>
          
          <div className='flex justify-center items-center mr-4'>
                 <button
                    onClick={backToSalesPage}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
              </div>
        </form>
      </div>


      {/*  edit and view functionality */}
      <div className='w-[100%] gap-4 mx-auto flex flex-row justify-between items-center'>
          <table className="mt-4 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {/* <th className="border border-gray-300 text-center text-md py-1 px-2">ID</th> */}
                <th className="border border-gray-300 text-center text-md py-1 px-2">Image</th>
                <th className="border border-gray-300 text-center text-md py-1 px-2">Name</th>
                <th className="border border-gray-300 text-center text-md">Category</th>
                <th className="border border-gray-300 text-center text-md">Color</th>
                <th className="border border-gray-300 text-center text-md">Quantity</th>
                <th className="border border-gray-300 text-center text-md">Price</th>
                <th className="border border-gray-300 text-center text-md">Total</th>
                {/* <th className="border border-gray-300 text-center text-md">Action</th> */}
                {/* <th className="border border-gray-300 text-center text-md">Download</th> */}
              </tr>
            </thead>
            <tbody>
              {productData.products?.length > 0 ? (
                productData.products.map((ele, index) => (
                  <tr key={ele.id}>
                    <td className="border border-gray-300">
                      <img className="img_photo" width={50} src={ele.image} alt="User Product" />
                    </td>
                    <td className="border border-gray-300">{ele.name}</td>
                    <td className="border border-gray-300">{ele.category}</td>
                    <td className="border border-gray-300">{ele.color}</td>
                    <td className="border border-gray-300">{ele.quantity}</td>
                    <td className="border border-gray-300">{ele.price}</td>
                    <td className="border border-gray-300">{ele.quantity * ele.price}</td>
                    <td className="cursor-pointer flex gap-2 items-center justify-center pb-4">
                      {/* <span onClick={() => handleEditSingleItem(ele)}>Edit</span> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="text-right font-bold py-2">Grand Total:</td>
                <td className="font-bold">
                  {calculateGrandTotal()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>
  )
}

export default SalesPageView;