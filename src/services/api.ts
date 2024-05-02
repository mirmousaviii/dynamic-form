export const fetchFormData = async () => {
    const response = await fetch('https://dynamic-form.wiremockapi.cloud/api/v1/form');
    const data = await response.json();
    return data;
};
