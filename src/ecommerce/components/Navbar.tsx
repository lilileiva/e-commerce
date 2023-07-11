import '../../index.css'
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className='flex flex-col justify-between py-5 w-full h-auto'>
            <div className='inline-flex text-lg justify-between'>
                <Link to="/" className='text-3xl font-semibold text-skyblue'>
                    MegaMart
                </Link>
                <div className='inline-flex align-center gap-10'>
                    <Link to="/login" className='text-gray-500 font-medium'>
                        Iniciar sesión / Registrase
                    </Link>
                    <Link to="/cart-detail" className='text-gray-500 font-medium'>
                        Carrito
                    </Link>
                </div>
            </div>
            <hr className='border-gray-200 my-5' />
            <div className='inline-flex text-base justify-evenly'>
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