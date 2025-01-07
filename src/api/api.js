export const fetchWithAuth = async (url, options = {}) => {
  const token = sessionStorage.getItem('authToken');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
