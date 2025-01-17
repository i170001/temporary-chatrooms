import * as CryptoJS from 'crypto-js';
import { getRndInteger } from './randoms';

const SALT_LENGTH = 128;
const KEY_SIZE = 256 / 32;
const MIN_ITERATIONS = 3; // inclusive
const MAX_ITERATIONS = 10; // exclusive

export function hashData(data) {
  const salt = CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(CryptoJS.enc.Base64);
  const iterations = getRndInteger(MIN_ITERATIONS, MAX_ITERATIONS);
  const hash = CryptoJS.PBKDF2(data, salt, {
    keySize: KEY_SIZE,
    iterations: iterations,
  });
  return { hash: hash.toString(CryptoJS.enc.Base64), salt: salt, iterations: iterations };
}

export function hashDataWithSaltRounds(data, salt, iterations) {
  return CryptoJS.PBKDF2(data, salt, {
    keySize: KEY_SIZE,
    iterations: iterations,
  }).toString(CryptoJS.enc.Base64);
}

export function storeToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function removeToken() {
  localStorage.removeItem('token');
}