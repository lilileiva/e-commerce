import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

function NotFound() {

    const navigate = useNavigate()
   
    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-80 h-fit py-6 shadow shadow-slate-300 rounded-md">
                <div className="px-6 flex flex-col items-center">
                    <h2 className="text-3xl text-center p-2 text-gray-400">404 NOT FOUND</h2>
                    <CustomButton width="w-56" text="Go to home" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick={() => navigate("/")} />
                </div>
            </div>
        </div>
    );
}

export default NotFound;