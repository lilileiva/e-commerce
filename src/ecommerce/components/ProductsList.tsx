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
        <div className="flex flex-col items-center w-full">
            <ul
                className={`grid ${showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"} md:grid-cols-3 sm:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2 mt-10 w-full`}
            >
                {
                    data && data.length > 0 && status === 'success' && dataPaged.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            key={product.id}
                            className="relative z-0 cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                            {isAdded == product.id && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
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
                                className="object-cover w-full h-40"
                                src={product.images[0]}
                                alt={product.title}
                                onError={(e) => { e.target["src"] = camera }}
                            />
                            <div className="p-4">
                                <h4 className="font-semibold truncate text-gray-800">
                                    {product.title}

                                </h4>
                                <p className="text-md text-gray-500">
                                    {product.category.name}
                                </p>
                                <p className="text-lg font-bold text-gray-800 my-2">
                                    ${product.price}
                                </p>
                                <CustomButton width="w-full" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addProductToCart(product)
                                    }}
                                />
                            </div>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center">There are no products</p>}
                {status === 'loading' && <ProductsLoader />}
                {status === 'error' && <p className="text-center">Error loading products</p>}

            </ul>
            <Paging listLength={data?.length} elementsPerPage={elementsPerPage} />
        </div>
    );
}

export default ProductsList;