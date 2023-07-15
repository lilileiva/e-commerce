import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/user";

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const token = window.localStorage.getItem("token");

    const handleInputChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const login = async () => {
        try {
            let response = await loginUser({ email, password })
            if (response != undefined && response.status === 201) {
                response = await response.json()
                const token = await response.access_token;
                console.log(token)
                window.localStorage.setItem("token", token);
                navigate("/");
            } else {
                setError("No se pudo iniciar sesión. Verifique que los datos ingresados sean correctos.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center w-3/6 h-3/6">
                {
                    token ? <>
                        <p>Ya has iniciado sesión</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Ir a la página principal
                        </button>
                    </> : <>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-56 h-3/6">
                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input required name="email" type="text" onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password">Password</label>
                                <input required name="password" type="text" onChange={(e) => handleInputChange(e)} />
                            </div>
                            <input
                                type="submit"
                                value="Ingresar"
                                className="text-turquoise border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in" />
                        </form>
                        <button
                            onClick={() => navigate("/register")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Registrarse
                        </button>
                        {error && <p>{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default Login;