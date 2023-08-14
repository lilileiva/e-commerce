import { Route, Routes } from 'react-router-dom'
import './index.css'

import Navbar from './ecommerce/components/Navbar'
import Products from './ecommerce/pages/Products'
import Product from './ecommerce/pages/Product'
import Categories from './ecommerce/pages/Categories'
import CartDetail from './ecommerce/pages/CartDetail'
import Login from './ecommerce/pages/Login'
import Register from './ecommerce/pages/Register'
import UserDetails from './ecommerce/pages/UserDetails'
import CreateProduct from './ecommerce/pages/CreateProduct'
import EditProduct from './ecommerce/pages/EditProduct'
import Home from './ecommerce/pages/Home'
import EditCategory from './ecommerce/pages/EditCategory'
import CreateCategory from './ecommerce/pages/CreateCategory'
import GlobalStateProvider from './ecommerce/context/GlobalStateProvider'
import SuccessfulCheckout from './ecommerce/pages/SuccessfulCheckout'


function App() {

  return (
    <div className='lg:px-40 md:px-10 px-4 grid grid-rows-[max-content_auto_100px] grid-cols-1 justify-center content-top w-full h-full'>
      <GlobalStateProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products/?' element={<Products />} />
          <Route path='products/:productId' element={<Product />} />
          <Route path='products/create/' element={<CreateProduct />} />
          <Route path='products/edit/:productId' element={<EditProduct />} />
          <Route path='categories/' element={<Categories />} />
          <Route path='categories/edit/:categoryId' element={<EditCategory />} />
          <Route path='categories/create/' element={<CreateCategory />} />
          <Route path='cart-detail/' element={<CartDetail />} />
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Register />} />
          <Route path='user/details/' element={<UserDetails />} />
          <Route path='checkout/successful/' element={<SuccessfulCheckout />} />
        </Routes>
      </GlobalStateProvider>
    </div>
  )
}

export default App
