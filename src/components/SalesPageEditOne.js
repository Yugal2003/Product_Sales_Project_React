import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SalesPageEditOne = () => {
  const { id, editId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/userData/${id}`);
      const user = response.data;

      if (user?.products?.length > 0) {
        const product = user.products.find((p) => p.id === editId);
        if (product) {
          setProductData(product);
        } else {
          toast.error('Product not found.');
          navigate('/sales');
        }
      } 
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product.');
      navigate('/sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, editId]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProductData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  // const handleUpdateProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedUserData = await API.get(`/userData/${id}`);
  //     const user = updatedUserData.data;

  //     const updatedProducts = user.products.map((product) =>
  //       product.id === editId ? productData : product
  //     );

  //     await API.patch(`/userData/${id}`, { products: updatedProducts });

  //     toast.success('Product updated successfully!');
  //     navigate(`/sales/edit/${id}`);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //     toast.error('Failed to update product.');
  //   }
  // };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = await API.get(`/userData/${id}`);
      const user = updatedUserData.data;

      const updatedProducts = user.products.map((product) =>
        product.id === editId ? productData : product
      );

      await API.patch(`/userData/${id}`, { products: updatedProducts });

      toast.success('Product updated successfully!');
      navigate('/sales'); // Redirect to Sales page
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>No product data found.</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SalesPageEditOne;




// import React, { useEffect, useState } from 'react'
// import { useParams,useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const SalesPageEditOne = () => {
//   const { id, editId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [userData, setUserData] = useState({});
//   const navigate = useNavigate();
  
//     const API = axios.create({
//       baseURL: "http://localhost:3001",
//     });
  
//     const fetchProductDetails = async () => {
//       try {
//         const response = await API.get(`/userData/${id}`);
//         const user = response.data;
//         setUserData(user);
  
//         const targetProduct = user.products.find((prod) => prod.id === editId);
//         if (targetProduct) {
//           setProduct(targetProduct);
//         } else {
//           toast.error("Product not found");
//           navigate(`/sales/edit/${id}`);
//         }
//       } catch (error) {
//         console.error("Error fetching product details:", error.message);
//         toast.error("Failed to fetch product details");
//       }
//     };
  
//     useEffect(() => {
//       fetchProductDetails();
//     }, []);

//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setProduct((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     };
  
//     const handleQuantityChange = (e) => {
//       const { value } = e.target;
//       setProduct((prev) => ({
//         ...prev,
//         quantity: {
//           [editId]: value,
//         },
//       }));
//     };

//     const handleSaveChanges = async (e) => {
//       e.preventDefault();
//       try {
//         // Update the product in the user's product array
//         const updatedProducts = userData.products.map((prod) =>
//           prod.id === editId ? product : prod
//         );
  
//         const updatedUser = { ...userData, products: updatedProducts };
  
//         // Update the user data in the API
//         await API.patch(`/userData/${id}`, updatedUser);
  
//         toast.success("Product details updated successfully!");
//         navigate(`/sales/edit/${id}`);
//       } catch (error) {
//         console.error("Error updating product details:", error.message);
//         toast.error("Failed to update product details");
//       }
//     };
  
//     return (
//       <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg w-[100%]">
//       <h2 className="text-3xl mb-4">Edit Product Details</h2>
//       <form className="space-y-4" onSubmit={handleSaveChanges}>
//         <div>
//           <label>Product Name:</label>
//           <input
//             className="border-2 border-black rounded ml-4 pl-2"
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input
//             className="border-2 border-black rounded ml-10 pl-2"
//             type="text"
//             name="category"
//             value={product.category}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Color:</label>
//           <input
//             className="border-2 border-black rounded ml-14 pl-2"
//             type="text"
//             name="color"
//             value={product.color}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input
//             className="border-2 border-black rounded ml-10 pl-2"
//             type="number"
//             name="quantity"
//             value={product.quantity[editId]}
//             onChange={handleQuantityChange}
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             className="border-2 border-black rounded ml-16 pl-2"
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="flex justify-center space-x-4 mt-4">
//           <button
//             type="button"
//             onClick={() => navigate(`/sales/edit/${id}`)}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//     )
//   }
  
// export default SalesPageEditOne;