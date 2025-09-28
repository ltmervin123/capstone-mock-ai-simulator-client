import axios from 'axios';
const API_ENDPOINT = import.meta.env.VITE_APP_API_URL;
const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
});

// TODO: Enable this when backend is ready with proper error messages
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401 && error.response.data?.message) {
//       switch (error.response.data.message) {
//         case 'Token is missing':
//           window.location.replace('/login?reason=TOKEN_MISSING');
//           break;
//         case 'Token has expired':
//           window.location.replace('/login?reason=SESSION_EXPIRED');
//           break;

//         default:
//           window.location.replace('/login');
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default apiClient;
