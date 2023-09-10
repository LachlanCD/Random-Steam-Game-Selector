export async function GETData(url) {
    try{
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (error) {
        throw error
    }
}