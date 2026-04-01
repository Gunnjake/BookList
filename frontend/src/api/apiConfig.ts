const API_BASE_OPTIONS = [
  'https://booklist-d2crdrepare3ceac.francecentral-01.azurewebsites.net',
  'https://localhost:5001',
] as const;

// Pick active backend
export const getApiBaseUrl = () => {
  const savedUrl = localStorage.getItem('book_api_base_url');
  if (savedUrl) {
    return savedUrl;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default to live backend
  return API_BASE_OPTIONS[0];
};

export const API_URL_OPTIONS = API_BASE_OPTIONS;
