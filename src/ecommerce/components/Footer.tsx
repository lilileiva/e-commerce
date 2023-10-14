import '../../index.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalStateContext from '../context/globalStateContext';

function Footer() {

    const { dispatch } = useContext(GlobalStateContext);

    return (
        <div className='h-38 flex flex-col justify-between align-bottom w-full mt-20 mb-2'>
            <hr className='border-gray-200 mt-4' />
            <div className='flex flex-wrap justify-between px-4'>
                <Link to="/" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 rounded-xl hover:bg-gray-300 duration-75'>
                    Offers
                </Link>
                <Link to="/products" onClick={() => dispatch({ type: 'SET_PAGE', payload: 1 })} className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 rounded-xl hover:bg-gray-300 duration-75'>
                    Products
                </Link>
                <Link to="/categories" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 rounded-xl hover:bg-gray-300 duration-75'>
                    Categories
                </Link>
                <Link to="/cart-detail" className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm py-1 px-2 rounded-xl hover:bg-gray-300 duration-75'>
                    Cart
                </Link>
            </div>
            <div className='w-full px-2 flex flex-row justify-between items-center h-12 w-full rounded-xl bg-gray-100'>
                <a
                    href="https://www.linkedin.com/in/lilianaleiva/"
                    target='blank'
                    className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm px-2 py-1 h-fit rounded-xl hover:bg-gray-300 duration-75'
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/lilileiva"
                    target='blank'
                    className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm px-2 py-1 h-fit rounded-xl hover:bg-gray-300 duration-75'
                >
                    Github
                </a>
                <a
                    href="https://lilianaleiva.vercel.app"
                    target='blank'
                    className='text-gray-700 text-center flex items-center font-normal lg:text-base w-fit text-sm px-2 py-1 h-fit rounded-xl hover:bg-gray-300 duration-75'
                >
                    Portfolio
                </a>
            </div>
            <Link to="/" className='font-semibold self-center text-turquoise text-xl text-center'>
                MegaMart
            </Link>
        </div>
    );
}

export default Footer;