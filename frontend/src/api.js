// Central place for all backend calls.
// Replaces the Practical 3 GitHub-fetching logic with our own /tasks and /auth endpoints.

const BASE_URL = 'http://localhost:5000';

export const AUTH_EVENT = 'auth_unauthorized';

function getAuthHeaders(headers = {}) {
  const token = localStorage.getItem('token');
  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }
  return headers;
}

async function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event(AUTH_EVENT));
    let message = 'Unauthorized or session expired';
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      else if (data?.error) message = data.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      else if (data?.error) message = data.error;
    } catch {
      // response wasn't JSON, ignore and use default message
    }
    throw new Error(message);
  }
  return res.json();
}

// --- Auth API ---
export const login = (email, password) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const register = (email, password) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const getMe = () =>
  fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);

// --- Tasks CRUD API ---
export const getTasks = () =>
  fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const createTask = (task) =>
  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(task),
  }).then(handleResponse);

export const updateTask = (id, updates) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(updates),
  }).then(handleResponse);

export const deleteTask = (id) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).then(handleResponse);
