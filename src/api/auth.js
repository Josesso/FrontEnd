import axios from './axios';


export const loginRequest = async(user) => await axios.post('/usuarios/login', user);

export const profile = async ( jwt) => await axios.post('/usuarios/profile',jwt);

export const logout = () =>  axios.post('/usuarios/logout');