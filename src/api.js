import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});


export const addProduct = async (data) => {
    try {
      return await API.post('/products', data);
    } catch (error) {
      throw error; 
    }
  };


export const addUser = async (data) => {
  try {
    const emailAlreadyPresent = await API.get(`/userData?email=${data.email}`);
      if (emailAlreadyPresent.data.length > 0) {
        throw new Error('Email already registered');
      }
    return await API.post('/userData', data);
  } catch (error) {
    throw error; 
  }
};


  export const editProduct = async (data) => {
    try {
      const alredySalesItem = await API.get(`/saleProducts?id=${data.id}`);
      if (alredySalesItem.data.length > 0) {
        throw new Error('Product Already Sales');
      }
      return await API.post('/saleProducts', data);
    }
    catch (error) {
      throw error; 
    }
  };


  // export const updateUserData = async (user,userUpdateData) => {
  //   try {
  //     const updatedUser = {
  //       ...user,
  //       ...userUpdateData 
  //     };
  //   return await API.put(`/userData/${user.email}`, updatedUser);
  //   } catch (error) {
  //       throw error;
  //   }
  // };









//   import React, { useEffect, useState } from "react";
// import { registerUser } from "../api";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
// import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// const ProductPage = () => {
//   const [productData, setProductData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [editModelOpen,setEditModelOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     category: "",
//     price: "",
//     producttype: "",
//     color: "",
//     weight: "",
//     guarantee: "",
//   });

//   const API = axios.create({
//     baseURL: "http://localhost:3001",
//   });

//   const fetchProductList = async () => {
//     try {
//       const response = await API.get("/products");
//       if (response) {
//         setProductData(response.data);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProductList();
//   }, [modalOpen]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData({ ...formData, image: reader.result });
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditClick = (product) => {
//     setSelectedProduct(product);
//     setFormData(product);
//     setModalOpen(true);
//   };

//   const handleDeleteClick = (product) => {
//     setSelectedProduct(product);
//     setDeleteModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await registerUser(formData); 
//       toast.success('Add Product successfully!');
//       setFormData({
//         name: "",
//         image: "",
//         category: "",
//         price: "",
//         producttype: "",
//         color: "",
//         weight: "",
//         guarantee: "",
//       });
//       setModalOpen(false);
//     } catch (error) {
//         console.log(error.message);
//         toast.error("Error While Create Product !")
//     }
//   };

  
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/products/${selectedProduct.id}`, formData);
//       toast.success("Product updated successfully!");
//       setModalOpen(false);
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error updating product!");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await API.delete(`/products/${selectedProduct.id}`);
//       toast.success("Product deleted successfully!");
//       setDeleteModalOpen(false);
//       fetchProductList();
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error deleting product!");
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col w-full">
//         <div className="flex flex-row w-[90%] mx-auto justify-between items-center">
//           <h1>Sales Management System</h1>
//           <div className="flex flex-row gap-4">
//             <NavLink to="/">Product</NavLink>
//             <NavLink to="/sales">Sale Products</NavLink>
//           </div>
//         </div>
//         <div className="mt-8 flex flex-row w-[90%] mx-auto justify-between items-center">
//           <h1>Product List</h1>
//           <button
//             onClick={handleEditClick}
//             className="bg-blue-400 p-1 rounded"
//           >
//             Add New
//           </button>
//         </div>
//         <div>
//           <table className="min-w-full text-center table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300">ID</th>
//                 <th className="border border-gray-300">Name</th>
//                 <th className="border border-gray-300">Image</th>
//                 <th className="border border-gray-300">Category</th>
//                 <th className="border border-gray-300">Price</th>
//                 <th className="border border-gray-300">Product Type</th>
//                 <th className="border border-gray-300">Color</th>
//                 <th className="border border-gray-300">Weight</th>
//                 <th className="border border-gray-300">Guarantee</th>
//                 <th className="border border-gray-300">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productData.length === 0 ? (
//                 <tr>
//                   <td colSpan="10" className="text-center py-4">
//                     No Products Available !!!
//                   </td>
//                 </tr>
//               ) : (
//                 productData.map((ele, index) => (
//                   <tr key={ele.id}>
//                     <td className="border border-gray-300">{index + 1}</td>
//                     <td className="border border-gray-300">{ele.name}</td>
//                     <td>
//                       <img width={40} src={ele.image} alt="" />
//                     </td>
//                     <td className="border border-gray-300">{ele.category}</td>
//                     <td className="border border-gray-300">{ele.price}</td>
//                     <td className="border border-gray-300">
//                       {ele.producttype}
//                     </td>
//                     <td className="border border-gray-300">{ele.color}</td>
//                     <td className="border border-gray-300">{ele.weight}</td>
//                     <td className="border border-gray-300">{ele.guarantee}</td>
//                     <td className="flex gap-4 justify-center">
//                       <MdEdit size={20} onClick={() => handleEditClick(ele)} />
//                       <FaEye size={20} />
//                       <MdDelete
//                         size={20}
//                         onClick={() => handleDeleteClick(ele)}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {modalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
//               <h2 className="text-2xl mb-4">Edit Product</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="">
//                   <label>Name:</label>
//                   <input
//                     className="border-2 border-black rounded ml-5 pl-1"
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="">
//                   <label>Category:</label>
//                   <input
//                     className="border-2 border-black rounded ml-1 pl-1"
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="">
//                   <label>Price:</label>
//                   <input
//                     className="border-2 border-black rounded ml-8 pl-1"
//                     type="text"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="">
//                   <label>Weight:</label>
//                   <input
//                     className="border-2 border-black rounded ml-4 pl-1"
//                     type="text"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="">
//                   <label>Guarantee:</label>
//                   <input
//                     className="border-2 border-black rounded ml-1 pl-1"
//                     type="text"
//                     name="guarantee"
//                     value={formData.guarantee}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="flex justify-around items-center pt-2">
//                   <div className="flex flex-row">
//                     <label className="pr-1">Product Type:</label>
//                     <div>
//                       <input
//                         type="radio"
//                         name="producttype"
//                         value="Physical"
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <label className="ml-1">Physical</label>
//                       <input
//                         type="radio"
//                         name="producttype"
//                         value="Visual"
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <label className="ml-1">Visual</label>
//                     </div>
//                   </div>

//                   <div className="flex flex-row">
//                     <label className="">Color:</label>
//                     <div>
//                       <select
//                         className=""
//                         name="color"
//                         value={formData.color}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option className="" value="Red">
//                           Red
//                         </option>
//                         <option className="" value="Blue">
//                           Blue
//                         </option>
//                         <option className="" value="Black">
//                           Black
//                         </option>
//                         <option className="" value="White">
//                           White
//                         </option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-2">
//                   <label>Upload Image:</label>
//                   <input
//                     className=""
//                     required
//                     type="file"
//                     name="image"
//                     onChange={uploadImage}
//                   />
//                 </div>
//                 <div className="flex justify-evenly space-x-4 mt-4">
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                     onClick={() => setModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

        // {deleteModalOpen && (
        //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        //     <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        //       <h2 className="text-xl mb-4">
        //         Are you sure you want to delete this product?
        //       </h2>
        //       <div className="flex justify-evenly space-x-4">
        //         <button
        //           onClick={() => setDeleteModalOpen(false)}
        //           className="bg-gray-300 px-4 py-2 rounded"
        //         >
        //           Cancel
        //         </button>
        //         <button
        //           onClick={handleDeleteConfirm}
        //           className="bg-red-500 text-white px-4 py-2 rounded"
        //         >
        //           Delete
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;