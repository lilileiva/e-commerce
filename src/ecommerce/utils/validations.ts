export const validateRegister = (e, data, status, inputErrors, setInputErrors) => {
    if (e.target.name === "name") {
        if (!e.target.value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)) {
            setInputErrors({ ...inputErrors, name: "El nombre no es válido." })
        } else {
            delete inputErrors["name"]
        }
    }
    if (e.target.name === "email") {
        if (!e.target.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)) {
            return setInputErrors({ ...inputErrors, email: "El correo electrónico no es válido." })
        }            
        if (data && status === "success" && data["isAvailable"] === false) {             
            return setInputErrors({ ...inputErrors, email: "El correo electrónico ya está en uso." })
        } else {
            delete inputErrors["email"]
        }
    }
    if (e.target.name === "password") {
        if (e.target.value.length < 4) {
            setInputErrors({ ...inputErrors, password: "La contraseña debe tener al menos 4 caracteres." })
        } else {
            delete inputErrors["password"]
        }
    }
}

export const validateProductDetails = (e, data, status, inputErrors, setInputErrors) => {
    if (e.target.name === "title") {
        if ((e.target.value).length < 2) {
            setInputErrors({ ...inputErrors, title: "El título no es válido." })
        } else {
            delete inputErrors["title"]
        }
    }
    if (e.target.name === "price") {
        if (e.target.value != Number(e.target.value)) {
            setInputErrors({ ...inputErrors, price: "El precio no es válido." })
        } else {
            delete inputErrors["price"]
        }
    }
    if (e.target.name === "categories") {
        if (e.target.value != Number(e.target.value) && data && status === "success" && !data.find(category => category.id === Number(e.target.value))) {
            setInputErrors({ ...inputErrors, categories: "La categoría no existe" })
        } else {
            delete inputErrors["categories"]
        }
    }
    if (e.target.name === "description") {
        if (e.target.value.length < 4) {
            setInputErrors({ ...inputErrors, description: "La descripción no es válida" })
        } else {
            delete inputErrors["description"]
        }
    }
    if (e.target.name === "image") {
        if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
            setInputErrors({ ...inputErrors, images: "El URL de la imagen no es válido" })
        } else {
            delete inputErrors["images"]
        }
    }
}

export const validateCategoryDetails = (e, inputErrors, setInputErrors) => {        
    if (e.target.name === "name") {
        if ((e.target.value).length < 2) {
            setInputErrors({ ...inputErrors, name: "El nombre no es válido" })
        } else {
            delete inputErrors["name"]
        }
    }
    if (e.target.name === "image") {
        if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
            setInputErrors({ ...inputErrors, image: "El URL de la imagen no es válido" })
        } else {
            delete inputErrors["image"]
        }
    }
}