import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/categories";
import { CATEGORY_QUERY_KEY } from "../constants";
import { useMutation } from "react-query";
import { validateCategoryDetails } from "../utils/validations";
import camera from "../../assets/camera-img.png";

import Loader from "../components/Loader";

function CreateCategory() {

    const navigate = useNavigate()
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        image: ""
    })
    const [inputErrors, setInputErrors] = useState({});
    const [error, setError] = useState(null);
    const [isCreated, setIsCreated] = useState(false);
    const userRole = window.localStorage.getItem("userRole");
    if (userRole !== "admin") navigate("/")

    const handleInputChange = (e) => {        
        validateCategoryDetails(e, inputErrors, setInputErrors)
        setCategoryDetails({
            ...categoryDetails,
            [e.target.name]: e.target.value
        })
    }

    const { mutate } = useMutation([CATEGORY_QUERY_KEY], () => createCategory(categoryDetails), {
        onSuccess: () => {
            navigate(`/categories/`)
        },
        onError: (error) => {
            setIsCreated(false)
            setError(error.toString())
        }
    })

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(inputErrors).length === 0) {
            setIsCreated(true)
            mutate()
        }
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-1/2 h-fit p-6 shadow shadow-slate-300 rounded-md">
                {
                    userRole !== "admin" ? <>
                        <p>Esta página no existe</p>
                    </> : <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Crear categoría
                        </h2>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-full h-fit">
                            <div className="flex flex-col mb-6">
                                <label
                                    htmlFor="title"
                                    className="text-gray-500 font-light text-md text-left"
                                >
                                    Nombre
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="name"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["name"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["name"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="image" className="text-gray-500 font-light text-md text-left">
                                    Imágenes
                                </label>
                                <input
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="image"
                                    type="text"
                                    placeholder="URL de imágen"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {
                                    categoryDetails.image != "" && <img src={categoryDetails.image} alt="product image"
                                        className="w-32 h-32 object-cover rounded-md self-center mt-2" onError={(e) => { e.target["src"] = camera }}
                                    />
                                }
                                {inputErrors["image"] && <p className="text-turquoise text-sm text-center left-0 right-0">{inputErrors["image"]}</p>}
                            </div>
                            <button
                                type="submit"
                                className="text-white w-full mt-2 p-2 rounded-md bg-turquoise cursor-pointer border-[1px] hover:text-turquoise hover:bg-white hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                            >
                                {isCreated ? <Loader /> : "Crear categoría"}
                            </button>
                        </form>
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default CreateCategory;