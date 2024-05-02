import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@formData';

export const getFormData = async () => {
    try {
        const formData = await AsyncStorage.getItem(STORAGE_KEY);
        return formData ? JSON.parse(formData) : {};
    } catch (error) {
        console.error('Error retrieving form data:', error);
        return {};
    }
};

export const setFormData = async (formData: any) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
        console.error('Error setting form data:', error);
    }
};
