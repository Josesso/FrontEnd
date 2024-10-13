import axios from './axios';

export const getProcess = async () => await axios.get('/procesos');
