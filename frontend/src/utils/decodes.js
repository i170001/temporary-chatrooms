import { getToken } from './securities';
import { jwtDecode } from 'jwt-decode';

export function getEmailFromToken() {
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }
  const decoded = jwtDecode(token);
  return decoded.email;
}