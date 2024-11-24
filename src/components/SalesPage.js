import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { IoMenu } from "react-icons/io5";
// import img1 from '../JsonAPI/louis-vitton-1.jpg'
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';

const SalesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [productData,setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);

  const API = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const navigate = useNavigate();

  const fetchSalesList = async () => {
    try {
      const response = await API.get('/userData');
      if (response) {
        console.log(response.data);
        setSalesData(response.data);
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchSalesList()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditPageOpen = (ele) => {
    navigate(`/sales/edit/${ele.id}`)
  }

  const handleViewPageOpen = (ele) => {
    navigate(`/sales/view/${ele.id}`)
  }


  // Function to generate PDF


  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF();

    // Header Section
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 105, 10, { align: "center" });

    // Company Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("LLOYD'S", 105, 18, { align: "center" });
    doc.text("Cecilia Chapman", 105, 24, { align: "center" });
    doc.text("711-2880 Nulla St, Mankato", 105, 30, { align: "center" });
    doc.text("Mississippi 96522", 105, 36, { align: "center" });

    // Customer Details
    doc.setFontSize(12);
    doc.text(`Dear ${invoice.name} (${invoice.email}),`, 10, 50);
    doc.text("Here are your order details. We thank you for your purchase.", 10, 56);

    // Order Details
    doc.setFontSize(10);
    doc.text(`Order ID: #${invoice.id}`, 10, 70);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 10, 76);
    doc.text(`Invoice ID: #${invoice.invoiceId}`, 105, 70);
    doc.text(`Shipment ID: #${invoice.shipmentId}`, 105, 76);

    // Addresses
    doc.text("Billing Address:", 10, 90);
    doc.text(invoice.billingAddress, 10, 96);

    doc.text("Shipping Address:", 105, 90);
    doc.text(invoice.shippingAddress, 105, 96);

    // Product Table Header
    let yPosition = 110;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, yPosition); // Adjusted to leave space for the image
    doc.text("Category", 70, yPosition);
    doc.text("Qty", 110, yPosition);
    doc.text("Price", 130, yPosition);
    doc.text("Total", 160, yPosition);

    // Reset to normal font for content
    doc.setFont("helvetica", "normal");

    // Loop through products
    yPosition += 10;
    let subtotal = 0;

    invoice.products.forEach((product) => {
        // Add product image (ensure the image is Base64 or a URL that can be fetched)
        if (product.image) {
            try {
                doc.addImage(product.image, "JPEG", 10, yPosition - 5, 10, 10); // x=10, y=yPosition-5, width=10, height=10
            } catch (error) {
                console.error("Failed to load product image", error);
            }
        }

        // Add product details
        doc.text(product.name, 25, yPosition); // Name starts after the image
        doc.text(product.category, 70, yPosition);
        doc.text(String(product.quantity), 110, yPosition);
        doc.text(`${product.price}`, 130, yPosition);
        const total = product.quantity * product.price;
        doc.text(`${total.toFixed(2)}`, 160, yPosition);

        subtotal += total;
        yPosition += 10;

        // Check if the yPosition exceeds the page height
        if (yPosition > 270) {
            doc.addPage(); // Add a new page if needed
            yPosition = 20; // Reset yPosition for the new page
        }
    });

    // Subtotal Section
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 130, yPosition);
    doc.text(`${subtotal.toFixed(2)}`, 160, yPosition);

    // VAT and Shipping
    yPosition += 10;
    doc.text("VAT (0%):", 130, yPosition);
    doc.text("0.00", 160, yPosition);

    yPosition += 10;
    doc.text("Shipping Rate:", 130, yPosition);
    doc.text("5.00", 160, yPosition);

    // Grand Total
    const grandTotal = subtotal + 5;
    yPosition += 10;
    doc.text("Grand Total:", 130, yPosition);
    doc.setFontSize(12);
    doc.text(`${grandTotal.toFixed(2)}`, 160, yPosition);

    // Footer Message
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", 105, 290, null, null, "center");

    // Save the PDF
    doc.save(`invoice_${invoice.id}.pdf`);
};


  // const handleDownloadPDF = (invoice) => {
  //   const doc = new jsPDF();

  //   // Header
  //   doc.setFontSize(20);
  //   doc.text("INVOICE", 105, 10, { align: "center" });
  //   doc.setFontSize(12);
  //   doc.text("LLOYD'S", 105, 18, { align: "center" });
  //   doc.text("Cecilia Chapman", 105, 24, { align: "center" });
  //   doc.text("711-2880 Nulla St, Mankato", 105, 30, { align: "center" });
  //   doc.text("Mississippi 96522", 105, 36, { align: "center" });

  //   // Customer Details
  //   doc.setFontSize(12);
  //   doc.text(`Dear ${invoice.name} (${invoice.email}),`, 10, 50);
  //   doc.text("Here are your order details. We thank you for your purchase.", 10, 56);

  //   // Order Details
  //   doc.setFontSize(10);
  //   doc.text(`Order ID: #${invoice.id}`, 10, 70);
  //   doc.text(`Date: ${invoice.date}`, 10, 76);
  //   doc.text(`Invoice ID: #${invoice.invoiceId}`, 105, 70);
  //   doc.text(`Shipment ID: #${invoice.shipmentId}`, 105, 76);

  //   // Addresses
  //   doc.text("Billing Address:", 10, 90);
  //   doc.text(invoice.billingAddress, 10, 96);

  //   doc.text("Shipping Address:", 105, 90);
  //   doc.text(invoice.shippingAddress, 105, 96);

  //   // Product Table Header
  //   let yPosition = 110;
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Product", 10, yPosition);
  //   doc.text("Category", 50, yPosition);
  //   doc.text("Qty", 100, yPosition);
  //   doc.text("Price", 120, yPosition);
  //   doc.text("Total", 150, yPosition);

  //   // Product Table Content
  //   yPosition += 8;
  //   doc.setFont("helvetica", "normal");
  //   let subtotal = 0;

  //   invoice.products.forEach((product) => {
  //     const total = product.quantity * product.price;
  //     subtotal += total;

  //     doc.text(product.name, 10, yPosition);
  //     doc.text(product.category, 50, yPosition);
  //     doc.text(product.quantity.toString(), 100, yPosition);
  //     doc.text(`${product.price}`, 120, yPosition);
  //     doc.text(`${total.toFixed(2)}`, 150, yPosition);

  //     yPosition += 8;

  //     // Page break
  //     if (yPosition > 280) {
  //       doc.addPage();
  //       yPosition = 20;
  //     }
  //   });

  //   // Summary
  //   yPosition += 10;
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Subtotal", 120, yPosition);
  //   doc.text(`${subtotal.toFixed(2)}`, 150, yPosition);

  //   yPosition += 8;
  //   doc.text("VAT (0%)", 120, yPosition);
  //   doc.text("0.00", 150, yPosition);

  //   yPosition += 8;
  //   doc.text("Shipping Rate", 120, yPosition);
  //   doc.text("5.00", 150, yPosition);

  //   const grandTotal = subtotal + 5;
  //   yPosition += 8;
  //   doc.text("Grand Total", 120, yPosition);
  //   doc.setFontSize(12);
  //   doc.text(`${grandTotal.toFixed(2)}`, 150, yPosition);

  //   // Save PDF
  //   doc.save(`invoice_${invoice.id}.pdf`);
  // };

  // const handleDownloadPDF = (invoice) => {
  //   const doc = new jsPDF();

  //   // Header Section
  //   doc.setFontSize(20);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("INVOICE", 105, 10, { align: "center" });

  //   // Company Details
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("LLOYD'S", 105, 18, { align: "center" });
  //   doc.text("Cecilia Chapman", 105, 24, { align: "center" });
  //   doc.text("711-2880 Nulla St, Mankato", 105, 30, { align: "center" });
  //   doc.text("Mississippi 96522", 105, 36, { align: "center" });

  //   // Customer Details
  //   doc.setFontSize(12);
  //   doc.text(`Dear ${invoice.name} (${invoice.email}),`, 10, 50);
  //   doc.text("Here are your order details. We thank you for your purchase.", 10, 56);

  //   // Order Details
  //   doc.setFontSize(10);
  //   doc.text(`Order ID: #${invoice.id}`, 10, 70);
  //   doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 10, 76);
  //   doc.text(`Invoice ID: #${invoice.invoiceId}`, 105, 70);
  //   doc.text(`Shipment ID: #${invoice.shipmentId}`, 105, 76);

  //   // Addresses
  //   doc.text("Billing Address:", 10, 90);
  //   doc.text(invoice.billingAddress, 10, 96);

  //   doc.text("Shipping Address:", 105, 90);
  //   doc.text(invoice.shippingAddress, 105, 96);

  //   // Product Table Header
  //   let yPosition = 110;
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Product", 20, yPosition); // Adjusted to leave space for the image
  //   doc.text("Category", 70, yPosition);
  //   doc.text("Qty", 110, yPosition);
  //   doc.text("Price", 130, yPosition);
  //   doc.text("Total", 160, yPosition);

  //   // Reset to normal font for content
  //   doc.setFont("helvetica", "normal");

  //   // Loop through products
  //   yPosition += 10;
  //   let subtotal = 0;

  //   invoice.products.forEach((product) => {
  //     // Draw border for the row
  //     doc.rect(10, yPosition - 5, 190, 10); // Draw a rectangle: x=10, y=yPosition-5, width=190, height=10
  //     // Add product image (ensure the image is Base64 or a URL that can be fetched)
  //     if (product.image) {
  //       try {
  //         doc.addImage(product.image, "JPEG", 10, yPosition - 5, 10, 10); // x=10, y=yPosition-5, width=10, height=10
  //       } catch (error) {
  //         console.error("Failed to load product image", error);
  //       }
  //     }

  //     // Add product details
  //     doc.text(product.name, 25, yPosition); // Name starts after the image
  //     doc.text(product.category, 70, yPosition);
  //     doc.text(String(product.quantity), 110, yPosition);
  //     doc.text(`${product.price}`, 130, yPosition);
  //     const total = product.quantity * product.price;
  //     doc.text(`${total.toFixed(2)}`, 160, yPosition);

  //     subtotal += total;
  //     yPosition += 10;

  //     // Check if the yPosition exceeds the page height
  //     if (yPosition > 270) {
  //       doc.addPage(); // Add a new page if needed
  //       yPosition = 20; // Reset yPosition for the new page
  //     }
  //   });

  //   // Subtotal Section
  //   yPosition += 10;
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Subtotal:", 130, yPosition);
  //   doc.text(`${subtotal.toFixed(2)}`, 160, yPosition);

  //   // VAT and Shipping
  //   yPosition += 10;
  //   doc.text("VAT (0%):", 130, yPosition);
  //   doc.text("0.00", 160, yPosition);

  //   yPosition += 10;
  //   doc.text("Shipping Rate:", 130, yPosition);
  //   doc.text("5.00", 160, yPosition);

  //   // Grand Total
  //   const grandTotal = subtotal + 5;
  //   yPosition += 10;
  //   doc.text("Grand Total:", 130, yPosition);
  //   doc.setFontSize(12);
  //   doc.text(`${grandTotal.toFixed(2)}`, 160, yPosition);

  //   // Footer Message
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "italic");
  //   doc.text("Thank you for your purchase!", 105, 290, null, null, "center");

  //   // Save the PDF
  //   doc.save(`invoice_${invoice.id}.pdf`);
  // };


  // pagination logic 
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = salesData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(salesData.length / dataPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* main div */}
      <div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-44 p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex gap-2 justify-around mt-6">
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
        <div className="mt-8 flex flex-row w-[88%] mx-auto justify-between items-center">
          <div className='flex gap-10'>
            <IoMenu size={35}
              onClick={toggleSidebar}
              className="text-black rounded-lg" />
            <h1 className="text-2xl">User Products</h1>
          </div>
          <div className="flex flex-row pt-8">
            <NavLink to='/sales/invoice'><button className="bg-blue-400 p-1 rounded">Add Invoice</button></NavLink>
          </div>
        </div>

        {/* table show */}
        <div className='w-[100%] gap-4 mx-auto flex flex-col justify-between items-center'>
          <table className="mt-4 w-[70%] mx-auto text-center table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 text-center text-md py-1 px-2">ID</th>
                <th className="border border-gray-300 text-center text-md py-1 px-2">Image</th>
                <th className="border border-gray-300 text-center text-md py-1 px-2">Name</th>
                <th className="border border-gray-300 text-center text-md">Email</th>
                <th className="border border-gray-300 text-center text-md">Shipping Address</th>
                <th className="border border-gray-300 text-center text-md">Billing Address</th>
                <th className="border border-gray-300 text-center text-md">Phone</th>
                <th className="border border-gray-300 text-center text-md">Date</th>
                <th className="border border-gray-300 text-center text-md">Total Quantity</th>
                <th className="border border-gray-300 text-center text-md">Grand Total</th>
                <th className="border border-gray-300 text-center text-md">Action</th>
                <th className="border border-gray-300 text-center text-md">Download</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No Invoice Available !!!</td>
                </tr>
              ) : (
                currentData.map((ele, index) => (
                  <tr key={ele.id}>
                    <td className="border border-gray-300">{index + 1}</td>
                    <img width={40} src={ele.image || "fallback-image-url.jpg"} alt="User Product" />
                    <td className="border border-gray-300">{ele.name}</td>
                    <td className="border border-gray-300">{ele.email}</td>
                    <td className="border border-gray-300">{ele.shippingAddress}</td>
                    <td className="border border-gray-300">{ele.billingAddress}</td>
                    <td className="border border-gray-300">{ele.phone}</td>
                    <td className="border border-gray-300">{ele.date}</td>
                    <td className="border border-gray-300">{
                      ele.products.reduce((acc, curr) => acc + curr.quantity, 0)
                    }
                    </td>
                    <td className="border border-gray-300">{
                      ele.products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)}</td>
                    <td className="cursor-pointer flex gap-2 items-center justify-center pb-4"><span onClick={() => handleEditPageOpen(ele)}>Edit</span><span onClick={() => handleViewPageOpen(ele)}>View</span></td>
                    <td ><button onClick={() => handleDownloadPDF(ele)}>Download</button></td>
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
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => paginate(page + 1)}
                className={`px-4 py-2 mx-1 ${currentPage === page + 1 ? 'bg-blue-500 text-white rounded' : 'bg-gray-300 rounded'}`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesPage;