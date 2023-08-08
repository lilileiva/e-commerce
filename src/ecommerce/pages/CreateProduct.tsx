import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES_QUERY_KEY, PRODUCT_QUERY_KEY } from "../constants";
import { fetchCategories } from "../services/categories";
import { useMutation, useQuery } from "react-query";
import { createProduct } from "../services/products";
import { validateProductDetails } from "../utils/validations";

import Loader from "../components/Loader";
import ImagesScrollList from "../components/ImagesScrollList";

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
    const [image, setImage] = useState("")
    const [error, setError] = useState(null);
    const [isCreated, setIsCreated] = useState(false);
    const userRole = window.localStorage.getItem("userRole");
    if (userRole !== "admin") navigate("/")

    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    const addImage = () => {
        setProductDetails({
            ...productDetails,
            images: [...productDetails.images, image]
        })
        setImage("")
    }

    const deleteImage = (index) => {
        setProductDetails({
            ...productDetails,
            images: productDetails.images.splice(index, 1)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "image") {            
            validateProductDetails(e, data, status, inputErrors, setInputErrors)
            setImage(e.target.value)
        } else {            
            validateProductDetails(e, data, status, inputErrors, setInputErrors)
            setProductDetails({
                ...productDetails,
                [e.target.name]: e.target.value
            })
        }
    }

    const { mutate } = useMutation([PRODUCT_QUERY_KEY], () => createProduct(productDetails), {
        onSuccess: (product) => {
            navigate(`/products/${product.id}`)
        },
        onError: (error) => {
            setIsCreated(false)
            setError(error.toString())
        }
    })

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (productDetails.images.length === 0) setInputErrors({ ...inputErrors, images: 'El producto debe tener al menos una imagen' })
        else if (Object.keys(inputErrors).length === 0) {
            setIsCreated(true)
            mutate()
        }
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-1/2 h-fit p-6 shadow shadow-slate-300 rounded-md">
                {userRole !== "admin" ? <>
                    <p>Esta página no existe</p>
                </> : <>
                    <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                        Crear producto
                    </h2>
                    <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-full h-fit">
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
                            {inputErrors["title"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["title"]}</p>}
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
                            {inputErrors["price"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["price"]}</p>}
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="description" className="text-gray-500 font-light text-md text-left">Descripción</label>
                            <textarea
                                className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                name="description"
                                onChange={(e) => handleInputChange(e)}
                            ></textarea>
                            {inputErrors["description"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["description"]}</p>}
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
                            {inputErrors["categories"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["categories"]}</p>}
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="image" className="text-gray-500 font-light text-md text-left">
                                Imágenes
                            </label>
                            <input
                                className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                name="image"
                                type="text"
                                placeholder="URL de imagen"
                                onChange={(e) => handleInputChange(e)}
                                value={image}
                            />
                            <button className="mt-2 cursor-pointer text-turquoise bg-skyblue rounded-md py-4" type="button" onClick={() => addImage()}>
                                Agregar imagen
                            </button>
                            <ImagesScrollList images={productDetails?.images} deleteImage={deleteImage} />
                            {inputErrors["images"] && <p className="text-turquoise text-sm text-center left-0 right-0">{inputErrors["images"]}</p>}
                        </div>
                        <button
                            type="submit"
                            className="text-white w-full mt-2 p-2 rounded-md bg-turquoise cursor-pointer border-[1px] hover:text-turquoise hover:bg-white hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                        >
                            {isCreated ? <Loader /> : "Crear producto"}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                </>}
            </div>
        </div>
    );
}

export default CreateProduct;