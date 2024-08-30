import * as accountsAPI from "../apis/accounts";
import { getToken, removeToken } from "../utils/securities";

export async function signUp(accountData) {
  const token = await accountsAPI.signUp(accountData);
  return token;
}

export async function getLoginDetails(email) {
  const loginDetails = await accountsAPI.getLoginDetails(email);
  return loginDetails;
}

export async function loginAccount(accountData) {
  const res = await accountsAPI.loginAccount(accountData);
  return res;
}

export async function logoutAccount() {
  const token = getToken();
  if (token) {
    // const res = await accountsAPI.logoutAccount(token, JSON.parse(atob(token.split(".")[1])).payload);
    removeToken();
    return res;
  }
  return null;
}

export function getAccount() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload.account : null;
}