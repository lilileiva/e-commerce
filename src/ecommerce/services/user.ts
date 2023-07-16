import { baseUrl } from "../constants"

interface createUserProps {
    name: string;
    email: string;
    password: string;
}

export const createUser = async ({ name, email, password }: createUserProps) => {
    try {
        const response = await fetch(`${baseUrl}/users/`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

interface loginUserProps {
    email: string;
    password: string;
}

export const loginUser = async ({ email, password }: loginUserProps) => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};