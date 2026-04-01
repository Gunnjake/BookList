const API_BASE_OPTIONS = [
  'https://localhost:5001',
  'https://booklist-d2crdrepare3ceac.francecentral-01.azurewebsites.net',
] as const;

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

// Pick active backend
export const getApiBaseUrl = () => {
  const savedUrl = localStorage.getItem('book_api_base_url');
  if (savedUrl) {
    return savedUrl;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default to Azure outside local dev
  if (!LOCAL_HOSTS.has(window.location.hostname)) {
    return API_BASE_OPTIONS[1];
  }

  return API_BASE_OPTIONS[0];
};

export const API_URL_OPTIONS = API_BASE_OPTIONS;
