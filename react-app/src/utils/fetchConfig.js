// retrieves the current path for the express API
export async function fetchConfig() {
    const response = await fetch("/config.json");
    const config = await response.json();
    return config.backendAPI;
}