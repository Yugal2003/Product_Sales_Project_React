<a href="https://product-sales-project-react.vercel.app/" target="_blank">LIVE</a>

# Sales Management Project

A **Sales Management System** built with **React** and **JSON Server**, designed to manage products, track sales, generate invoices, and provide a seamless user experience for handling sales operations.

---

## 🚀 Features

- **Product Management**: Add, edit, and delete products with ease.
- **Sales Tracking**: Track user-submitted sales data and update records in real-time.
- **Invoice Generation**: Create detailed sales invoices and download them as PDFs.
- **Pagination & Sorting**: Efficiently handle large datasets with pagination and sorting functionalities.
- **Responsive Design**: Fully responsive interface for use on all device sizes.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS (or your chosen styling library)
- **Backend**: JSON Server for API simulation
- **Libraries**:
  - `axios`: For API requests
  - `jspdf` and `html2canvas`: For PDF generation
  - `react-table`: For data display

---

Installation

Clone the repository:

git clone https://github.com/<your-username>/sales-management-project.git
cd sales-management-project


Install dependencies:

npm install

Start Json-server

json-server --watch db.json --port 3001


Run App

npm start


📄 Key Features Description
Product Management
Add new products to the database.
Edit existing products via a modal popup.
Delete products after confirmation.
Sales Tracking
View and manage sales entries submitted by users.
Track individual product sales and their quantities.
Invoice Generation
Generate invoices for selected products.
Download invoices as PDF files for records.
Pagination & Sorting
Paginated views to handle large datasets.
Sort tables by product names, quantities, or sales data.


⚙️ API Details
JSON Server API Endpoints
Products

GET /products: Fetch all products
POST /products: Add a new product
PUT /products/:id: Update a product
DELETE /products/:id: Delete a product
Sales

GET /sales: Fetch all sales records
POST /sales: Add a new sale
Invoices

GET /invoices: Fetch all invoices
POST /invoices: Create a new invoice


