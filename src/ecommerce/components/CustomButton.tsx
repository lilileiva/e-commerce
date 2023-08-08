function CustomButton({width, text, bgColor, textColor, borderColor, onClick}) {
    return (
        <button
            className={`w-${width} bg-${bgColor} text-${textColor} border-${borderColor} font-bold p-2 m-2 self-center rounded-md cursor-pointer border-2 hover:bg-${textColor} hover:text-${bgColor} hover:border-${bgColor} transition duration-150 ease-out hover:ease-in`}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default CustomButton;