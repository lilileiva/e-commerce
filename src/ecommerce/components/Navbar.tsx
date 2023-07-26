import '../../index.css'
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import CartIcon from '../icons/CartIcon'
import UserIcon from '../icons/UserIcon'

function Navbar() {
    
    const token = window.localStorage.getItem("token");    

    return (
        <div className='flex flex-col justify-between py-5 w-full h-fit'>
            <div className='inline-flex text-lg justify-between'>
                <Link to="/" className='text-3xl font-semibold self-center text-turquoise'>
                    MegaMart
                </Link>
                <div className='inline-flex justify-center align-center gap-10'>
                    <Searchbar />
                    {token ? <>
                        <Link to="/user/details/" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium'>
                            <UserIcon size='27' />
                            Mi cuenta
                        </Link>
                        <Link to="/cart-detail" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium'>
                            <CartIcon size='27' />
                            Carrito
                        </Link>
                    </> : <>
                        <Link to="/register" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium'>
                            <UserIcon size='27' />
                            Iniciar sesión / Registrarse
                        </Link>
                        <Link to="/cart-detail" className='inline-flex justify-center items-center gap-1 text-gray-500 self-center font-medium'>
                            <CartIcon size='27' />
                            Carrito
                        </Link>
                    </>}
                </div>
            </div>
            <hr className='border-gray-200 my-4' />
            <div className='inline-flex text-base justify-evenly'>
                <Link to="/" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Inicio
                </Link>
                <Link to="/products" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Todos los productos
                </Link>
                <Link to="/categories" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl hover:bg-gray-300 duration-75'>
                    Categorías
                </Link>
            </div>
            <hr className='border-gray-200 my-4' />
        </div>
    );
}

export default Navbar;