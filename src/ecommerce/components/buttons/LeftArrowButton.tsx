import LeftArrowIcon from "../../icons/LeftArrowIcon";

function LeftArrowButton({ size, onClick }) {
    return (
        <button
            className={`z-10 h-${size} w-${size} ml-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pr-[4px]`}
            onClick={onClick}
        >
            <LeftArrowIcon size='20' />
        </button>
    );
}

export default LeftArrowButton;