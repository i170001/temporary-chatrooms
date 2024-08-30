const base_URL = 'http://localhost:5000/messages';

export async function saveMessage(roomID, userID, avatar, content) {
  const saveURL = `${base_URL}/save`;
  const data = { roomID, userID, avatar, content };

  const response = await fetch(saveURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getMessages(roomID) {
  const getURL = `${base_URL}/get?roomID=${roomID}`;

  const response = await fetch(getURL, {
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