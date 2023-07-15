import { useState } from "react";
import { createUser } from "../services/user"
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const token = window.localStorage.getItem("token");

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }


    const register = async () => {
        try {
            const response = await createUser({ name, email, password })
            if (response.status === 201) {
                navigate("/")
            }
        } catch (error) {
            setError(error);
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        register();
    }

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center w-56 h-3/6">
                {
                    token ? <>
                        <p>No podés registrarte ni loguearte porque has iniciado sesión</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Ir a la página principal
                        </button>
                    </> : <>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-56 h-3/6">
                            <div className="flex flex-col">
                                <label htmlFor="name">Name</label>
                                <input name="name" type="text" onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input name="email" type="text" onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="text" onChange={(e) => handleInputChange(e)} />
                            </div>
                            <input
                                type="submit"
                                value="Registrarse"
                                className="text-white p-2 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in" />
                        </form>
                        <button className="text-turquoise mt-2 border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in">
                            Registrarse con Google
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-turquoise mt-2 border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in">
                            Iniciar sesión
                        </button>
                        {error && <p>{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default Register;