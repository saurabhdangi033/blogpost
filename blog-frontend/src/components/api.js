import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: 'https://blogpost-nu-seven.vercel.app', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});