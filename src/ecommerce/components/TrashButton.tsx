import TrashIcon from "../icons/TrashIcon";

function TrashButton({width, bgColor, color, borderColor, onClick}) {
    return (
        <button
            className={`w-${width} bg-${bgColor} border-${borderColor} text-clip font-bold p-2 m-2 lg:text-base text-sm self-center rounded-md cursor-pointer border-2 hover:bg-blue-100 hover:text-${bgColor} hover:border-${bgColor} transition duration-150 ease-out hover:ease-in`}
            type="button"
            onClick={onClick}
        >
            <TrashIcon size='20' color={color} />
        </button>
    );
}

export default TrashButton;