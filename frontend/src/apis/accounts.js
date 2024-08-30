const base_URL = "https://temporary-chatrooms-backend.onrender.com/accounts";

export async function signUp(accountData) {
  const createURL = `${base_URL}/create`;
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountData),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email) {
  const searchParams = new URLSearchParams({ email });
  const getLoginDetailsURL = `${base_URL}/login?${searchParams}`;
  const res = await fetch(getLoginDetailsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid User");
  }
}

export async function storeToken(accountData) {
  const storeTokenURL = `${base_URL}/storeToken`;
  const res = await fetch(storeTokenURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountData),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Token");
  }
}

export async function loginAccount(accountData) {
  const loginURL = `${base_URL}/login`;
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountData),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutAccount(token, accountData) {
  const logoutURL = `${base_URL}/logout`;
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(accountData),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}
