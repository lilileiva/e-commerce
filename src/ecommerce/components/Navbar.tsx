import '../../index.css'
import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobalStateContext from "../context/globalStateContext";

import Searchbar from './Searchbar';
import CartIcon from '../icons/CartIcon'
import UserIcon from '../icons/UserIcon'

function Navbar() {

    let token = window.localStorage.getItem("token");
    const location = useLocation()    
    const [search, setSearch] = useState(false);

    useEffect(() => {
        token = window.localStorage.getItem("token");
    }, [location])

    const { dispatch, state } = useContext(GlobalStateContext);

    const totalProducts = state?.cartProducts.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <div className='flex flex-col justify-between py-5 w-full h-fit'>
            <div className='lg:flex-row md:flex-row lg:justify-between md:justify-between flex flex-col justify-center gap-2'>
                <Link to="/" className='font-semibold self-center text-turquoise text-3xl text-center'>
                    MegaMart
                </Link>
                <div className={`align-center lg:gap-10 md:gap-10 gap-4 w-full ${search ? "lg:inline-flex md:inline-flex lg:justify-end md:justify-end flex flex-wrap justify-around" : "lg:inline-flex md:inline-flex lg:justify-end md:justify-end grid grid-cols-3"}`}>
                    <div className={`${search ? "lg:w-48 md:w-48 w-full" : "lg:w-32 md:w-32 w-14"}`}>
                        <Searchbar search={search} setSearch={setSearch} />
                    </div>
                    {token ? <>
                        <Link to="/user/details/" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <UserIcon size='27' />
                            My account
                        </Link>
                    </> : <>
                        <Link to="/register" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <UserIcon size='27' />
                            Sign in / Sign up
                        </Link>
                    </>}
                    <Link to="/cart-detail" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                        <CartIcon size='27' />
                        Cart
                        <p className={
                            totalProducts > 0 ? 'px-2 py-[2px] h-fit rounded-full font-semibold text-sm text-white bg-turquoise duration-300' : 'px-2 text-white all-ease-out duration-300'
                        }>
                            {totalProducts}
                        </p>
                    </Link>
                </div>
            </div>
            <hr className='border-gray-200 my-4' />
            <div className='inline-flex text-base justify-evenly gap-2'>
                <Link to="/" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Home
                </Link>
                <Link to="/products" onClick={() => dispatch({ type: 'SET_PAGE', payload: 1 })} className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    All products
                </Link>
                <Link to="/categories" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Categories
                </Link>
            </div>
            <hr className='border-gray-200 my-4' />
        </div>
    );
}

export default Navbar;