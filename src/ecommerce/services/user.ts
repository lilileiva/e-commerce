import { baseUrl } from "../constants"

export const getUsers = async () => {
    try {
        const response = await fetch(`${baseUrl}/users/`)            
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const users = await response.json()
        return users        
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

interface getUserProps {
    email: string;
}

export const getUser = async ({ email }: getUserProps) => {
    try {
        const response = await fetch(`${baseUrl}/users/`)            
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const users = await response.json()        
        return users.find((user) => user.email === email)
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}

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

export const checkAvailableEmail = async ({ email }) => {
    try {
        const response = await fetch(`${baseUrl}/users/is-available`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email                
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }        
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}