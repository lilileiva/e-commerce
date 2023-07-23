import Loader from "./Loader";

function Modal({ text, btnText, loadButton, func, arg, modal, setModal }) {

    return (
        <div className="fixed inset-0 right-0 left-0 bg-gray-500/75 flex justify-center items-center">
            <div className="flex flex-col w-96 h-40 bg-white rounded-md justify-center items-center p-2 duraion-400 relative">
                <button className="font-bold text-gray-600 px-2 absolute top-0 right-0" onClick={() => setModal(!modal)}>X</button>
                <p className="text-center text-gray-700">{text}</p>
                <button
                    type="button"
                    className="text-white w-fit mt-8 p-2 rounded-md bg-red-500 cursor-pointer border-[1px] hover:text-white hover:bg-red-700 transition duration-150 ease-out hover:ease-in"
                    onClick={() => func(arg)}
                >
                    {loadButton ? <Loader /> : <p>{btnText}</p>}
                </button>
            </div>
        </div>
    );
}

export default Modal;