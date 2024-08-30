const base_URL = 'http://localhost:5000/rooms';
import { getToken } from '../utils/securities';
import { getEmailFromToken } from '../utils/decodes';

export async function createRoom(roomUUID) {
  const roomID = roomUUID.id;
  const createURL = `${base_URL}/create`;
  const email = getEmailFromToken();
  const response = await fetch(createURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ id: roomID, email: email }),
  });
  return response.json();
}

export async function joinRoom(roomUUID, username) {
  const joinURL = `${base_URL}/${roomUUID}/join`;

  console.log(roomUUID);

  console.log('Sending request to:', joinURL);
  console.log('User data:', username);

  const user = { username: username };

  const response = await fetch(joinURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function leaveRoom(roomUUID, username) {
  const leaveURL = `${base_URL}/${roomUUID}/leave`;
  const user = { username: username };

  const response = await fetch(leaveURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function getRoomDetails(roomUUID) {
  const response = await fetch(`${base_URL}/${roomUUID}/details`, {
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