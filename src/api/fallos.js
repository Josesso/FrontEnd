import axios from './axios';

export const getFallos = async () => await axios.get('/fallos');