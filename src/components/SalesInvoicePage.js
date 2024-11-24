// import React, { useState,useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { IoMenu } from "react-icons/io5";
// import { FaBars } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { addUser } from "../api";
// import axios from "axios";
// import { CiCirclePlus } from "react-icons/ci";

// const SalesInvoicePage = () => {
//   const [addModelOpen,setAddModelOpen] = useState(false);
//   const [singleProductData, setSingleProductData] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [productData,setProductData] = useState([])
//   const [addedData, setAddedData] = useState({});
//   const [userData, setUserData] = useState({
//     image: "",
//     name: "",
//     email: "",
//     shippingAddress: "",
//     billingAddress: "",
//     phone: "",
//     date: "",
//     invoiceId: "",
//     shipmentId: ""
//   });

//   const API = axios.create({
//     baseURL: "http://localhost:3001",
//   });

//   const fetchProductList = async () => {
//     try {
//       const response = await API.get("/products");
//       if (response) {
//         console.log(response.data);
//         setProductData(response.data);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProductList();
//   }, [addModelOpen]);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };


// //   const handleAddInputChange = (e, productId) => {
// //     console.log(productId);
// //     const { value } = e.target;
// //     console.log(value);
// //     setAddedData(prevState => ({
// //         ...prevState,
// //         [productId]: value  // Use productId as key
// //     }));
// // };





// const handleAddInputChange = (e, productId) => {
//   const { value } = e.target;

//   // Find the product based on the productId
//   const product = productData.find(item => item.id === productId);

//   if (product) {
//     const availableQuantity = product.quantity; // Assuming 'quantity' field in productData represents stock level

//     // Check if the entered value is greater than the available stock
//     if (parseInt(value) > availableQuantity) {
//       toast.error(`Only ${availableQuantity} items are available in stock.`);
//       setAddedData(prevState => ({
//         ...prevState,
//         [productId]: '' // Reset the entered quantity if invalid
//       }));
//     } else if (parseInt(value) < 1) {
//       toast.error("Quantity must be at least 1.");
//       setAddedData(prevState => ({
//         ...prevState,
//         [productId]: '' // Reset the entered quantity if less than 1
//       }));
//     } 
//     else {
//       setAddedData(prevState => ({
//         ...prevState,
//         [productId]: value  // Valid quantity, update the state
//       }));
//     }
//   }
// };


//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setUserData({ ...userData, image: reader.result });
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (userData.phone.length !== 10) {
//       toast.error("Phone number must be exactly 10 digits.");
//       return;
//     }

//     // Validate email format
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(userData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       await addUser(userData);
//       toast.success("User Add Successfully!");
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUserData({
//         image: "",
//         name: "",
//         email: "",
//         shippingAddress: "",
//         billingAddress: "",
//         phone: "",
//         date: "",
//         invoiceId: "",
//         shipmentId: ""
//       });
//     } catch (error) {
//       if (error.message === 'Email already registered') {
//         toast.error('Email is Already Used !');
//       } else {
//         toast.error('Registration Failed !');
//       }
//     }
//   };

// const handleAddProductsClick = () => {
//   // Check if user data is in localStorage
//   // const user = JSON.parse(localStorage.getItem('user'));

//   // if (!user) {
//     // Show toast error if user data is not found
//     // toast.error("Please Filled up Data & Then Add Products !.");
//   // } else {
//     // Navigate to SalesInvoiceAllProducts page if user data exists
//     // navigate('/sales/invoice/allProducts');
//     setAddModelOpen(!addModelOpen);
//   // }
// };

//   // const handleAddProductWithUserData = async(event,singleProductData) =>{
//   //   event.preventDefault();
//   //   if (!addedData || typeof addedData !== "string" || addedData.trim() === "") {
//   //     toast.error("Please Enter an Quantity Number !")
//   //     return;
//   //   }
//   //   // console.log(addedData[0].va);
//   //   console.log(addedData[0]);
//   //   console.log(addedData.productId);

//   //   // Retrieve user data from localStorage
//   //   const user = JSON.parse(localStorage.getItem('user'));
//   //   if (!user || !user.email) {
//   //     console.error("User Email Not Found, Please Fill Form !");
//   //     return;
//   //   }

//   //   // Combine user data and product data
//   //   console.log(singleProductData);

//   //   const newProductData = {
//   //     ...singleProductData,
//   //     quantity: addedData,
//   //   };
//   //   try {
//   //     // Fetch existing user data from db.json to check if user already exists
//   //     const response = await API.get(`/userData?email=${user.email}`);
//   //     const existingUserData = response.data[0];

//   //     if (existingUserData) {
//   //       // If user exists, append the new product to their product list
//   //       const updatedUserData = {
//   //         ...existingUserData,
//   //         products: [...(existingUserData.products || []), newProductData],
//   //       };

//   //       // Update user data in db.json
//   //       await API.put(`/userData/${existingUserData.id}`, updatedUserData);
//   //       toast.success("Product Added successfully!");
//   //       setAddedData({})
//   //       // navigate("/sales/invoice/allProducts");
//   //     } else {
//   //       // If user doesn't exist, create a new user with product data
//   //       const newUserData = {
//   //         id: user.id,
//   //         email: user.email,
//   //         products: [newProductData],
//   //       };

//   //       // Add new user data to db.json
//   //       await API.post(`/userData`, newUserData);
//   //       toast.success("Product added for new user successfully!");
//   //       setSingleProductData([])
//   //     }
//   //   }
//   //   catch (error) {
//   //     console.error("Error updating user data:", error.message);
//   //     toast.error("Failed to add product. Please try again.");
//   //   }
//   // }

//   // const handleAddProductWithUserData = async (event, singleProduct) => {
//   //   event.preventDefault();

//   //   const quantity = addedData[singleProduct.id]; // Get the specific quantity for this product

//   //   if (!quantity || parseInt(quantity) < 1) {
//   //     toast.error("Please enter a valid quantity!");
//   //     return;
//   //   }

//   //   // Retrieve user data from localStorage
//   //   const user = JSON.parse(localStorage.getItem('user'));
//   //   if (!user || !user.email) {
//   //     console.error("User email not found. Please fill the form!");
//   //     return;
//   //   }

//   //   const newProduct = {
//   //     ...singleProduct,
//   //     quantity: parseInt(quantity),
//   //   };

//   //   try {
//   //     // Check if user data exists in `db.json`
//   //     const response = await API.get(`/userData?email=${user.email}`);
//   //     const existingUserData = response.data[0];

//   //     if (existingUserData) {
//   //       // User exists: Add product to existing list
//   //       const updatedUserData = {
//   //         ...existingUserData,
//   //         products: [...(existingUserData.products || []), newProduct],
//   //       };

//   //       await API.put(`/userData/${existingUserData.id}`, updatedUserData);
//   //       toast.success("Product added successfully!");
//   //     } else {
//   //       // New user: Create user with this product
//   //       const newUserData = {
//   //         ...user,
//   //         products: [newProduct],
//   //       };

//   //       await API.post(`/userData`, newUserData);
//   //       toast.success("Product added for a new user successfully!");
//   //     }

//   //     // Update localStorage
//   //     const updatedLocalStorageUser = {
//   //       ...user,
//   //       products: [...(user.products || []), newProduct],
//   //     };
//   //     localStorage.setItem('user', JSON.stringify(updatedLocalStorageUser));

//   //     // Reset form states
//   //     setAddedData((prev) => ({
//   //       ...prev,
//   //       [singleProduct.id]: '', // Reset quantity for this product
//   //     }));
//   //     setSingleProductData([]);
//   //   } catch (error) {
//   //     console.error("Error updating user data:", error.message);
//   //     toast.error("Failed to add product. Please try again.");
//   //   }
//   // };


//   const handleAddProductWithUserData = async (event, singleProduct) => {
//     event.preventDefault();

//     const quantity = addedData[singleProduct.id]; // Get the specific quantity for this product

//     if (!quantity || parseInt(quantity) < 1) {
//       toast.error("Please enter a valid quantity!");
//       return;
//     }

//     // Retrieve user data from localStorage
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.email) {
//       console.error("User email not found. Please fill the form!");
//       return;
//     }

//     const newProduct = {
//       ...singleProduct,
//       quantity: parseInt(quantity),
//     };

//     try {
//       // Check if user data exists in `db.json`
//       const response = await API.get(`/userData?email=${user.email}`);
//       const existingUserData = response.data[0];

//       if (existingUserData) {
//         // Check if the product already exists in the user's products array
//         const productIndex = existingUserData.products.findIndex(
//           (product) => product.id === singleProduct.id
//         );

//         if (productIndex !== -1) {
//           // Product exists, update the quantity
//           const updatedProducts = [...existingUserData.products];
//           updatedProducts[productIndex].quantity += newProduct.quantity;

//           const updatedUserData = {
//             ...existingUserData,
//             products: updatedProducts,
//           };

//           await API.put(`/userData/${existingUserData.id}`, updatedUserData);
//           toast.success("Product quantity updated successfully!");
//         } else {
//           // Product does not exist, add the new product
//           const updatedUserData = {
//             ...existingUserData,
//             products: [...(existingUserData.products || []), newProduct],
//           };

//           await API.put(`/userData/${existingUserData.id}`, updatedUserData);
//           toast.success("Product added successfully!");
//         }
//       } else {
//         // New user: Create user with this product
//         const newUserData = {
//           ...user,
//           products: [newProduct],
//         };

//         await API.post(`/userData`, newUserData);
//         toast.success("Product added for a new user successfully!");
//       }

//       // Update localStorage with the new product data
//       const updatedLocalStorageUser = {
//         ...user,
//         products: [...(user.products || []), newProduct],
//       };
//       localStorage.setItem('user', JSON.stringify(updatedLocalStorageUser));

//       // Reset form states
//       setAddedData((prev) => ({
//         ...prev,
//         [singleProduct.id]: '', // Reset quantity for this product
//       }));
//       setSingleProductData([]);
//     } catch (error) {
//       console.error("Error updating user data:", error.message);
//       toast.error("Failed to add product. Please try again.");
//     }
//   };

//   // const handleAddProduct = async (e,data) => {
//   //   if (!addedData || typeof addedData !== "string" || addedData.trim() === "") {
//   //     toast.error("Please Enter a Quantity Number!");
//   //     return; // Stop the function execution
//   //   }

//   //   setSingleProductData(data)
//   //   handleAddProductWithUserData(e,data)
//   // }

//   const handleAddProduct = (e, data) => {
//     if (!addedData[data.id]) {
//       toast.error("Please enter a quantity before adding!");
//       return;
//     }

//     setSingleProductData(data);
//     handleAddProductWithUserData(e, data);
//   };


//   return (
//     <div>
//       <div>

//         {/* Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//             }`}
//         >
//           <div className="flex gap-2 justify-around mt-4">
//             <h2 className="text-2xl mb-4">Menu</h2>
//             <IoMenu size={35}
//               onClick={toggleSidebar}
//               className="bg-gray-800 text-white rounded-lg" />
//           </div>
//           <nav className="space-y-2">

//             <NavLink to="/" className="text-xl block hover:bg-gray-700 p-2 rounded">
//               Product
//             </NavLink>

//             <NavLink
//               to="/sales"
//               className="text-xl block hover:bg-gray-700 p-2 rounded"
//             >
//               Sale Product
//             </NavLink>
//           </nav>
//         </div>

//         {/* heading */}
//         <div className="mt-8 flex flex-row w-[95%] mx-auto justify-between items-center">
//           <div className="flex gap-4">
//             <h1 className="text-2xl">Menu</h1>
//             <IoMenu
//               size={35}
//               onClick={toggleSidebar}
//               className="text-black rounded-lg" />
//             {/* <h1 className="text-2xl">Product Management System</h1> */}
//           </div>
//           {/* <button
//                   onClick={toggleSidebar}
//                   className="p-2 bg-gray-800 text-white rounded-lg lg:hidden"
//                 >
//                   Menu
//                 </button> */}
//           <div className="flex flex-row gap-4 w-[10%] mt-2">
//             {/* <NavLink to='/'>Product</NavLink> */}
//             {/* <button
//               className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//               onClick={handleAddProductsClick}
//             >
//               Add Products
//             </button> */}
//             {/* <NavLink to='/sales'>Sale Products</NavLink> */}
//           </div>
//         </div>


//         <div className="mt-2 p-2 flex flex-col justify-center items-center rounded-lg">
//           <h2 className="text-3xl mb-4">User Page</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             <div className="flex justify-between gap-4">
//                 <div className="flex flex-row gap-6">
//                   <label>FirstName:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-2"
//                     type="text"
//                     name="name"
//                     value={userData.name}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-row gap-6">
//                   <label>Email :</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-2"
//                     type="email"
//                     name="email"
//                     value={userData.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-row gap-4">
//                   <label>Phone:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-2"
//                     type="number"
//                     name="phone"
//                     value={userData.phone}
//                     onChange={handleInputChange}
//                     maxLength={10}
//                   />
//                 </div>
//             </div>

//             <div className="flex">
//                 <div className="flex flex-row gap-8">
//                   <label>Address1:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-4"
//                     type="text"
//                     name="shippingAddress"
//                     value={userData.shippingAddress}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-row gap-2">
//                   <label>Address2:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-6"
//                     type="text"
//                     name="billingAddress"
//                     value={userData.billingAddress}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="flex flex-row gap-8">
//                   <label>Date:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded w-[100%]"
//                     type="date"
//                     name="date"
//                     value={userData.date}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//             </div>

//             <div className="flex">
//                 <div className="flex flex-row gap-8">
//                   <label>Invoice Id:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded mr-4"
//                     type="number"
//                     name="invoiceId"
//                     value={userData.invoiceId}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="flex flex-row gap-6">
//                   <label>Ship Id:</label>
//                   <input
//                     required
//                     className="border-2 border-black rounded"
//                     type="number"
//                     name="shipmentId"
//                     value={userData.shipmentId}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//             </div>

//             <div className="mt-4 flex flex-row justify-center">
//               <label>Upload Image:</label>
//               <input
//                 required
//                 type="file"
//                 name="image"
//                 value={userData.image}
//                 onChange={uploadImage}
//               />
//             </div>

//             {/* <div className="w-[90%] items-center flex flex-col justify-evenly space-x-4 mt-4">
//               <button className="bg-green-400 text-white px-4 py-2 rounded mt-4 mr-1">
//                 Submit
//               </button>
//             </div> */}
//           </form>
//         </div>

//         <div className="mt-0 flex flex-row w-[70%] mx-auto justify-between items-center">
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//             onClick={handleAddProductsClick}
//           >
//             Add Products
//           </button>
//         </div>


//           {addModelOpen && (
//            <>
//               <div>
//                   <table className="mt-8 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
//                     <thead>
//                       <tr className="bg-gray-200">
//                         <th className="border border-gray-300 text-center text-md">
//                           ID
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Name
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Image
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Category
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Quantity
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Price
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Product Type
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Color
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Weight
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Guarantee
//                         </th>
//                         <th className="border border-gray-300 text-center text-md">
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {productData.length === 0 ? (
//                         <tr>
//                           <td colSpan="6" className="text-center py-4">
//                             No Products Available !!!
//                           </td>
//                         </tr>
//                       ) : (
//                         productData.map((ele, index) => (
//                           <tr key={ele.id}>
//                             <td className="border border-gray-300">{index + 1}</td>
//                             <td className="border border-gray-300">{ele.name}</td>
//                             <img width={40} src={ele.image} alt="" />
//                             <td className="border border-gray-300">{ele.category}</td>
//                             <td className="border border-gray-300">
//                               <input
//                                   autoComplete="off"
//                                   required
//                                   min="1"
//                                   className="border-2 border-gray-500 rounded w-20 pl-2"
//                                   type="number"
//                                   name="quantity"
//                                   value={addedData[ele.id] || ''}  // Access quantity by product ID
//                                   onChange={(e) => handleAddInputChange(e, ele.id)}  // Pass product ID
//                               />
//                             </td>
//                             <td className="border border-gray-300">{ele.price}</td>
//                             <td className="border border-gray-300">
//                               {ele.producttype}
//                             </td>
//                             <td className="border border-gray-300">{ele.color}</td>
//                             <td className="border border-gray-300">{ele.weight}</td>
//                             <td className="border border-gray-300">{ele.guarantee}</td>
//                             <td className="border border-gray-300"><CiCirclePlus onClick={(e) => handleAddProduct(e,ele)} className="ml-4" size={25}/></td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//               </div>

//                 {/* back and submit btn */}
//               <div className='flex justify-around items-center mt-8 mr-4 gap-8'>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded">Back</button>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//               </div>
//            </>
//           )}
//       </div>
//     </div>
//   );
// };

// export default SalesInvoicePage;







import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SalesInvoicePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Set items per page
  const [quantities, setQuantities] = useState({});
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [productData, setProductData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userData, setUserData] = useState({
    image: "",
    name: "",
    email: "",
    shippingAddress: "",
    billingAddress: "",
    phone: "",
    date: "",
    invoiceId: "",
    shipmentId: "",
  });

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

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

  useEffect(() => {
    fetchProductList();
  }, [addModelOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/sales')
  }

  const handleAddProductsClick = () => {
    // Check if all required fields are filled
    const { name, email, phone, shippingAddress, billingAddress, date, invoiceId, shipmentId, image } = userData;

    if (!name || !email || !phone || !shippingAddress || !billingAddress || !date || !invoiceId || !shipmentId || !image) {
      toast.error("Please fill Form Before Adding Products.");
      return; // Prevent opening the modal
    }

    // If all fields are filled, toggle the modal
    setAddModelOpen(!addModelOpen);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle image upload
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleQuantityChange = (productId, value) => {
    console.log("d633 :", productId, "5 :", value);
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
      setQuantities({ ...quantities, [productId]: quantity });
      console.log("one object with d633 with 5 quantity : ", quantities);
    }
  };



  
  // Handle product selection
  const handleAddProduct = async (product, quantity) => {
    if (quantity === "") {
      toast.error("Please Enter an Quantity Value !")
      return;
    }

    // Check if the quantity is valid
    const availableQuantity = parseInt(product.quantity);
    if (quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} items are available in stock.`);
      return;
    }

    console.log("data :", product, "5 :", quantity);
    const updatedProducts = selectedProducts.some((p) => p.id === product.id)
      ? selectedProducts.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p)
      : [...selectedProducts, { ...product, quantity: quantity }]; // i think quantity key name nathi only value chhe

    setSelectedProducts(updatedProducts);
    toast.success("Product Added Successfully!");
    console.log(selectedProducts);
    console.log(selectedProducts.length);

    // Reset the quantity for this product after adding it
    // setQuantities(prevState => ({ ...prevState, [product.id]: '' })); // Clear input field

    // Update product quantity in real-time
    const updatedProductList = productData.map((p) =>
      p.id === product.id
        ? { ...p, quantity: availableQuantity - quantity }
        : p
    );
    setProductData(updatedProductList);
    console.log(productData);

    // Update the product quantity in the database
    try {
      await API.put(`/products/${product.id}`, { ...product, quantity: availableQuantity - quantity });
    } catch (error) {
      console.error("Error updating product quantity:", error.message);
      toast.error("Failed to update product quantity.");
    }

    // Reset quantities for input fields
    setQuantities(prevState => ({ ...prevState, [product.id]: '' }));
  };

  const handleRemoveProduct = async (productId) => {
    // Filter out the product with the given id
    const updatedSelectedProducts = selectedProducts.filter(product => product.id !== productId);
    setSelectedProducts(updatedSelectedProducts);

    // Restore the quantity back to productData if needed
    const removedProduct = selectedProducts.find(p => p.id === productId);

    if (removedProduct) {
      const updatedProductList = productData.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + removedProduct.quantity
          }; // Restore quantity
        }
        return product;
      });

      setProductData(updatedProductList);
      toast.success("Delete Product Success !")
      // Update server-side data
      try {
        await API.put(`/products/${productId}`, {
          ...updatedProductList.find(p => p.id === productId)
        });
        // toast.success("Product quantity updated successfully!");
      } catch (error) {
        console.error("Error updating product quantity on server:", error.message);
        toast.error("Failed to update product quantity on server.");
      }
    }
  };

  // Handle user data submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const { name, email, phone, shippingAddress, billingAddress, date, invoiceId, shipmentId, image } = userData;

    if (!name || !email || !phone || !shippingAddress || !billingAddress || !date || !invoiceId || !shipmentId || !image) {
      toast.error("Please fill Form Before Submit !");
      return; // Prevent opening the modal
    }
    // if (selectedProducts.length === 0) {
    //   toast.error("Please add at least one product.");
    //   return;
    // }

    try {
      const newUser = {
        ...userData,
        products: selectedProducts,
      };

      await API.post("/userData", newUser);
      toast.success("User Added Successfully!");

      // Reset form
      setUserData({
        image: "",
        name: "",
        email: "",
        shippingAddress: "",
        billingAddress: "",
        phone: "",
        date: "",
        invoiceId: "",
        shipmentId: "",
      });
      setAddModelOpen(!addModelOpen);
      setSelectedProducts([]);
      setQuantities({}); // Reset quantities 
      navigate('/sales')
    } catch (error) {
      toast.error("Failed to add user.");
      console.error(error.message);
    }
  };

  // pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
  
  console.log("Total Pages:", totalPages);
  console.log("Product Data Length:", productData.length);  


  const selectedTotalPages = Math.ceil(selectedProducts.length / itemsPerPage);
  const selectedIndexOfLastProduct = currentPage * itemsPerPage;
  const selectedIndexOfFirstProduct = selectedIndexOfLastProduct - itemsPerPage;
  const currentSelectedProducts = selectedProducts.slice(selectedIndexOfFirstProduct, selectedIndexOfLastProduct);

  return (
    <div>
      <div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex gap-2 justify-around mt-4">
            <h2 className="text-2xl mb-4">Menu</h2>
            <IoMenu size={35}
              onClick={toggleSidebar}
              className="bg-gray-800 text-white rounded-lg" />
          </div>
          <nav className="space-y-2">

            <NavLink to="/" className="text-xl block hover:bg-gray-700 p-2 rounded">
              Product
            </NavLink>

            <NavLink
              to="/sales"
              className="text-xl block hover:bg-gray-700 p-2 rounded"
            >
              Sale Product
            </NavLink>
          </nav>
        </div>

        {/* heading */}
        <div className="mt-8 flex flex-row w-[95%] mx-auto justify-between items-center">
          <div className="flex gap-4">
            <h1 className="text-2xl">Menu</h1>
            <IoMenu
              size={35}
              onClick={toggleSidebar}
              className="text-black rounded-lg" />
            {/* <h1 className="text-2xl">Product Management System</h1> */}
          </div>
          {/* <button
                onClick={toggleSidebar}
                className="p-2 bg-gray-800 text-white rounded-lg lg:hidden"
              >
                Menu
              </button> */}
          <div className="flex flex-row gap-4 w-[10%] mt-2">
            {/* <NavLink to='/'>Product</NavLink> */}
            {/* <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddProductsClick}
          >
            Add Products
          </button> */}
            {/* <NavLink to='/sales'>Sale Products</NavLink> */}
          </div>
        </div>


        {/* Form Section */}
        <div className="mt-2 p-2 flex flex-col justify-center items-center rounded-lg">
          <h2 className="text-3xl mb-4">User Page</h2>

          <form className="space-y-4">

            <div className="flex justify-between gap-4">
              <div className="flex flex-row gap-6">
                <label>FirstName:</label>
                <input
                  required
                  className="border-2 border-black rounded mr-2"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row gap-6">
                <label>Email :</label>
                <input
                  required
                  className="border-2 border-black rounded mr-2"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row gap-4">
                <label>Phone:</label>
                <input
                  required
                  className="border-2 border-black rounded mr-2"
                  type="number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-row gap-8">
                <label>Address1:</label>
                <input
                  required
                  className="border-2 border-black rounded mr-4"
                  type="text"
                  name="shippingAddress"
                  value={userData.shippingAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label>Address2:</label>
                <input
                  required
                  className="border-2 border-black rounded mr-6"
                  type="text"
                  name="billingAddress"
                  value={userData.billingAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-row gap-8">
                <label>Date:</label>
                <input
                  required
                  className="border-2 border-black rounded w-[100%]"
                  type="date"
                  name="date"
                  value={userData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-row gap-8">
                <label>Invoice Id:</label>
                <input
                  required
                  className="border-2 border-black rounded mr-4"
                  type="number"
                  name="invoiceId"
                  value={userData.invoiceId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-row gap-6">
                <label>Ship Id:</label>
                <input
                  required
                  className="border-2 border-black rounded"
                  type="number"
                  name="shipmentId"
                  value={userData.shipmentId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-row justify-center">
              <label>Upload Image:</label>
              <input
                required
                type="file"
                name="image"
                // value={userData.image}
                onChange={uploadImage}
              />
            </div>
          </form>
        </div>

        <div className="mt-0 flex flex-row w-[70%] mx-auto justify-between items-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddProductsClick}
          >
            Add Products
          </button>
        </div>

        {currentSelectedProducts.length > 0 && (
          <div className="mt-8">
            <div className="mt-0 text-xl flex flex-row w-[70%] mx-auto justify-between items-center">
              <h1>
                Selected Products :
              </h1>
            </div>
            <table className="mt-4 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 text-center text-md">
                    ID
                  </th>
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
                    Action
                  </th>
                  {/* <th className="border border-gray-300 text-center text-md">
                        Price
                      </th> */}
                  {/* <th className="border border-gray-300 text-center text-md">
                        Product Type
                      </th>
                      <th className="border border-gray-300 text-center text-md">
                        Color
                      </th> */}
                  {/* <th className="border border-gray-300 text-center text-md">
                        Weight
                      </th>
                      <th className="border border-gray-300 text-center text-md">
                        Guarantee
                      </th> */}
                </tr>
              </thead>
              <tbody>
                {currentSelectedProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300">{index + 1}</td>
                    <td className="border border-gray-300">{product.name}</td>
                    <img width={40} src={product.image} alt="" />
                    <td className="border border-gray-300">{product.category}</td>
                    <td className="border border-gray-300">{product.quantity}</td>
                    <td>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Render Selected Products Pagination Controls */}
            {selectedTotalPages > 1 && (
              <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  &lt;
                </button>
                {[...Array(selectedTotalPages)].map((_, index) => (
                  <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === selectedTotalPages}>
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}

        {addModelOpen && (
          <>
            <div>
              <div className="mt-0 text-xl flex flex-row w-[70%] mx-auto justify-between items-center">
                <h1>
                  Products List :
                </h1>
              </div>
              <table className="mt-8 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 text-center text-md">
                      ID
                    </th>
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
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No Products Available !!!
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((ele, index) => (
                      <tr key={ele.id}>
                        <td className="border border-gray-300">{index + 1}</td>
                        <td className="border border-gray-300">{ele.name}</td>
                        <img width={40} src={ele.image} alt="" />
                        <td className="border border-gray-300">{ele.category}</td>
                        <td className="border border-gray-300">
                          <input
                            autoComplete="off"
                            required
                            min="1"
                            className="border-2 border-gray-500 rounded w-20 pl-2"
                            type="number"
                            value={quantities[ele.id] || ""} // Default to 1 if no quantity set
                            onChange={(e) => handleQuantityChange(ele.id, e.target.value)} // Update quantity state
                          />
                        </td>
                        <td className="border border-gray-300">{ele.price}</td>
                        <td className="border border-gray-300">
                          {ele.producttype}
                        </td>
                        <td className="border border-gray-300">{ele.color}</td>
                        <td className="border border-gray-300">{ele.weight}  Kg</td>
                        <td className="border border-gray-300">{ele.guarantee}  Year</td>
                        <td className="border border-gray-300"><CiCirclePlus onClick={() => {
                          const quantity = parseInt(quantities[ele.id]) || ""; // Get quantity from state
                          const product = productData.find(p => p.id === ele.id);

                          if (product && quantity <= product.quantity) { // Check stock availability
                            handleAddProduct(ele, quantity); // Pass product and valid quantity
                          } else {
                            toast.error("Product not available in stock.");
                          }
                        }} className="ml-4" size={25} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {totalPages > 1 && renderPagination()}
            </div>

            {/* back and submit btn */}
            <div className='flex justify-around items-center mt-8 mr-4 gap-8'>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleBack}>Back</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesInvoicePage;