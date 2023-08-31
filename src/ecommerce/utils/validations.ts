export const validateRegister = (e, data, status, inputErrors, setInputErrors) => {
    if (e.target.name === "name") {
        if (!e.target.value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)) {
            setInputErrors({ ...inputErrors, name: "Name is not valid" })
        } else {
            delete inputErrors["name"]
        }
    }
    if (e.target.name === "email") {
        if (!e.target.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)) {
            return setInputErrors({ ...inputErrors, email: "Email is not valid" })
        }
        if (data && status === "success" && data["isAvailable"] === false) {
            return setInputErrors({ ...inputErrors, email: "Email already in use" })
        } else {
            delete inputErrors["email"]
        }
    }
    if (e.target.name === "password") {
        if (e.target.value.length < 4) {
            setInputErrors({ ...inputErrors, password: "Password must have at least 4 characters" })
        } else {
            delete inputErrors["password"]
        }
    }
}

export const validateProductDetails = (e, data, status, inputErrors, setInputErrors) => {
    if (e.target.name === "title") {
        if ((e.target.value).length < 2) {
            setInputErrors({ ...inputErrors, title: "Title is not valid." })
        } else {
            delete inputErrors["title"]
        }
    }
    if (e.target.name === "price") {
        if (e.target.value != Number(e.target.value)) {
            setInputErrors({ ...inputErrors, price: "Price is not valid." })
        } else {
            delete inputErrors["price"]
        }
    }
    if (e.target.name === "categories") {
        if (e.target.value != Number(e.target.value) && data && status === "success" && !data.find(category => category.id === Number(e.target.value))) {
            setInputErrors({ ...inputErrors, categories: "Categories does not exist" })
        } else {
            delete inputErrors["categories"]
        }
    }
    if (e.target.name === "description") {
        if (e.target.value.length < 4) {
            setInputErrors({ ...inputErrors, description: "Description is not valid" })
        } else {
            delete inputErrors["description"]
        }
    }
    if (e.target.name === "image") {
        if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
            setInputErrors({ ...inputErrors, images: "Image URL is not valid" })
        } else {
            delete inputErrors["images"]
        }
    }
}

export const validateCategoryDetails = (e, inputErrors, setInputErrors) => {
    if (e.target.name === "name") {
        if ((e.target.value).length < 2) {
            setInputErrors({ ...inputErrors, name: "Name is not valid" })
        } else {
            delete inputErrors["name"]
        }
    }
    if (e.target.name === "image") {
        if (!e.target.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
            setInputErrors({ ...inputErrors, image: "Image URL is not valid" })
        } else {
            delete inputErrors["image"]
        }
    }
}

export const validateCard = (e, inputErrors, setInputErrors) => {
    const currentDate = new Date()
    if (e.target.name === "cardNumber") {
        if (!e.target.value.match(/^[0-9]{16}$/)) {
            setInputErrors({ ...inputErrors, cardNumber: "Card number is not valid" })
        } else {
            delete inputErrors["cardNumber"]
        }
    }
    if (e.target.name === "expirationYear") {
        const currentYear = currentDate.getFullYear()
        if (e.target.value < currentYear.toString().slice(2)) {
            setInputErrors({ ...inputErrors, expirationYear: "Card is already expired" })
        } else {
            delete inputErrors["expirationYear"]
        }
    }
    if (e.target.name === "expirationMonth") {
        const currentMonth = currentDate.getMonth() + 1
        console.log(currentMonth)
        if (e.target.value < currentMonth) {
            setInputErrors({ ...inputErrors, expirationMonth: "Card is already expired" })
        } else {
            delete inputErrors["expirationMonth"]
        }
    }
}