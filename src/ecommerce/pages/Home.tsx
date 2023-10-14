import { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProducts } from "../services/products";
import { fetchCategories } from "../services/categories";
import GlobalStateContext from "../context/globalStateContext";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants";

import BestCategories from "../components/BestCategories";
import BannerCarousel from "../components/BannerCarousel";
import ProductsOffers from "../components/ProductsOffers";
import RightArrowIcon from "../icons/RightArrowIcon";

import watch_banner from "../../assets/Shop-Products-Social-Media-Banner.png"
import sale_banner from "../../assets/mega-sale-banner.jpg"
import balck_friday_banner from "../../assets/black-friday-banner.jpg"

function Home() {

    const navigate = useNavigate()
    const location = useLocation()
    const { dispatch } = useContext(GlobalStateContext);
    const [order] = useState("")
    const images = [watch_banner, sale_banner, balck_friday_banner]

    const products = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search, order }], () => fetchProducts({ filter: location.search, order }))
    const categories = useQuery([CATEGORIES_QUERY_KEY], () => fetchCategories())

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    return (
        <div>
            <BannerCarousel images={images} />
            <div className="w-full h-fit mt-8">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        Products in
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">offer</p>
                    </p>
                    <div className="flex items-center">
                        <p className="text-md w-fit text-gray-500 cursor-pointer mr-2"
                            onClick={() => {
                                dispatch({ type: 'SET_PAGE', payload: 1 })
                                navigate("/products")
                            }}>
                            View more
                        </p>
                        < RightArrowIcon size="18" color="#1ABCFE" />
                    </div>
                </div>
                <ProductsOffers data={products?.data?.slice(0, 5)} status={products?.status} />
            </div>
            <div className="w-full h-fit mt-8">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        Best
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">categories</p>
                    </p>
                    <div className="flex items-center">
                        <p className="text-md w-fit text-gray-500 cursor-pointer  mr-2"
                            onClick={() => navigate("/categories")}>
                            View more
                        </p>
                        < RightArrowIcon size="18" color="#1ABCFE" />
                    </div>
                </div>
                <BestCategories data={categories?.data?.slice(0, 5)} status={categories?.status} />
            </div>
        </div>
    );
}

export default Home;