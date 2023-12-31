import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants"
import { fetchCategories } from "../services/categories";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalStateContext from "../context/globalStateContext";

import CloseIcon from "../icons/CloseIcon";
import MenuFoldIcon from "../icons/MenuFoldIcon";
import CustomButton from "./CustomButton";

function FilterBar({ showFilters, setShowFilters, setOrder }) {

    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { dispatch } = useContext(GlobalStateContext);
    const [filter, setFilter] = useState("")
    const [orderValue, setOrderValue] = useState("")
    const [category, setCategory] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [title, setTitle] = useState("")

    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    useEffect(() => {
        if (window.innerWidth < 1024) setShowFilters(false)
        else setShowFilters(true)
    }, [window])

    const handleInputChange = (e) => {
        if (location.search) {
            const search = location.search
            let splited = search.split('&')
            splited.map((item) => {
                if (item.split('=')[0] === 'title') {
                    setTitle(`&${item}`)
                }
            })
        }
        if (e.target.name === "categories") {
            setCategory(`&categoryId=${e.target.value}`)
        }
        if (e.target.name === "price_min") {
            if (e.target.value != "") {
                setMinPrice(`&price_min=${e.target.value}`)
            } else {
                setMinPrice("&price_min=1")
            }
            if (maxPrice == "") {
                setMaxPrice("&price_max=1000000")
            }
        }
        if (e.target.name === "price_max") {
            if (e.target.value != "") {
                setMaxPrice(`&price_max=${e.target.value}`)
            } else {
                setMaxPrice("&price_max=1000000")
            }
            if (minPrice == "") {
                setMinPrice("&price_min=1")
            }
        }
        if (e.target.name === "order") {
            setOrderValue(e.target.value)
        }
    }

    useEffect(() => {
        setFilter(title + category + minPrice + maxPrice)
    }, [title, category, minPrice, maxPrice])

    const handleInputSubmit = (e) => {
        e.preventDefault()
        setFilter(category + minPrice + maxPrice)
        setOrder(orderValue)
        queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
        dispatch({ type: 'SET_PAGE', payload: 1 });
        navigate(`/products/?${filter}`)
    }

    return (
        <>
            {showFilters ? <div className="lg:sticky lg:top-8 lg:mb-10 mb-4 h-80 lg:w-80 w-full flex flex-col justify-top align-left shadow shadow-slate-300 rounded-md p-4 h-fit duration-150">
                <div className="flex mb-4 justify-between items-center">
                    <h3 className="font-semibold text-gray-500">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                        <CloseIcon size='25' />
                    </button>
                </div>
                <div className="h-full lg:flex lg:flex-col lg:justify-around md:flex md:flex-col md:gap-4 md:justify-center flex flex-col justify-center">
                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="order" className="lg:font-semibold lg:text-lg text-md text-gray-500">
                            Order
                        </label>
                        <select
                            name="order"
                            className="w-full h-6 rounded-sm cursor-pointer border-[1px] border-gray-200 text-gray-500 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="" selected disabled>-----</option>
                            <option value="title_asc">
                                Alphabetically: A to Z
                            </option>
                            <option value="title_desc">
                                Alphabetically: Z to A
                            </option>
                            <option value="price_desc">
                                Price: Higher to lower
                            </option>
                            <option value="price_asc">
                                Price: Lower to higher
                            </option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="categories" className="lg:font-semibold lg:text-lg text-md text-gray-500">
                            Categories
                        </label>
                        <select
                            name="categories"
                            className="w-full h-6 rounded-sm cursor-pointer border-[1px] border-gray-200 text-gray-400 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option defaultValue="" disabled>
                                All categorías
                            </option>
                            {
                                data && status == "success" && data.map((category) => (
                                    <option value={category.id} className="capitalize" key={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col mb-6">
                        <h2 className="lg:font-semibold lg:text-lg text-md text-gray-500">
                            Price range
                        </h2>
                        <div className="inline-flex justify-left gap-2 w-full">
                            <input
                                name="price_min"
                                type="text"
                                placeholder="Min"
                                onChange={(e) => handleInputChange(e)}
                                className="w-full border-[1px] border-gray-200 rounded-sm pl-2 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            />
                            <input
                                name="price_max"
                                type="text"
                                placeholder="Max"
                                onChange={(e) => handleInputChange(e)}
                                className="w-full border-[1px] border-gray-200 rounded-sm pl-2 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            />
                        </div>
                    </div>
                    <CustomButton
                        width="w-fit"
                        text="Search"
                        bgColor="white"
                        textColor="turquoise"
                        borderColor="turquoise"
                        onClick={(e) => handleInputSubmit(e)}
                    />
                </div>
            </div> : <div className="w-min h-min flex flex-col place-self-center duration-150">
                <button
                    className="bg-skyblue rounded-md md:p-2 p-[1px]"
                    onClick={() => setShowFilters(true)}>
                    <MenuFoldIcon size='30' />
                </button>
            </div>}
        </>
    );
}

export default FilterBar;