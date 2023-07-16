import { Route, Routes } from 'react-router-dom'
import './index.css'

import Navbar from './ecommerce/components/Navbar'
import Products from './ecommerce/pages/Products'
import Product from './ecommerce/pages/Product'
import Categories from './ecommerce/pages/Categories'
import CartDetail from './ecommerce/pages/CartDetail'
import Login from './ecommerce/pages/Login'
import Register from './ecommerce/pages/Register'
import CreateProduct from './ecommerce/pages/CreateProduct'
import EditProduct from './ecommerce/pages/EditProduct'
import Home from './ecommerce/pages/Home'


function App() {

  return (
    <div className='px-20 grid grid-rows-[200px_auto] grid-cols-1 justify-center content-top w-full h-full'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />        
        <Route path='products/?' element={<Products />} />
        <Route path='products/:productId' element={<Product />} />
        <Route path='categories/' element={<Categories />} />
        <Route path='cart-detail/' element={<CartDetail />} />
        <Route path='login/' element={<Login />} />
        <Route path='register/' element={<Register />} />
        <Route path='products/create/' element={<CreateProduct />} />
        <Route path='products/edit/:productId' element={<EditProduct />} />
      </Routes>      
    </div>
  )
}

export default App
