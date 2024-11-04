import axios from './axios';

export const getAcciones = async () => await axios.get('/acciones');