import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export async function shortenUrl(longUrl) {
  const response = await api.post('/api/shorten', { longUrl });
  return response.data;
}

export async function getStats(shortCode) {
  const response = await api.get(`/api/stats/${shortCode}`);
  return response.data;
}