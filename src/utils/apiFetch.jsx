const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/v1'; // fallback

const apiFetch = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add the token to headers if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${backendUrl}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Unknown error' };
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default apiFetch;
