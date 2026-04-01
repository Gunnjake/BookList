const API_BASE_OPTIONS = [
  'https://localhost:5001',
  'https://booklist-d2crdrepare3ceac.francecentral-01.azurewebsites.net',
] as const;

// Pick active backend
export const getApiBaseUrl = () =>
  localStorage.getItem('book_api_base_url') ??
  import.meta.env.VITE_API_BASE_URL ??
  API_BASE_OPTIONS[0];

export const API_URL_OPTIONS = API_BASE_OPTIONS;
