const base_URL = 'http://localhost:5000/userRooms';

export async function getUserPresence(roomID, retryCount = 0) {
  const response = await fetch(`${base_URL}/${roomID}/users`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();

  // if data is empty and we haven't retried too many times, retry
  if (data.length === 0 && retryCount < 3) {
    return getUserPresence(roomID, retryCount + 1);
  }

  return data;
}