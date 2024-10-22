const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/v1';
const backendUrlUpload = import.meta.env.VITE_BACKEND_URL_UPLOAD || 'http://localhost:8000';

const apiFetch = async (endpoint, method = 'GET', data = null, isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Accept': 'application/json',
  };

  // Only add 'Content-Type' if not uploading files
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = isFormData ? data : JSON.stringify(data);
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
