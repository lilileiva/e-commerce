import '../../index.css'
import { Link } from 'react-router-dom';

function Navbar() {



    return (
        <div>
            <Link to="/">
                <a className='text-indigo-600'>Ecommerce</a>
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