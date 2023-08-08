import camera from "../../assets/camera-img.png";

function ImagesScrollList({images, deleteImage}) {
    return (
        <ul className="flex overflow-x-scroll mt-4 gap-2">
            {images.length > 0 && images.map((image, index) => (
                <li key={index} className="w-32 h-32 flex-shrink-0 relative">
                    <button
                        type="button"
                        onClick={() => deleteImage(index)}
                        className="z-10 text-white bg-turquoise w-6 h-6 absolute rounded-md right-0"
                    >
                        X
                    </button>
                    <img
                        src={image}
                        alt="product image"
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => { e.target["src"] = camera }}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ImagesScrollList;