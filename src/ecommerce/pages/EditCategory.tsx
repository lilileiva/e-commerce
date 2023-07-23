import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { CATEGORIES_QUERY_KEY, CATEGORY_QUERY_KEY } from "../constants";
import { fetchCategory, editCategory, deleteCategory } from "../services/categories";
import camera from "../../assets/camera-img.png";
import Loader from "../components/Loader";

function EditCategory() {

    const navigate = useNavigate()
    const { categoryId } = useParams();
    const queryClient = useQueryClient();

    queryClient.invalidateQueries([CATEGORY_QUERY_KEY]);
    const { data, status } = useQuery([CATEGORY_QUERY_KEY, { categoryId }], () => fetchCategory({ categoryId }))

    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        image: "",
        categoryId: ""
    })

    useEffect(() => {
        if (data && status === "success") {
            setCategoryDetails({
                name: data.name,
                image: data.image,
                categoryId: data.id
            })
        }
    }, [data])

    const [inputErrors, setInputErrors] = useState({});
    const [error, setError] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const userRole = window.localStorage.getItem("userRole");

    const validate = (e) => {
        if (e.target.name === "name") {
            if ((e.target.value).length < 2) {
                setInputErrors({ ...inputErrors, name: "El nombre no es válido" })
            } else {
                delete inputErrors["name"]
            }
        }
        if (e.target.name === "image") {
            if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
                setInputErrors({ ...inputErrors, image: "El URL de la imágen no es válido" })
            } else {
                delete inputErrors["image"]
            }
        }
    }

    const handleInputChange = (e) => {
        validate(e)
        setCategoryDetails({
            ...categoryDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(inputErrors).length === 0) {
            setIsEdited(true)
            try {
                const response = await editCategory(categoryDetails)
                if (response) {
                    navigate(`/categories/`)
                    queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
                }
            } catch (error) {
                setIsEdited(false)
                setError(error.toString())
            }
        }
    }

    const handleDeleteCategory = async (categoryId) => {
        setIsDeleted(true)
        try {            
            const response = await deleteCategory({ categoryId })
            if (response.status === 200) {
                navigate("/categories")
                queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
            }
        } catch (error) {
            setIsDeleted(false)
            setError(error.toString())
        }
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-1/2 h-fit p-6 shadow shadow-slate-300 rounded-md">
                {
                    userRole !== "admin" ? <>
                        <p>Esta página no existe</p>
                    </> : <>
                        {
                            data && status === "success" && <>
                                <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                                    Editar categoría
                                </h2>
                                <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-full h-fit">
                                    <div className="flex flex-col mb-6">
                                        <label
                                            htmlFor="name"
                                            className="text-gray-500 font-light text-md text-left"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            required
                                            className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                            name="name"
                                            type="text"
                                            value={categoryDetails.name}
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
                                            value={categoryDetails.image}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        {
                                            categoryDetails.image != "" && <img src={categoryDetails.image} alt="product image"
                                                className="w-32 h-32 object-cover rounded-md self-center mt-2" onError={(e) => { e.target.src = camera }}
                                            />
                                        }
                                        {inputErrors["image"] && <p className="text-turquoise text-sm text-center left-0 right-0">{inputErrors["image"]}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white w-full mt-2 p-2 rounded-md bg-turquoise cursor-pointer border-[1px] hover:text-turquoise hover:bg-white hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                                    >
                                        {isEdited ? <Loader /> : "Editar"}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white w-full mt-8 p-2 rounded-md bg-red-500 cursor-pointer border-[1px] hover:text-white hover:bg-red-700 transition duration-150 ease-out hover:ease-in"
                                        onClick={() => handleDeleteCategory(data.id)}
                                    >
                                        {isDeleted ? <Loader /> : "Eliminar categoría"}
                                    </button>
                                </form>
                            </>
                        }
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                        {status === 'loading' && <Loader />}
                        {status === 'error' && <p>Ha ocurrido un error</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default EditCategory;