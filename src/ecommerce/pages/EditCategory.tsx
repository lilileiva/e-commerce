import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CATEGORIES_QUERY_KEY, CATEGORY_QUERY_KEY } from "../constants";
import { fetchCategory, editCategory, deleteCategory } from "../services/categories";
import { validateCategoryDetails } from "../utils/validations";
import camera from "../../assets/camera-img.png";

import Loader from "../components/Loader";
import Modal from "../components/Modal";

function EditCategory() {

    const { categoryId } = useParams();
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [inputErrors, setInputErrors] = useState({});
    const [error, setError] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [modal, setModal] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        image: "",
        categoryId: ""
    })
    const userRole = window.localStorage.getItem("userRole");
    if (userRole !== "admin") navigate("/")

    queryClient.invalidateQueries([CATEGORY_QUERY_KEY]);
    const { data, status } = useQuery([CATEGORY_QUERY_KEY, { categoryId }], () => fetchCategory({ categoryId }), {
        onSuccess: (data) => {
            setCategoryDetails({
                name: data.name,
                image: data.image,
                categoryId: data.id
            })
        }
    })

    const handleInputChange = (e) => {
        validateCategoryDetails(e, inputErrors, setInputErrors)
        setCategoryDetails({
            ...categoryDetails,
            [e.target.name]: e.target.value
        })
    }

    const editMutation = useMutation([CATEGORY_QUERY_KEY], () => editCategory(categoryDetails), {
        onSuccess: () => {
            navigate("/categories")
            queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
        },
        onError: (error) => {
            setIsEdited(false)
            setError(error.toString())
        }
    })

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(inputErrors).length === 0) {
            setIsEdited(true)
            editMutation.mutate()
        }
    }

    const deleteMutation = useMutation([CATEGORY_QUERY_KEY, { categoryId }], () => deleteCategory({ categoryId }), {
        onSuccess: () => {
            navigate("/categories")
            queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
        },
        onError: (error) => {
            setLoadButton(false)
            setError(error.toString())
        }
    })

    const handleDeleteCategory = async (categoryId) => {
        setLoadButton(true)
        deleteMutation.mutate(categoryId)
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center lg:w-1/2 w-11/12 h-fit p-6 shadow shadow-slate-300 rounded-md">
                {
                    userRole !== "admin" ? <>
                        <p>This page does not exist</p>
                    </> : <>
                        {
                            data && status === "success" && <>
                                <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                                    Update category
                                </h2>
                                <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-full h-fit">
                                    <div className="flex flex-col mb-6">
                                        <label
                                            htmlFor="name"
                                            className="text-gray-500 font-light text-md text-left"
                                        >
                                            Name
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
                                            Images
                                        </label>
                                        <input
                                            className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                            name="image"
                                            type="text"
                                            placeholder="Image URL"
                                            value={categoryDetails.image}
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
                                        {isEdited ? <Loader /> : "Editar"}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white w-full mt-8 p-2 rounded-md bg-red-500 cursor-pointer border-[1px] hover:text-white hover:bg-red-700 transition duration-150 ease-out hover:ease-in"
                                        onClick={() => setModal(!modal)}
                                    >
                                        Delete category
                                    </button>
                                </form>
                            </>
                        }
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                        {status === 'loading' && <Loader />}
                        {status === 'error' && <p>There is an error</p>}
                        {modal && <Modal
                            text='¿Estás seguro de eliminar esta categoría?'
                            btnText='Eliminar categoría'
                            loadButton={loadButton}
                            func={handleDeleteCategory}
                            arg={data.id}
                            modal={modal}
                            setModal={setModal}
                        />}
                    </>
                }
            </div>
        </div>
    );
}

export default EditCategory;