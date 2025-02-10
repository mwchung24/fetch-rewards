import axios from 'axios';
import {IFormInput} from '../types';

const baseUrl = 'https://frontend-take-home-service.fetch.com';

export const login = async (loginData: IFormInput) => {
  const response = await axios.post(`${baseUrl}/auth/login`, loginData, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};
