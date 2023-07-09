import { Route, Routes } from 'react-router-dom'
import './App.css'

import { CategoriesProvider } from './ecommerce/context/categories/CategoriesProvider'

import Navbar from './ecommerce/components/Navbar'
import ProductsWrapper from './ecommerce/pages/Products'
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
      <CategoriesProvider>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products/' element={<ProductsWrapper />} />
            <Route path='products/?title=:category' element={<ProductsWrapper />} />
            <Route path='products/:productId' element={<Product />} />
            <Route path='categories/' element={<Categories />} />
            <Route path='cart-detail/' element={<CartDetail />} />
            <Route path='login/' element={<Login />} />
            <Route path='register/' element={<Register />} />
            <Route path='products/create/' element={<CreateProduct />} />
            <Route path='products/edit/:productId' element={<EditProduct />} />
          </Routes>
        </div>
      </CategoriesProvider>
  )
}

export default App
