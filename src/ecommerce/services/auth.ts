import { baseUrl } from "../constants"

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