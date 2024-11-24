import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const [selectedViewProduct, setSelectedViewProduct] = useState({});

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
      setSelectedViewProduct(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const backToHomePage = () => {
    navigate('/');
  };
  
  return (
    <div>
      <div className="mt-8 text-center flex items-center justify-center">
        <div className=" p-6 rounded-lg w-[38%]">
          <h2 className="text-2xl mb-4">View Product</h2>

          <form className="space-y-4">
            <div className="">
              <label className="mr-6">Name :</label>
              <input
                disabled
                className="border-2 rounded ml-4 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.name}
              />
            </div>
            <div className="">
              <label>Category :</label>
              <input
                disabled
                className="border-2 rounded ml-5 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.category}
              />
            </div>
            <div className="">
              <label>Quantity :</label>
              <input
                disabled
                className="border-2 rounded ml-5 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.quantity}
              />
            </div>
            <div className="">
              <label className="mr-6">Price :</label>
              <input
                disabled
                className="border-2 rounded ml-5 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.price}
              />
            </div>

            <div className="">
              <label  className="mr-2">Weight :</label>
              <input
                disabled
                className="border-2 rounded ml-5 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.weight}
              />
            </div>
            <div className="">
              <label>Guarantee :</label>
              <input
                disabled
                className="border-2 rounded ml-1 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.guarantee}
              />
            </div>

            {/* <div className="flex justify-around items-center pt-2"> */}
            <div className="">
              <label  className="mr-4">Type :</label>
              <input
                disabled
                className="border-2 rounded ml-8 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.producttype}
              />
            </div>

            <div className="">
              <label className="mr-4">Color :</label>
              <input
                disabled
                className="border-2 rounded ml-7 pl-1"
                type="text"
                name="name"
                value={selectedViewProduct.color}
              />
            </div>
            {/* </div> */}

            <div className="mt-2 flex flex-col items-center justify-center">
              <img className="rounded-full" width={80} src={selectedViewProduct.image} alt="product_img" /><br/>
              <label>Product Image:</label>
            </div>

            <div className="flex justify-evenly space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                onClick={backToHomePage}
              >
                Close
              </button>
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleEditSubmit}>Update</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;