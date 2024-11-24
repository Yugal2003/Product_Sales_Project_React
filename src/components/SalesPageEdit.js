import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const SalesPageEdit = () => {
  const [productData, setProductData] = useState([]);
  const [updateShow, setUpdateShow] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showAddQuantityInput,setShowAddQuantityInput] =  useState(false);

  const { id } = useParams();
  console.log(id);

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const navigate = useNavigate();

  // Fetch product list
  const fetchProductList = async () => {
    try {
      const response = await API.get("/products");
      if (response) {
        // Filter out products with quantity of 0
        const availableProducts = response.data.filter(product => product.quantity > 0);
        setProductData(availableProducts);
      }
      console.log(selectedProducts);
    } catch (error) {
      console.error("Error fetching product list:", error.message);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/userData?id=${id}`);
      console.log(response.data[0]);
      setSelectedProducts(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUserData = async (e) => {
    e.preventDefault();
    try {
      // Create an update object excluding products
      const updatedUserData = {
        name: selectedProducts.name,
        email: selectedProducts.email,
        shippingAddress: selectedProducts.shippingAddress,
        billingAddress: selectedProducts.billingAddress,
        phone: selectedProducts.phone,
        date: selectedProducts.date,
        image: selectedProducts.image,
      };

      await API.patch(`/userData/${id}`, updatedUserData);
      toast.success("UserData Update Successfully !");
      setUpdateShow(false);
      fetchProduct(); // Refresh data after update
    } catch (error) {
      console.log("Update failed: ", error.message);
    }
  };

  
  const handleQuantityChange = (productId, value) => {
    console.log("8aee :", productId, "10 :", value);
    const quantity = parseInt(value) || ""; // Default to 1 if empty
    const product = productData.find(p => p.id === productId);

    if (quantity > product.quantity) { // Assuming 'availableStock' is a property in your product data
      toast.error(`Only ${product.quantity} items are available in stock.`);
      setQuantities(prevState => ({
        ...prevState,
        [productId]: '' // Reset the entered quantity if invalid
      }));
      // setQuantities({ ...quantities, [productId]: product.availableStock }); // Set to max available stock
    }
    else if (parseInt(quantity) < 1) {
      toast.error("Quantity must be at least 1.");
      setQuantities(prevState => ({
        ...prevState,
        [productId]: '' // Reset the entered quantity if less than 1
      }));
    }
    else {
      // setQuantities({ ...quantities, [productId]: quantity });
      setQuantities(prevState => ({
        ...prevState,
        [productId]: quantity // Store the new quantity entered
      }));
      console.log("one object with d633 with 5 quantity : ", quantities);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedProducts = selectedProducts.products.map((product) => {
        const newQuantity = quantities[product.id] || 0; // Get the new quantity input
        const totalQuantity = product.quantity + newQuantity; // Add the new quantity to the previous one
  
        // Update the quantity in the main product list
        const updatedProduct = productData.find(p => p.id === product.id);
        if (updatedProduct) {
          updatedProduct.quantity -= newQuantity; // Deduct the newly added quantity from the main product list
        }
  
        return {
          ...product,
          quantity: totalQuantity, // Store the updated quantity in the userData array
        };
      });
  
      // Prepare updated user data
      const updatedUserData = {
        ...selectedProducts,
        products: updatedProducts, // Update products array with new quantities
      };
  
      // Update user data in db.json
      await API.patch(`/userData/${id}`, updatedUserData);
  
      // Update product list in db.json
      await Promise.all(
        productData.map(product =>
          API.patch(`/products/${product.id}`, { quantity: product.quantity })
        )
      );
  
      toast.success("Product List Updated Successfully !");
      setUpdateShow(false);
      // Reset quantities for input fields
      setQuantities({});
      setShowAddQuantityInput(false)
      fetchProduct(); // Refresh data after update
      fetchProductList(); // Refresh product list after update
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const handleBack = () => {
    navigate('/sales')
  }
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-4 pb-2 rounded-lg w-[100%]">
        <h2 className="text-3xl mb-2">User Details</h2>

        <form className="space-y-2">
          {
            updateShow ? 
              (
                <>
                    <div className="">
                  <label>Name:</label>
                  <input
                    className="border-2 border-black rounded ml-7 pl-1"
                    type="text"
                    name="name"
                    value={selectedProducts.name || ""}
                    onChange={handleInputChange}
                  />
                    </div>
                    <div className="">
                      <label>Email:</label>
                      <input
                        className="border-2 border-black rounded ml-8 pl-1"
                        type="text"
                        name="email"
                        value={selectedProducts.email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Address1:</label>
                      <input
                        required
                        className="border-2 border-black rounded ml-1 pl-1"
                        type="text"
                        name="shippingAddress"
                        value={selectedProducts.shippingAddress || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Address2:</label>
                      <input
                        className="border-2 border-black rounded ml-1 pl-1"
                        type="text"
                        name="billingAddress"
                        value={selectedProducts.billingAddress || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="">
                      <label>Phone:</label>
                      <input
                        className="border-2 border-black rounded ml-7 pl-1"
                        type="text"
                        name="phone"
                        value={selectedProducts.phone || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Date:</label>
                      <input
                        className="border-2 border-black rounded ml-10 pl-1"
                        type="date"
                        name="date"
                        value={selectedProducts.date || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                </>
              ) 
              : 
              (
                <>
                    <div className="">
                      <label>Name:</label>
                      <input
                        disabled
                        className="border-2 border-black rounded ml-7 pl-1"
                        type="text"
                        name="name"
                        value={selectedProducts.name || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Email:</label>
                      <input
                        disabled
                        className="border-2 border-black rounded ml-8 pl-1"
                        type="text"
                        name="email"
                        value={selectedProducts.email || ""}
                        onChange={handleInputChange}
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
                        value={selectedProducts.shippingAddress || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Address2:</label>
                      <input
                        disabled
                        className="border-2 border-black rounded ml-1 pl-1"
                        type="text"
                        name="billingAddress"
                        value={selectedProducts.billingAddress || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="">
                      <label>Phone:</label>
                      <input
                        disabled
                        className="border-2 border-black rounded ml-7 pl-1"
                        type="text"
                        name="phone"
                        value={selectedProducts.phone || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label>Date:</label>
                      <input
                        disabled
                        className="border-2 border-black rounded ml-10 pl-1"
                        type="date"
                        name="date"
                        value={selectedProducts.date || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                </>
              )
          }
          {
            updateShow ?
              (
                <div className="flex justify-center gap-12 space-x-2 mr-4">
                  {/* <button
                  onClick={()=> setUpdateShow(!updateShow)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                >
                  Cancel
                </button> */}
                  <button
                    onClick={handleUpdateUserData}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Update
                  </button>
                </div>
              ) :
              (
                <div className='flex justify-center items-center mr-4 gap-8'>
                  {/* <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleBack}>Back</button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUpdateShow(!updateShow)
                    }}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              )
          }
        </form>
      </div>


      {/* Edit Products Title */}

      <div className='w-[70%] flex mx-auto justify-between'>
        <h1 className="text-2xl">Edit Products :</h1>
        <button className="bg-red-500 text-white px-2.5 py-1.5 rounded" onClick={() => setShowAddQuantityInput(true)}>Add Quantity</button>
      </div>

      {/*  edit and view functionality */}
      <div className='w-[100%] gap-4 mx-auto flex flex-row justify-between items-center'>
        <table className="mt-2 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="border border-gray-300 text-center text-md py-1 px-2">ID</th> */}
              <th className="border border-gray-300 text-center text-md py-1 px-2">Image</th>
              <th className="border border-gray-300 text-center text-md py-1 px-2">Name</th>
              <th className="border border-gray-300 text-center text-md">Category</th>
              <th className="border border-gray-300 text-center text-md">Color</th>
              <th className="border border-gray-300 text-center text-md">Quantity</th>
              {
                showAddQuantityInput && 
                (
                  <th className="border border-gray-300 text-center text-md">Add Quantity</th>
                )
              }
              <th className="border border-gray-300 text-center text-md">Price</th>
              <th className="border border-gray-300 text-center text-md">Total</th>
              {/* <th className="border border-gray-300 text-center text-md">Action</th> */}
              {/* <th className="border border-gray-300 text-center text-md">Download</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedProducts.products?.length > 0 ? (
              selectedProducts.products.map((ele, index) => (
                <tr key={ele.id}>
                  <td className="border border-gray-300">
                    <img className="img_photo" width={40} src={ele.image} alt="User Product" />
                  </td>
                  <td className="border border-gray-300">{ele.name}</td>
                  <td className="border border-gray-300">{ele.category}</td>
                  <td className="border border-gray-300">{ele.color}</td>
                  <td className="border border-gray-300">{ele.quantity}</td>
                  {
                    showAddQuantityInput && 
                    (
                      <td className="border border-gray-300">
                        <input
                          autoComplete="off"
                          required
                          min="1"
                          className="border-2 border-gray-500 rounded w-20 pl-2"
                          type="number"
                          value={quantities[ele.id] || ""} 
                          onChange={(e) => handleQuantityChange(ele.id, e.target.value)} // Update quantity state
                        />
                      </td>
                    )
                  }
                  <td className="border border-gray-300">{ele.price}</td>
                  <td className="border border-gray-300"> {ele.quantity * ele.price}</td>
                  {/* <td className="cursor-pointer flex gap-2 items-center justify-center pb-4">
                      <span onClick={() => handleEditSingleItem(ele)}>Edit</span>
                    </td> */}
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
        </table>
      </div>


      {/* back and update btn */}
      <div className='flex justify-around items-center mt-4'>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleBack}>Back</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  )
}

export default SalesPageEdit;