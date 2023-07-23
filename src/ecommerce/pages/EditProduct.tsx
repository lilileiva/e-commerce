import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { deleteProduct, editProduct, fetchProduct } from "../services/products";
import { useEffect, useState } from "react";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY, PRODUCT_QUERY_KEY } from "../constants";
import { useQuery, useQueryClient } from "react-query";
import { fetchCategories } from "../services/categories";


function EditProduct() {

    const { productId } = useParams()
    const queryClient = useQueryClient();

    queryClient.invalidateQueries([PRODUCT_QUERY_KEY]);
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, { productId }], () => fetchProduct({ productId }))

    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [],
        productId: ""
    })

    useEffect(() => {
        if (data && status === "success") {
            setProductDetails({
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.id,
                images: data.images,
                productId: productId
            })
        }
    }, [data])

    const [inputErrors, setInputErrors] = useState({});
    const [image, setImage] = useState("")
    const [error, setError] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const userRole = window.localStorage.getItem("userRole");

    const categories = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

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

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        if (productDetails.images.length === 0) setInputErrors({...inputErrors, images: 'El producto debe tener al menos una imagen'})
        else if (Object.keys(inputErrors).length === 0) {
            setIsEdited(true)
            try {
                const response = await editProduct(productDetails)                
                if (response && response.status === 200) {
                    const product = await response.json()
                    navigate(`/products/${product.id}`)
                }
            } catch (error) {
                setIsEdited(false)
                setError(error.toString())
            }
        }
    }

    const handleDeleteProduct = async (productId) => {
        setIsDeleted(true)
        try {
            const response = await deleteProduct({ productId })
            if (response.status === 200) {
                navigate("/products")
                queryClient.invalidateQueries([PRODUCTS_QUERY_KEY, {filter: "", order: ""}]);
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
                                    <label htmlFor="description" className="text-gray-500 font-light text-md text-left">Descripción</label>
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
                                        value={productDetails.categoryId}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <option value="">Todas las categorías</option>
                                        {categories.data && categories.status == "success" && categories.data.map((category) => (
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
                                    <ul className="flex overflow-x-scroll mt-4 gap-2 w-full">
                                        {productDetails.images.length > 0 && productDetails.images.map((image, index) => (
                                            <li className="w-32 h-32 relative" key={index}>
                                                <button
                                                    onClick={() => deleteImage(index)}
                                                    className="text-white bg-turquoise w-6 h-6 rounded-md absolute right-0"
                                                >
                                                    X
                                                </button>
                                                <img src={image} alt="product image"
                                                    className="w-32 h-32 object-cover rounded-md" onError={(e) => { e.target.src = camera }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
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
                                    onClick={() => handleDeleteProduct(data.id)}
                                >
                                    {isDeleted ? <Loader /> : "Eliminar categoría"}
                                </button>
                            </form>
                        </>}
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                        {status === 'loading' && <Loader />}
                        {status === 'error' && <p>Ha ocurrido un error</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default EditProduct;