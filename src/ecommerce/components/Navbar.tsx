import '../../index.css'
import { Link, useLocation } from 'react-router-dom';
import Searchbar from './Searchbar';
import CartIcon from '../icons/CartIcon'
import UserIcon from '../icons/UserIcon'
import { useEffect } from 'react';

function Navbar() {
    
    let token = window.localStorage.getItem("token");

    const location = useLocation()

    useEffect(() => {
        token = window.localStorage.getItem("token");
    }, [location])

    return (
        <div className='flex flex-col justify-between py-5 w-full h-fit'>
            <div className='lg:flex-row md:flex-row lg:justify-between md:justify-between flex flex-col justify-center gap-2'>
                <Link to="/" className='font-semibold self-center text-turquoise text-3xl text-center'>
                    MegaMart
                </Link>
                <div className='inline-flex justify-between align-center lg:gap-10 gap-4'>
                    <Searchbar />
                    {token ? <>
                        <Link to="/user/details/" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <UserIcon size='27' />
                            Mi cuenta
                        </Link>
                        <Link to="/cart-detail" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <CartIcon size='27' />
                            Carrito
                        </Link>
                    </> : <>
                        <Link to="/register" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <UserIcon size='27' />
                            Iniciar sesión / Registrarse
                        </Link>
                        <Link to="/cart-detail" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium lg:text-lg md:text-base text-sm'>
                            <CartIcon size='27' />
                            Carrito
                        </Link>
                    </>}
                </div>
            </div>
            <hr className='border-gray-200 my-4' />
            <div className='inline-flex text-base justify-evenly gap-2'>
                <Link to="/" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Inicio
                </Link>
                <Link to="/products" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Todos los productos
                </Link>
                <Link to="/categories" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Categorías
                </Link>
            </div>
            <hr className='border-gray-200 my-4' />
        </div>
    );
}

export default Navbar;