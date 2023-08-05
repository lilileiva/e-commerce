import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "../constants";
import { fetchProduct } from "../services/products";
import { useContext } from "react";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import CustomButton from "../components/CustomButton";
import EditIcon from "../icons/EditIcon";
import GlobalStateContext from "../context/globalStateContext";


function Product() {

    const navigate = useNavigate()
    const userRole = window.localStorage.getItem("userRole")
    const { productId } = useParams()
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, productId], () => fetchProduct({ productId }))

    const { dispatch } = useContext(GlobalStateContext);

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };

    return (
        <div className="w-full flex justify-center">
            {data && status === 'success' && <div className="w-10/12 flex justify-center gap-8 grid grid-cols-2">
                <Carousel data={data} />
                <div className="flex flex-col gap-4 mt-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-700 text-2xl">{data.title}</h1>
                        {userRole === "admin" && <button
                            className="text-white pl-[2.5px] bg-turquoise w-6 h-6 rounded-md right-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/products/edit/${data.id}`)
                            }}
                        >
                            <EditIcon size='20' />
                        </button>}
                    </div>
                    <h2 className="text-gray-700 text-3xl">${data.price}</h2>
                    <p className="text-gray-700">{data.description}</p>
                    <p className="text-gray-500">Categoría: {data.category.name}</p>
                    <CustomButton width="56" text="Comprar" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick="" />
                    <CustomButton width="56" text="Agregar al carrito" bgColor="white" textColor="turquoise" borderColor="turquoise"
                        onClick={(e) => {
                            e.stopPropagation();
                            addProductToCart(data)
                        }}
                    />
                </div>
            </div>}
            {status === 'loading' && <Loader />}
            {status === 'error' && <p>Error al cargar el producto</p>}
        </div>
    );
}

export default Product;