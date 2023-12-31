import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "../constants";
import { fetchProduct } from "../services/products";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import CustomButton from "../components/CustomButton";
import EditIcon from "../icons/EditIcon";
import GlobalStateContext from "../context/globalStateContext";
import CheckIcon from "../icons/CheckIcon";


function Product() {

    const navigate = useNavigate()
    const token = window.localStorage.getItem("token");
    const userRole = window.localStorage.getItem("userRole")
    const { productId } = useParams()
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, productId], () => fetchProduct({ productId }))
    const { dispatch } = useContext(GlobalStateContext);

    const [isAdded, setIsAdded] = useState("")

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        setIsAdded(product.id)
        setTimeout(() => setIsAdded(""), 700)
    };

    const purchase = () => {
        token ? navigate("/checkout") : navigate("/login")
    }

    return (
        <div className="w-full flex justify-center">
            {data && status === 'success' && <div className="w-10/12 flex justify-center lg:gap-8 gap-2 grid lg:grid-cols-2 grid-cols-1">
                <Carousel data={data} />
                <div className="flex flex-col gap-4 mt-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-700 text-2xl">
                            {data.title}
                            {isAdded == data.id && <span className="animate-ping inline-flex p-[3px] rounded-full bg-sky-400 opacity-75 ml-4">
                                <CheckIcon size="14" />
                            </span>}
                        </h1>
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
                    <h2 className="text-gray-700 text-3xl">
                        ${data.price}
                    </h2>
                    <p className="text-gray-700">
                        {data.description}
                    </p>
                    <p className="text-gray-500">
                        Category: {data.category.name}
                    </p>
                    <CustomButton width="w-56" text="Buy" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick={() => purchase()} />
                    <CustomButton width="w-56" text="Add to cart" bgColor="white" textColor="turquoise" borderColor="turquoise"
                        onClick={(e) => {
                            e.stopPropagation();
                            addProductToCart(data)
                        }}
                    />
                </div>
            </div>}
            {status === 'loading' && <Loader />}
            {status === 'error' && <p>Error loading product</p>}
        </div>
    );
}

export default Product;