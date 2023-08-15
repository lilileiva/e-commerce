import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import { useContext, useState } from "react";
import Loader from "../components/Loader";
import EditIcon from "../icons/EditIcon";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";
import Paging from "../components/Paging";

function ProductsList({ data, status }) {

    const navigate = useNavigate()
    const userRole = window.localStorage.getItem("userRole")

    const { dispatch } = useContext(GlobalStateContext);

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };

    const [page, setPage] = useState(1);
    const elementsPerPage = 12
    const totalPages = page * elementsPerPage;
    const firstPage = totalPages - elementsPerPage;
    const dataPaged = data && status === "success" ? data.slice(firstPage, totalPages) : null;

    const setPageTo = (page) => {
        setPage(page)
    }

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && dataPaged.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="relative z-0 flex flex-col justify-center items-center lg:w-52 w-44 h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                            key={product.id}
                        >
                            <div className="w-52 h-52">
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
                                    className="object-cover w-52 h-52"
                                    src={product.images[0]}
                                    alt={product.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-700 font-bold capitalize text-center truncate">
                                    {product.title}
                                </p>
                                <p className="w-5/6 bg-white text-gray-700 capitalize text-center truncate">
                                    {product.category.name}
                                </p>
                                <p className="w-5/6 bg-white font-medium text-gray-600 text-center text-lg truncate">
                                    ${product.price}
                                </p>
                            </div>
                            <CustomButton width="fit" text="Agregar al carrito" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addProductToCart(product)
                                }}
                            />
                        </li>
                    ))
                }
                {data && data.length == 0 && status === 'success' && <p className="w-full">No se encontraron productos</p>}
                {status === 'loading' && <Loader />}
                {status === 'error' && <p>Error al cargar los productos</p>}
            </ul>
            <Paging listLength={data?.length} page={page} elementsPerPage={elementsPerPage} setPage={setPage} setPageTo={setPageTo} />
        </div>
    );
}

export default ProductsList;