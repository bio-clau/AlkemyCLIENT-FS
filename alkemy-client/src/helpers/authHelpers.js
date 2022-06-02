
const TOKEN = 'USER_TOKEN';

export function setToken (token) {
    localStorage.setItem(TOKEN, token);
};

export function getToken() {
    return localStorage.getItem(TOKEN);
};

export function deleteToken() {
    localStorage.removeItem(TOKEN);
};

// export function initAxiosInterceptor() {
//     Axios.interceptors.request.use(function(config) {
//         const token = getToken();
//         if(token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config;
//     })

//     Axios.interceptors.response.use(
//         function(response) {
//             return response;
//         },
//         function(error) {
//             if(error.response.status === 401) {
                
//             }
//         }
//     )
// }