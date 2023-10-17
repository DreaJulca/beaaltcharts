// src/services/beaApi.ts
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://apps.bea.gov';

export const fetchData = async (seriesCode: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data?api_key=${API_KEY}&seriescode=${seriesCode}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};