const base_URL = 'https://temporary-chatrooms-backend.onrender.com/users';

export async function createUser(username, avatar) {
  const createURL = `${base_URL}/create`;
  const response = await fetch(createURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, avatar: avatar }),
  });
  return response.json();
}

export async function getUserDetails(username) {
  const response = await fetch(`${base_URL}/details?username=${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
