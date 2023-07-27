import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { deleteProduct, editProduct, fetchProduct } from "../services/products";
import { useEffect, useState } from "react";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY, PRODUCT_QUERY_KEY } from "../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchCategories } from "../services/categories";
import Modal from "../components/Modal";
import ImagesScrollList from "../components/ImagesScrollList";


function EditProduct() {

    const { productId } = useParams()
    const userRole = window.localStorage.getItem("userRole");
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [inputErrors, setInputErrors] = useState({});
    const [image, setImage] = useState("")
    const [error, setError] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [modal, setModal] = useState(false);
    const [categoriesList, setCategoriesList] = useState([])
    const [productDetails, setProductDetails] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [],
        productId: ""
    })

    queryClient.invalidateQueries([PRODUCT_QUERY_KEY]);
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, { productId }], () => fetchProduct({ productId }))
    queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
    const categories = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    useEffect(() => {
        if (data && status === "success") {
            setProductDetails({
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.category.id,
                images: data.images,
                productId: productId
            })
            if (categories && categories.data) {
                setCategoriesList(categories.data.filter((category) => category.id != data.category.id))
            } else {
                setCategoriesList(categories.data)
            }
        }
    }, [data])

    const validate = (e) => {
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
        if (e.target.name === "image") {
            if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
                setInputErrors({ ...inputErrors, images: "El URL de la imágen no es válido" })
            } else {
                delete inputErrors["images"]
            }
        }
    }

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
            images: productDetails.images.filter((image, i) => i !== index)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "image") {
            validate(e)
            setImage(e.target.value)
        } else {
            validate(e)
            setProductDetails({
                ...productDetails,
                [e.target.name]: e.target.value
            })
        }
    }

    const editMutation = useMutation([PRODUCT_QUERY_KEY], () => editProduct(productDetails), {
        onSuccess: (product) => {
            navigate(`/products/${product.id}`)
            queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
        },
        onError: (error) => {
            setIsEdited(false)
            setError(error.toString())
        }
    })

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (productDetails.images.length === 0) setInputErrors({ ...inputErrors, images: 'El producto debe tener al menos una imagen' })
        else if (Object.keys(inputErrors).length === 0) {
            setIsEdited(true)
            editMutation.mutate()
        }
    }

    const deleteMutation = useMutation([PRODUCT_QUERY_KEY, { productId }], () => deleteProduct({ productId }), {
        onSuccess: () => {
            navigate("/products")
            queryClient.invalidateQueries([PRODUCTS_QUERY_KEY, { filter: "", order: "" }]);
        },
        onError: (error) => {
            setLoadButton(false)
            setError(error.toString())
        }
    })

    const handleDeleteProduct = async (productId) => {
        setLoadButton(true)
        deleteMutation.mutate(productId)
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-1/2 h-fit p-6 shadow shadow-slate-300 rounded-md">
                {userRole !== "admin" ? <>
                    <p>Esta página no existe</p>
                </> : <>
                    {data && status === "success" && <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Editar producto
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
                                    value={productDetails.title}
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
                                    value={productDetails.price}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["price"] && <p className="text-turquoise text-sm text-center left-0 right-0 absolute mt-14">{inputErrors["price"]}</p>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="description" className="text-gray-500 font-light text-md text-left">
                                    Descripción
                                </label>
                                <textarea
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    name="description"
                                    value={productDetails.description}
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
                                    {(data && status === "success") && <option value={data.category.id} className="capitalize">
                                        {data.category.name}
                                    </option>}
                                    {categoriesList.map((category) => (
                                        <option value={category.id} className="capitalize">
                                            {category.name}
                                        </option>
                                    ))}
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
                                    placeholder="URL de imágen"
                                    onChange={(e) => handleInputChange(e)}
                                    value={image}
                                />
                                <button className="mt-2 cursor-pointer text-turquoise bg-skyblue rounded-md py-4" type="button" onClick={() => addImage()}>
                                    Agregar imágen
                                </button>
                                <ImagesScrollList images={productDetails?.images} deleteImage={deleteImage} />
                                {inputErrors["images"] && <p className="text-turquoise text-sm text-center left-0 right-0">{inputErrors["images"]}</p>}
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
                                Eliminar producto
                            </button>
                        </form>
                    </>}
                    {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                    {status === 'loading' && <Loader />}
                    {status === 'error' && <p>Ha ocurrido un error</p>}
                    {modal && <Modal
                        text='¿Estás seguro de eliminar este producto?'
                        btnText='Eliminar producto'
                        loadButton={loadButton}
                        func={handleDeleteProduct}
                        arg={data.id}
                        modal={modal}
                        setModal={setModal}
                    />}
                </>}
            </div>
        </div>
    );
}

export default EditProduct;