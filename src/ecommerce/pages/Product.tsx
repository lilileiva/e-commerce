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
                    <img
                        className="object-cover w-52 h-52"
                        src={data.images[0]}
                        alt={data.title}
                        onError={(e) => { e.target.src = camera }}
                    />
                </div>
            }
        </div>
    );
}

export default Product;