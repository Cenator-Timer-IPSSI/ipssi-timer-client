import axios from 'axios';

let uri = '';
if (process.env.NODE_ENV === 'production') {
	uri = 'https://cenator-api.herokuapp.com/';
} else {
	uri = process.env.REACT_APP_REST_ENDPOINT;
}

const axiosInstance = axios.create({
	baseURL: uri
});

axiosInstance.interceptors.request.use(
	(request) => {
		return request;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
