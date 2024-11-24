// before change an diff route for add view and edit code


// import React, { useEffect, useState } from "react";
// import { addProduct } from "../api";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
// import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";

// const ProductPage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [productData, setProductData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedViewProduct, setSelectedViewProduct] = useState({});
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedEditProduct, setSelectedEditProduct] = useState({});
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     category: "",
//     quantity: "",
//     price: "",
//     producttype: "",
//     color: "",
//     weight: "",
//     guarantee: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataPerPage, setDataPerPage] = useState(5);

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
//   }, [modalOpen]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const closeCreateForm = () => {
//     setModalOpen(false);
//     setFormData({
//       name: "",
//       image: "",
//       category: "",
//       quantity: "",
//       price: "",
//       producttype: "",
//       color: "",
//       weight: "",
//       guarantee: "",
//     });
//   };
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedEditProduct((prevdata) => ({ ...prevdata, [name]: value }));
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

//   const handleAddNewItem = () => {
//     setModalOpen(true);
//   };

//   const handleEditClick = (product) => {
//     setSelectedEditProduct(product);
//     setEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!selectedEditProduct.name || selectedEditProduct.name.length < 3) {
//         toast.error("A valid name with at least 3 characters is required!");
//         return;
//       }
//       if (selectedEditProduct.category === "") {
//         toast.error("Category is Required !");
//         return;
//       }
//       if (selectedEditProduct.quantity === "") {
//         toast.error("Quantity is Required !");
//         return;
//       }
//       if (selectedEditProduct.price === "") {
//         toast.error("Price is Required !");
//         return;
//       }
//       if (selectedEditProduct.weight === "") {
//         toast.error("Weight is Required !");
//         return;
//       }
//       if (selectedEditProduct.guarantee === "") {
//         toast.error("Guarantee is Required !");
//         return;
//       }
//       if (selectedEditProduct.producttype === "") {
//         toast.error("Product Type is Required !");
//         return;
//       }
//       if (selectedEditProduct.color === "") {
//         toast.error("Color is Required !");
//         return;
//       }
//       if (selectedEditProduct.image === "") {
//         toast.error("Image is Required !");
//         return;
//       }
//       await API.put(`/products/${selectedEditProduct.id}`, selectedEditProduct);
//       setProductData((prev) =>
//         prev.map((ele) =>
//           ele.id === selectedEditProduct.id ? selectedEditProduct : ele
//         )
//       );
//       setEditModalOpen(false);
//       toast.success("Product Updated Successfully!");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       toast.error("Error While Updating Data!");
//     }
//   };

//   const uploadEditImage = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSelectedEditProduct((prev) => ({ ...prev, image: reader.result }));
//     };
//     if (file) reader.readAsDataURL(file);
//   };
//   const handleViewClick = (product) => {
//     setSelectedViewProduct(product);
//     setViewModalOpen(true);
//   };
//   const handleDeleteClick = (product) => {
//     setSelectedDeleteProduct(product);
//     setDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await API.delete(`/products/${selectedDeleteProduct.id}`);
//       toast.success("Product Deleted successfully!");
//       setDeleteModalOpen(false);
//       fetchProductList();
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error deleting product!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addProduct(formData);
//       toast.success("Add Product successfully!");
//       setFormData({
//         name: "",
//         image: "",
//         category: "",
//         quantity: "",
//         price: "",
//         producttype: "",
//         color: "",
//         weight: "",
//         guarantee: "",
//       });
//       setModalOpen(false);
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error While Create Product !");
//     }
//   };

//    // pagination logic 
//    const indexOfLastData = currentPage * dataPerPage;
//    const indexOfFirstData = indexOfLastData - dataPerPage;
//    const currentData = productData.slice(indexOfFirstData, indexOfLastData);
 
//    const totalPages = Math.ceil(productData.length / dataPerPage);
//    const paginate = (pageNumber) => {
//      setCurrentPage(pageNumber);
//    };

//   return (
//     <div>
//       {/* main div */}
//       <div className="flex flex-col w-full">
        
//         {/* Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex gap-2 justify-around mt-4">
//             <h2 className="text-2xl mb-4">Menu</h2>
//             <IoMenu size={35}
//                 onClick={toggleSidebar}
//                 className="bg-gray-800 text-white rounded-lg"/>
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

//             {/* <NavLink
//               to="/sales"
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Sales
//             </NavLink> */}
//           </nav>
//         </div>

//         {/* heading */}
//         <div className="mt-8 flex flex-row w-[88%] mx-auto justify-between items-center">
//           <div className="flex gap-10">
//             <IoMenu
//             size={35}
//               onClick={toggleSidebar}
//               className="text-black rounded-lg"/>
//             <h1 className="text-2xl">Product Management System</h1>
//           </div>
//           {/* <button
//               onClick={toggleSidebar}
//               className="p-2 bg-gray-800 text-white rounded-lg lg:hidden"
//             >
//               Menu
//             </button> */}
//           <div className="flex flex-row gap-4">
//             {/* <NavLink to='/'>Product</NavLink> */}
//             {/* <NavLink to='/sales'>Sale Products</NavLink> */}
//           </div>
//         </div>

//         {/* list page heading */}
//         <div className="mt-8 flex flex-row w-[80%] mx-auto justify-between items-center">
//           <div>
//             <h1 className="text-xl">Product List</h1>
//           </div>
//           <div>
//             <button
//               onClick={handleAddNewItem}
//               className="bg-blue-400 p-1 rounded"
//             >
//               Add New
//             </button>
//           </div>
//         </div>

//         {/* table show */}
//         <div>
//           <table className="mt-8 w-[80%] mx-auto text-center table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 text-center text-md">
//                   ID
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Name
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Image
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Category
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Quantity
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Price
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Product Type
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Color
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Weight
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Guarantee
//                 </th>
//                 <th className="border border-gray-300 text-center text-md">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     No Products Available !!!
//                   </td>
//                 </tr>
//               ) : (
//                 currentData.map((ele, index) => (
//                   <tr key={ele.id}>
//                     <td className="border border-gray-300">{index + 1}</td>
//                     <td className="border border-gray-300">{ele.name}</td>
//                     <img width={40} src={ele.image} alt="" />
//                     <td className="border border-gray-300">{ele.category}</td>
//                     <td className="border border-gray-300">{ele.quantity}</td>
//                     <td className="border border-gray-300">{ele.price}</td>
//                     <td className="border border-gray-300">
//                       {ele.producttype}
//                     </td>
//                     <td className="border border-gray-300">{ele.color}</td>
//                     <td className="border border-gray-300">{ele.weight}</td>
//                     <td className="border border-gray-300">{ele.guarantee}</td>
//                     <td className="cursor-pointer flex gap-4 items-center justify-center pb-2">
//                       <span>
//                         <MdEdit
//                           onClick={() => handleEditClick(ele)}
//                           size={20}
//                         />
//                       </span>
//                       <span>
//                         <FaEye onClick={() => handleViewClick(ele)} size={20} />
//                       </span>
//                       <span>
//                         <MdDelete
//                           onClick={() => handleDeleteClick(ele)}
//                           size={20}
//                         />
//                       </span>
//                     </td>
//                     {/* <td className="cursor-pointer flex gap-2 items-center justify-center pb-4"><span className="bord" onClick={()=> handleEditClick(ele)}>Edit</span><span className="bord1" onClick={()=> handleViewClick(ele)}>View</span><span className="bord2" onClick={()=> handleDeleteClick(ele)}>Delete</span></td> */}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//            {/* pagination code */} 
//            <div className="flex justify-center mt-4">
//                 <button
//                   onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//                   className="px-4 py-2 bg-gray-300 text-black rounded"
//                 >
//                   {'<'}
//                 </button>
//                 {[...Array(totalPages).keys()].map((page) => (
//                   <button
//                     key={page + 1}
//                     onClick={() => paginate(page + 1)}
//                     className={`px-4 py-2 mx-1 ${currentPage === page + 1 ? 'bg-blue-500 text-white rounded' : 'bg-gray-300 rounded'}`}
//                   >
//                     {page + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
//                   className="px-4 py-2 bg-gray-300 text-black rounded"
//                 >
//                   {'>'}
//                 </button>
//           </div>
//         </div>
//       </div>

//       {/* show data dynamically */}
//       {modalOpen && (
//         <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
//             <h2 className="text-2xl mb-4">Add Products</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="">
//                 <label>Name:</label>
//                 <input
//                   className="border-2 border-black rounded ml-5 pl-1"
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="">
//                 <label>Category:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="">
//                 <label>Quantity:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="">
//                 <label>Price:</label>
//                 <input
//                   className="border-2 border-black rounded ml-8 pl-1"
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>

//               <div className="">
//                 <label>Weight:</label>
//                 <input
//                   className="border-2 border-black rounded ml-4 pl-1"
//                   type="number"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="">
//                 <label>Guarantee:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="number"
//                   name="guarantee"
//                   value={formData.guarantee}
//                   onChange={handleInputChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>

//               <div className="flex justify-around items-center pt-2">
//                 <div className="flex flex-row">
//                   <label className="pr-1">Product Type:</label>
//                   <div>
//                     <input
//                       type="radio"
//                       name="producttype"
//                       value="Physical"
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <label className="ml-1">Physical</label>
//                     <input
//                       type="radio"
//                       name="producttype"
//                       value="Visual"
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <label className="ml-1">Visual</label>
//                   </div>
//                 </div>

//                 <div className="flex flex-row">
//                   <label className="">Color:</label>
//                   <div>
//                     <select
//                       className=""
//                       name="color"
//                       value={formData.color}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option className="" value="Red">
//                         Red
//                       </option>
//                       <option className="" value="Blue">
//                         Blue
//                       </option>
//                       <option className="" value="Black">
//                         Black
//                       </option>
//                       <option className="" value="White">
//                         White
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-2">
//                 <label>Upload Image:</label>
//                 <input
//                   className=""
//                   required
//                   type="file"
//                   name="image"
//                   onChange={uploadImage}
//                 />
//               </div>

//               <div className="flex justify-evenly space-x-4 mt-4">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
//                   onClick={closeCreateForm}
//                 >
//                   Cancel
//                 </button>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* delete model */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl mb-4">
//               Are you Sure To Delete This product?
//             </h2>
//             <div className="flex justify-evenly space-x-4">
//               <button
//                 onClick={() => setDeleteModalOpen(false)}
//                 className="bg-gray-300 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* edit model */}
//       {editModalOpen && (
//         <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
//             <h2 className="text-2xl mb-4">Edit Product</h2>

//             <form className="space-y-4">
//               <div className="">
//                 <label>Name:</label>
//                 <input
//                   className="border-2 border-black rounded ml-5 pl-1"
//                   type="text"
//                   name="name"
//                   value={selectedEditProduct.name}
//                   onChange={handleEditInputChange}
//                 />
//               </div>
//               <div className="">
//                 <label>Category:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="text"
//                   name="category"
//                   value={selectedEditProduct.category}
//                   onChange={handleEditInputChange}
//                 />
//               </div>
//               <div className="">
//                 <label>Quantity:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="text"
//                   name="quantity"
//                   value={selectedEditProduct.quantity}
//                   onChange={handleEditInputChange}
//                 />
//               </div>
//               <div className="">
//                 <label>Price:</label>
//                 <input
//                   className="border-2 border-black rounded ml-8 pl-1"
//                   type="text"
//                   name="price"
//                   value={selectedEditProduct.price}
//                   onChange={handleEditInputChange}
//                 />
//               </div>

//               <div className="">
//                 <label>Weight:</label>
//                 <input
//                   className="border-2 border-black rounded ml-4 pl-1"
//                   type="text"
//                   name="weight"
//                   value={selectedEditProduct.weight}
//                   onChange={handleEditInputChange}
//                 />
//               </div>
//               <div className="">
//                 <label>Guarantee:</label>
//                 <input
//                   className="border-2 border-black rounded ml-1 pl-1"
//                   type="text"
//                   name="guarantee"
//                   value={selectedEditProduct.guarantee}
//                   onChange={handleEditInputChange}
//                 />
//               </div>

//               <div className="flex justify-around items-center pt-2">
//                 <div className="flex flex-row">
//                   <label className="pr-1">Product Type:</label>
//                   <div>
//                     <input
//                       type="radio"
//                       name="producttype"
//                       value="Physical"
//                       onChange={handleEditInputChange}
//                     />
//                     <label className="ml-1">Physical</label>
//                     <input
//                       type="radio"
//                       name="producttype"
//                       value="Visual"
//                       onChange={handleEditInputChange}
//                     />
//                     <label className="ml-1">Visual</label>
//                   </div>
//                 </div>

//                 <div className="flex flex-row">
//                   <label className="">Color:</label>
//                   <div>
//                     <select
//                       className=""
//                       name="color"
//                       value={selectedEditProduct.color}
//                       onChange={handleEditInputChange}
//                     >
//                       <option className="" value="Red">
//                         Red
//                       </option>
//                       <option className="" value="Blue">
//                         Blue
//                       </option>
//                       <option className="" value="Black">
//                         Black
//                       </option>
//                       <option className="" value="White">
//                         White
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-2">
//                 <label>Upload Image:</label>
//                 <input type="file" onChange={uploadEditImage} />
//               </div>

//               <div className="flex justify-evenly space-x-4 mt-4">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
//                   onClick={() => setEditModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//                   onClick={handleEditSubmit}
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* view model */}
//       {viewModalOpen && (
//         <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
//             <h2 className="text-2xl mb-4">View Product</h2>

//             <form className="space-y-4">
//               <div className="">
//                 <label>Name:</label>
//                 <span>{selectedViewProduct.name}</span>
//               </div>
//               <div className="">
//                 <label>Category:</label>
//                 <sapn>{selectedViewProduct.category}</sapn>
//               </div>
//               <div className="">
//                 <label>Quantity:</label>
//                 <sapn>{selectedViewProduct.quantity}</sapn>
//               </div>
//               <div className="">
//                 <label>Price:</label>
//                 <sapn>{selectedViewProduct.price}</sapn>
//               </div>

//               <div className="">
//                 <label>Weight:</label>
//                 <span>{selectedViewProduct.weight}</span>
//               </div>
//               <div className="">
//                 <label>Guarantee:</label>
//                 <sapn>{selectedViewProduct.guarantee}</sapn>
//               </div>

//               <div className="flex justify-around items-center pt-2">
//                 <div className="flex flex-row">
//                   <label className="pr-1">Product Type:</label>
//                   <div>
//                     <span>{selectedViewProduct.producttype}</span>
//                   </div>
//                 </div>

//                 <div className="flex flex-row">
//                   <label className="">Color:</label>
//                   <div>
//                     <sapn>{selectedViewProduct.color}</sapn>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-2">
//                 <label>Upload Image:</label>
//                 <img width={80} src={selectedViewProduct.image} alt="" />
//               </div>

//               <div className="flex justify-evenly space-x-4 mt-4">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
//                   onClick={() => setViewModalOpen(false)}
//                 >
//                   Close
//                 </button>
//                 {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleEditSubmit}>Update</button> */}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductPage;




// after change an diff route for add view and edit code

import React, { useEffect, useState } from "react";
// import { addProduct } from "../api";
import { toast } from "react-hot-toast";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const ProductPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [productData, setProductData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEditProduct, setSelectedEditProduct] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2);

  const navigate = useNavigate();

  const API = axios.create({
    baseURL: "http://localhost:3001",
  });

  const fetchProductList = async () => {
    try {
      const response = await API.get("/products");
      if (response) {
        console.log(response.data);
        setProductData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [modalOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const closeCreateForm = () => {
  //   setModalOpen(false);
  //   setFormData({
  //     name: "",
  //     image: "",
  //     category: "",
  //     quantity: "",
  //     price: "",
  //     producttype: "",
  //     color: "",
  //     weight: "",
  //     guarantee: "",
  //   });
  // };
  // const handleEditInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedEditProduct((prevdata) => ({ ...prevdata, [name]: value }));
  // };

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData({ ...formData, image: reader.result });
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAddNewItem = () => {
    navigate('/addProduct')
  };

  const handleEditClick = (ele) => {
    navigate(`/editProduct/${ele.id}`)
  };

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!selectedEditProduct.name || selectedEditProduct.name.length < 3) {
  //       toast.error("A valid name with at least 3 characters is required!");
  //       return;
  //     }
  //     if (selectedEditProduct.category === "") {
  //       toast.error("Category is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.quantity === "") {
  //       toast.error("Quantity is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.price === "") {
  //       toast.error("Price is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.weight === "") {
  //       toast.error("Weight is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.guarantee === "") {
  //       toast.error("Guarantee is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.producttype === "") {
  //       toast.error("Product Type is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.color === "") {
  //       toast.error("Color is Required !");
  //       return;
  //     }
  //     if (selectedEditProduct.image === "") {
  //       toast.error("Image is Required !");
  //       return;
  //     }
  //     await API.put(`/products/${selectedEditProduct.id}`, selectedEditProduct);
  //     setProductData((prev) =>
  //       prev.map((ele) =>
  //         ele.id === selectedEditProduct.id ? selectedEditProduct : ele
  //       )
  //     );
  //     setEditModalOpen(false);
  //     toast.success("Product Updated Successfully!");
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     toast.error("Error While Updating Data!");
  //   }
  // };

  // const uploadEditImage = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setSelectedEditProduct((prev) => ({ ...prev, image: reader.result }));
  //   };
  //   if (file) reader.readAsDataURL(file);
  // };
  const handleViewClick = (ele) => {
    navigate(`/viewProduct/${ele.id}`)
  };
  const handleDeleteClick = (product) => {
    setSelectedDeleteProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await API.delete(`/products/${selectedDeleteProduct.id}`);
      toast.success("Product Deleted successfully!");
      setDeleteModalOpen(false);
      fetchProductList();
    } catch (error) {
      console.log(error.message);
      toast.error("Error deleting product!");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await addProduct(formData);
  //     toast.success("Add Product successfully!");
  //     setFormData({
  //       name: "",
  //       image: "",
  //       category: "",
  //       quantity: "",
  //       price: "",
  //       producttype: "",
  //       color: "",
  //       weight: "",
  //       guarantee: "",
  //     });
  //     setModalOpen(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error("Error While Create Product !");
  //   }
  // };

   // pagination logic 
   const indexOfLastData = currentPage * dataPerPage; //5
   const indexOfFirstData = indexOfLastData - dataPerPage;//0
   const currentData = productData.slice(indexOfFirstData, indexOfLastData); // 0 1 2 3 4 pages
 
   const totalPages = Math.ceil(productData.length / dataPerPage); // 22 / 5 = 5 pages
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
   };

   const pageButtonArray = [];

   for(let i=1;i<=totalPages;i++){
    pageButtonArray.push(
      <button
      key={i}
      onClick={()=>paginate(i)}
      className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white rounded' : 'bg-gray-300 rounded'}`}>{i}</button>
    )
   }

  return (
    <div>
      {/* main div */}
      <div className="flex flex-col w-full">
        
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

            <NavLink to="/" className="text-xl block hover:bg-gray-700 p-2 rounded">
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
        <div className="mt-8 flex flex-row w-[88%] mx-auto justify-between items-center">
          <div className="flex gap-10">
            <IoMenu
            size={35}
              onClick={toggleSidebar}
              className="text-black rounded-lg"/>
            <h1 className="text-2xl">Product Management System</h1>
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

        {/* list page heading */}
        <div className="mt-8 flex flex-row w-[80%] mx-auto justify-between items-center">
          <div>
            <h1 className="text-xl">Product List</h1>
          </div>
          <div>
            <button
              onClick={handleAddNewItem}
              className="bg-blue-400 p-1 rounded"
            >
              Add New
            </button>
          </div>
        </div>

        {/* table show */}
        <div>
          <table className="mt-8 w-[80%] mx-auto text-center table-auto border-collapse border border-gray-300">
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
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Products Available !!!
                  </td>
                </tr>
              ) : (
                currentData.map((ele, index) => (
                  <tr key={ele.id}>
                    <td className="border border-gray-300">{index + 1}</td>
                    <td className="border border-gray-300">{ele.name}</td>
                    <img width={40} src={ele.image} alt="" />
                    <td className="border border-gray-300">{ele.category}</td>
                    <td className="border border-gray-300">{ele.quantity}</td>
                    <td className="border border-gray-300">{ele.price}</td>
                    <td className="border border-gray-300">
                      {ele.producttype}
                    </td>
                    <td className="border border-gray-300">{ele.color}</td>
                    <td className="border border-gray-300">{ele.weight}  Kg</td>
                    <td className="border border-gray-300">{ele.guarantee}  Year</td>
                    <td className="cursor-pointer flex gap-4 items-center justify-center pb-2">
                      <span>
                        <MdEdit
                          onClick={() => handleEditClick(ele)}
                          size={20}
                        />
                      </span>
                      <span>
                        <FaEye 
                        onClick={() => handleViewClick(ele)} 
                        size={20} />
                      </span>
                      <span>
                        <MdDelete
                          onClick={() => handleDeleteClick(ele)}
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
           {/* pagination code */} 
           <div className="flex justify-center mt-4">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  {'<'}
                </button>
               {pageButtonArray}
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  {'>'}
                </button>
          </div>
        </div>
      </div>

      {/* show data dynamically */}
      {modalOpen && (
        <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
            <h2 className="text-2xl mb-4">Add Products</h2>

            <form 
            // onSubmit={handleSubmit} 
            className="space-y-4">
              <div className="">
                <label>Name:</label>
                <input
                  className="border-2 border-black rounded ml-5 pl-1"
                  type="text"
                  name="name"
                  value={formData.name}
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-around items-center pt-2">
                <div className="flex flex-row">
                  <label className="pr-1">Product Type:</label>
                  <div>
                    <input
                      type="radio"
                      name="producttype"
                      value="Physical"
                      // onChange={handleInputChange}
                      required
                    />
                    <label className="ml-1">Physical</label>
                    <input
                      type="radio"
                      name="producttype"
                      value="Visual"
                      // onChange={handleInputChange}
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
                      // onChange={handleInputChange}
                      required
                    >
                      <option className="" value="Red">
                        Red
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

              <div className="mt-2">
                <label>Upload Image:</label>
                <input
                  className=""
                  required
                  type="file"
                  name="image"
                  // onChange={uploadImage}
                />
              </div>

              <div className="flex justify-evenly space-x-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                  // onClick={closeCreateForm}
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
      )}

      {/* delete model */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Are you Sure To Delete This product?
            </h2>
            <div className="flex justify-evenly space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit model */}
      {editModalOpen && (
        <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
            <h2 className="text-2xl mb-4">Edit Product</h2>

            <form className="space-y-4">
              <div className="">
                <label>Name:</label>
                <input
                  className="border-2 border-black rounded ml-5 pl-1"
                  type="text"
                  name="name"
                  value={selectedEditProduct.name}
                  // onChange={handleEditInputChange}
                />
              </div>
              <div className="">
                <label>Category:</label>
                <input
                  className="border-2 border-black rounded ml-1 pl-1"
                  type="text"
                  name="category"
                  value={selectedEditProduct.category}
                  // onChange={handleEditInputChange}
                />
              </div>
              <div className="">
                <label>Quantity:</label>
                <input
                  className="border-2 border-black rounded ml-1 pl-1"
                  type="text"
                  name="quantity"
                  value={selectedEditProduct.quantity}
                  // onChange={handleEditInputChange}
                />
              </div>
              <div className="">
                <label>Price:</label>
                <input
                  className="border-2 border-black rounded ml-8 pl-1"
                  type="text"
                  name="price"
                  value={selectedEditProduct.price}
                  // onChange={handleEditInputChange}
                />
              </div>

              <div className="">
                <label>Weight:</label>
                <input
                  className="border-2 border-black rounded ml-4 pl-1"
                  type="text"
                  name="weight"
                  value={selectedEditProduct.weight}
                  // onChange={handleEditInputChange}
                />
              </div>
              <div className="">
                <label>Guarantee:</label>
                <input
                  className="border-2 border-black rounded ml-1 pl-1"
                  type="text"
                  name="guarantee"
                  value={selectedEditProduct.guarantee}
                  // onChange={handleEditInputChange}
                />
              </div>

              <div className="flex justify-around items-center pt-2">
                <div className="flex flex-row">
                  <label className="pr-1">Product Type:</label>
                  <div>
                    <input
                      type="radio"
                      name="producttype"
                      value="Physical"
                      // onChange={handleEditInputChange}
                    />
                    <label className="ml-1">Physical</label>
                    <input
                      type="radio"
                      name="producttype"
                      value="Visual"
                      // onChange={handleEditInputChange}
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
                      value={selectedEditProduct.color}
                      // onChange={handleEditInputChange}
                    >
                      <option className="" value="Red">
                        Red
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

              <div className="mt-2">
                <label>Upload Image:</label>
                <input type="file" 
                // onChange={uploadEditImage} 
                />
              </div>

              <div className="flex justify-evenly space-x-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  // onClick={handleEditSubmit}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* view model */}
      {viewModalOpen && (
        <div className="fixed inset-0 text-center flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[35%]">
            <h2 className="text-2xl mb-4">View Product</h2>

            <form className="space-y-4">
              <div className="">
                <label>Name:</label>
                <span>{selectedViewProduct.name}</span>
              </div>
              <div className="">
                <label>Category:</label>
                <sapn>{selectedViewProduct.category}</sapn>
              </div>
              <div className="">
                <label>Quantity:</label>
                <sapn>{selectedViewProduct.quantity}</sapn>
              </div>
              <div className="">
                <label>Price:</label>
                <sapn>{selectedViewProduct.price}</sapn>
              </div>

              <div className="">
                <label>Weight:</label>
                <span>{selectedViewProduct.weight}</span>
              </div>
              <div className="">
                <label>Guarantee:</label>
                <sapn>{selectedViewProduct.guarantee}</sapn>
              </div>

              <div className="flex justify-around items-center pt-2">
                <div className="flex flex-row">
                  <label className="pr-1">Product Type:</label>
                  <div>
                    <span>{selectedViewProduct.producttype}</span>
                  </div>
                </div>

                <div className="flex flex-row">
                  <label className="">Color:</label>
                  <div>
                    <sapn>{selectedViewProduct.color}</sapn>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <label>Upload Image:</label>
                <img width={80} src={selectedViewProduct.image} alt="" />
              </div>

              <div className="flex justify-evenly space-x-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-1"
                  onClick={() => setViewModalOpen(false)}
                >
                  Close
                </button>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleEditSubmit}>Update</button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;