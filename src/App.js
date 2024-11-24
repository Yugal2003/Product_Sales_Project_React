import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProductPage from './components/ProductPage';
import SalesPage from './components/SalesPage';
import SalesInvoicePage from './components/SalesInvoicePage';
import SalesPageEdit from './components/SalesPageEdit';
import SalesPageView from './components/SalesPageView';
import SalesPageEditOne from './components/SalesPageEditOne';
import AddProductPage from './components/AddProductPage';
import EditProduct from './components/EditProduct';
import ViewProduct from './components/ViewProduct';
// import SalesInvoiceAllProducts from './components/SalesInvoiceAllProducts';
// import SalesInvoiceSingleProduct from './components/SalesInvoiceSingleProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductPage/>} />
          <Route path="/addProduct" element={<AddProductPage/>} />
          <Route path='/editProduct/:id' element={<EditProduct/>}/>
          <Route path='/viewProduct/:id' element={<ViewProduct/>}/>
          <Route path="/sales" element={<SalesPage/>} />
          <Route path="/sales/edit/:id" element={<SalesPageEdit/>} />
          <Route path="/sales/edit/:id/:editId" element={<SalesPageEditOne/>} />
          <Route path="/sales/view/:id" element={<SalesPageView/>} />
          <Route path="/sales/invoice" element={<SalesInvoicePage/>} />
          {/* <Route path="/sales/invoice/allProducts" element={<SalesInvoiceAllProducts/>} />
          <Route path='/sales/invoice/singleProduct/:id' element={<SalesInvoiceSingleProduct/>} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  );
}

export default App;