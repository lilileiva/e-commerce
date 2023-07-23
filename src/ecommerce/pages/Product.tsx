import { useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "../constants";
import { fetchProduct } from "../services/products";
import { useQuery } from "react-query";
import camera from "../../assets/camera-img.png";


function Product() {

    const { productId } = useParams()
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, productId], () => fetchProduct({ productId }))

    return (
        <div>
            {
                data && status === 'success' && <div>
                    <h1>{data.title}</h1>
                    <h2>{data.price}</h2>
                    <p>{data.description}</p>
                    <p>{data.category.name}</p>
                    {data.images.length > 0 && data.images.map((image, index) => (
                        <li className="flex w-32 h-32 relative overflow-x-hidden" key={index}>
                            <img src={image} alt="product image"
                                className="w-32 h-32 object-cover rounded-md" onError={(e) => { e.target.src = camera }}
                            />
                        </li>
                    ))}
                </div>
            }
        </div>
    );
}

export default Product;