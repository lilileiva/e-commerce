import RightArrowIcon from "../../icons/RightArrowIcon";

function RightArrowButton({ size, onClick }) {
    return (
        <button
            className={`z-10 h-${size} w-${size} mr-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pl-[4px]`}
            onClick={onClick}
        >
            <RightArrowIcon size='20' />
        </button>
    );
}

export default RightArrowButton;