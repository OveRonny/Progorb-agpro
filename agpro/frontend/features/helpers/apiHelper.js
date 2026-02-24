export async function apiRequest(url, options = {}) {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    options.method = options.method || 'GET';

    const response = await fetch(url, options);

    if (!response.ok) {

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error('Not authenticated. Please log in again.');
        }

        const text = await response.text();
        throw new Error(text || `API request failed with status ${response.status}`);
    }

    try {
        return await response.json();
    } catch {
        return null;
    }
}