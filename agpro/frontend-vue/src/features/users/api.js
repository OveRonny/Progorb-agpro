import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/auth', 
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});

export async function loginUser(credentials) {
  const { data } = await apiClient.post('/login', credentials)
  return data
};

export async function registerUser(userData) {
  const { data } = await apiClient.post('/register', userData)
  return data
};

export async function getProfile() {
  try {
  const { data } = await apiClient.get('/users/me');
  return data;
} catch (error) {
  if (error.response) {   
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
    console.error('Data:', error.response.data);
  } else if (error.request) {
   
    console.error('Request made but no response:', error.request);
  } else {    
    console.error('Error:', error.message);
  }
  throw error; 
}
}