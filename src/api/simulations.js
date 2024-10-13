import axios from './axios';

export const getSimulations = async () => await axios.get('/simulaciones');
