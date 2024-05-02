const API = process.env.EXPO_PUBLIC_API_URL;

export const fetchFormData = async () => {
    const response = await fetch(`${API}/form`);
    const data = await response.json();
    return data;
};