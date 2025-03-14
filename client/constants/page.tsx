export const API_BASE_URL = "http://localhost:5005/api/v1";
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  TEAMS: `${API_BASE_URL}/teams`,
  PLAYERS: `${API_BASE_URL}/players`,
};