import '../../index.css'
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';


function Navbar() {

    return (
        <div className='flex flex-col justify-between py-5 w-full h-fit'>
            <div className='inline-flex text-lg justify-between'>
                <Link to="/" className='text-3xl font-semibold self-center text-turquoise'>
                    MegaMart
                </Link>
                <div className='inline-flex justify-center align-center gap-10'>
                    <Searchbar />
                    <Link to="/login" className='text-gray-500 self-center font-medium'>
                        Iniciar sesión / Registrarse
                    </Link>
                    <Link to="/cart-detail" className='text-gray-500 self-center font-medium'>
                        Carrito
                    </Link>
                </div>
            </div>
            <hr className='border-gray-200 my-5' />
            <div className='inline-flex text-base justify-evenly'>
                <Link to="/" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl'>
                    Inicio
                </Link>
                <Link to="/products" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl'>
                    Todos los productos
                </Link>
                <Link to="/categories" className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl'>
                    Categorías
                </Link>
            </div>
            <hr className='border-gray-200 my-5' />
        </div>
    );
}

export default Navbar;