import axios from 'axios';
import {TLoginFormInput, TSearch} from '../types';

const baseUrl = 'https://frontend-take-home-service.fetch.com';

export const login = async (loginData: TLoginFormInput) => {
  const response = await axios.post(`${baseUrl}/auth/login`, loginData, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};

export const getBreeds = async () => {
  const response = await axios.get(`${baseUrl}/dogs/breeds`, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};

export const getAllDogIds = async (from: number, size: number, search: TSearch | null) => {
  console.log('search', search);
  let url = `${baseUrl}/dogs/search?from=${from}&size=${size}`;
  if (search?.breeds?.length) {
    search?.breeds?.forEach((breed) => {
      url += `&breeds=${breed}`;
    });
  }
  if (search?.zipCodes?.length) {
    search?.zipCodes?.forEach((zipCode) => {
      url += `&zipCodes=${zipCode}`;
    });
  }
  if (search?.ageMax) {
    url += `&ageMax=${search?.ageMax}`;
  }
  if (search?.ageMin) {
    url += `&ageMin=${search?.ageMin}`;
  }
  const response = await axios.get(url, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};

export const getDogs = async (dogIds: string[]) => {
  const response = await axios.post(`${baseUrl}/dogs`, dogIds, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};

export const getAllZipcodes = async (size: {size: string}) => {
  const response = await axios.post(`${baseUrl}/locations/search`, size, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};
