export async function GETData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json()
    return data;
}