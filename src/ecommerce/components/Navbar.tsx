import '../../index.css'
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className='flex flex-col justify-between py-5 w-full h-fit'>
            <div className='inline-flex text-lg justify-between'>
                <Link to="/">
                    <a className='text-3xl font-semibold text-skyblue'>MegaMart</a>
                </Link>
                <div className='inline-flex align-center gap-10'>
                    <Link to="/login">
                        <p className='text-gray-500 font-medium'>Iniciar sesión / Registrase</p>
                    </Link>
                    <Link to="/cart-detail">
                        <a className='text-gray-500 font-medium'>Carrito</a>
                    </Link>
                </div>
            </div>
            <hr className='border-gray-200 my-5' />
            <div className='inline-flex text-base justify-evenly'>
                <Link to="/products">
                    <a className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl'>Todos los productos</a>
                </Link>
                <Link to="/categories">
                    <a className='text-gray-700 font-normal py-1 px-2 bg-slate-100 rounded-xl'>Categorías</a>
                </Link>
            </div>
            <hr className='border-gray-200 my-5' />
        </div>
    );
}

export default Navbar;