import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import ProductsLoader from "./ProductsLoader";
import EditIcon from "../icons/EditIcon";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";
import Paging from "../components/Paging";

function ProductsList({ data, status, showFilters }) {
    const navigate = useNavigate()
    const userRole = window.localStorage.getItem("userRole")

    const { state, dispatch } = useContext(GlobalStateContext);

    const [isAdded, setIsAdded] = useState("")

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        setIsAdded(product.id)
        setTimeout(() => setIsAdded(""), 700)
    };

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(state.cartProducts));
    }, [state])

    const elementsPerPage = 24
    const totalPages = state.currentPage * elementsPerPage;
    const firstPage = totalPages - elementsPerPage;
    const dataPaged = data && status === "success" ? data.slice(firstPage, totalPages) : null;
    
    return (
        <div className="flex flex-col justify-center w-full h-full items-center">
            <ul
                className={data && data.length > 0 && status === 'success' &&
                    `grid ${showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"} md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-center lg:gap-6 md:gap-4 gap-2 mt-10 h-full w-full`
                }>
                {
                    data && data.length > 0 && status === 'success' && dataPaged.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="relative z-0 flex flex-col justify-center place-self-center items-center w-full max-w-[250px] h-fit rounded-xl border-gray-200 overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                            key={product.id}
                        >
                            {isAdded == product.id && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
                            <div className="w-fit">
                                {userRole === "admin" && <button
                                    className="z-10 text-white pl-[2.5px] bg-turquoise w-6 h-6 rounded-md absolute right-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/products/edit/${product.id}`)
                                    }}
                                >
                                    <EditIcon size='20' />
                                </button>}
                                <img
                                    className="object-cover w-fit"
                                    src={product.images[0]}
                                    alt={product.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-800 font-bold capitalize text-left truncate">
                                    {product.title}
                                </p>
                                <p className="w-5/6 bg-white text-gray-800 capitalize text-left truncate">
                                    {product.category.name}
                                </p>
                                <p className="w-5/6 bg-white font-bold text-gray-800 text-left truncate">
                                    ${product.price}
                                </p>
                            </div>
                            <CustomButton width="w-11/12" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addProductToCart(product)
                                }}
                            />
                        </li>
                    ))
                }
            </ul>
            {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center">There are no products</p>}
            {status === 'loading' && <ProductsLoader length="6" showFilters={showFilters} />}
            {status === 'error' && <p className="text-center">Error loading products</p>}
            <Paging listLength={data?.length} elementsPerPage={elementsPerPage} />
        </div>
    );
}

export default ProductsList;