import { useState } from "react";
import { useNavigate } from "react-router";
import { CATEGORIES_QUERY_KEY } from "../constants";
import { fetchCategories } from "../services/categories";
import { useQuery } from "react-query";

import Loader from "../components/Loader";

function CreateProduct() {

    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: []
    })
    const [inputErrors, setInputErrors] = useState({});
    const [error, setError] = useState(null);
    const [isCreated, setIsCreated] = useState(false);
    const userRole = window.localStorage.getItem("userRole");

    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    const validate = (e) => {
        console.log((e.target.value).length < 2)
        if (e.target.name === "title") {
            if ((e.target.value).length < 2) {
                setInputErrors({ ...inputErrors, title: "El título no es válido." })
            } else {
                delete inputErrors["title"]
            }
        }
        if (e.target.name === "price") {
            if (e.target.value != Number(e.target.value)) {
                setInputErrors({ ...inputErrors, price: "El precio no es válido." })
            } else {
                delete inputErrors["price"]
            }
        }
        if (e.target.name === "categories") {
            if (e.target.value != Number(e.target.value) && data && status === "success" && !data.find(category => category.id === Number(e.target.value))) {
                setInputErrors({ ...inputErrors, categories: "La categoría no existe" })
            } else {
                delete inputErrors["categories"]
            }
        }
        if (e.target.name === "description") {
            if (e.target.value.length < 4) {
                setInputErrors({ ...inputErrors, description: "La descripción no es válida" })
            } else {
                delete inputErrors["description"]
            }
        }
    }

    const handleInputChange = (e) => {        
        if (e.target.name === "image") {
            validate(e)
            setProductDetails({
                ...productDetails,
                [e.target.name]: [...productDetails.images, e.target.value]
            })
        } else {
            validate(e)
            setProductDetails({
                ...productDetails,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        setIsCreated(true)
        console.log(productDetails)
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-96 h-fit py-6 shadow shadow-slate-300 rounded-md">
                {
                    userRole !== "admin" ? <>
                        <p>Esta página no existe</p>
                    </> : <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Crear producto
                        </h2>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-80 h-fit">
                            <div className="flex flex-col mb-6">
                                <label
                                    htmlFor="title"
                                    className="text-gray-500 font-light text-md text-left"
                                >
                                    Título
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="title"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["title"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["title"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label
                                    htmlFor="price"
                                    className="text-gray-500 font-light text-md text-left"
                                >
                                    Precio
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="price"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["price"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["price"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="description" className="text-gray-500 font-light text-md text-left">Descripción</label>
                                <textarea
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="description"
                                    onChange={(e) => handleInputChange(e)}
                                ></textarea>
                                {inputErrors["description"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["description"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="categoryId" className="text-gray-500 font-light text-md text-left">
                                    Categorías
                                </label>
                                <select
                                    name="categoryId"
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    onChange={(e) => handleInputChange(e)}
                                >
                                    <option value="">Todas las categorías</option>
                                    {
                                        data && status == "success" && data.map((category) => (
                                            <option value={category.id} className="capitalize">
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                {inputErrors["categories"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["categories"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="image" className="text-gray-500 font-light text-md text-left">
                                    Imágenes
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="image"
                                    type="text"
                                />
                                <input className="mt-2 cursor-pointer text-turquoise bg-skyblue rounded-md" type="submit" value="Agregar imagen" onSubmit={(e) => handleInputChange(e)} />
                                {inputErrors["images"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["images"]}</p>}
                            </div>
                            <button
                                type="submit"
                                className="text-white w-80 mt-2 p-2 rounded-md bg-turquoise cursor-pointer border-[1px] hover:text-turquoise hover:bg-white hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                            >
                                {isCreated ? <Loader /> : "Crear producto"}
                            </button>
                        </form>
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default CreateProduct;