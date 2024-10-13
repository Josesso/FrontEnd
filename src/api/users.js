import axios from './axios';

export const getUsers = async () => await axios.get('/usuarios');

export const registerUser = async data => await axios.post('/usuarios',data);

