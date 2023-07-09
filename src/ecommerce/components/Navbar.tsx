import '../../index.css'
import { Link } from 'react-router-dom';

function Navbar() {



    return (
        <div className='inline-flex text-lg justify-between px-5 py-5 bg-slate-50'>
            <Link to="/">
                <a className='font-medium'>Ecommerce</a>
            </Link>
            <Link to="/products">
                <a>Productos</a>
            </Link>
            <Link to="/categories">
                <a>Categorías</a>
            </Link>
            <Link to="/cart-detail">
                <a>Carrito</a>
            </Link>
        </div>
    );
}

export default Navbar;