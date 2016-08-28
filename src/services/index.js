export const CONTROLLER_URL = __DEV__
  ? 'https://dev-logistics-wizard.mybluemix.net/api/v1'
  : 'https://logistics-wizard.mybluemix.net/api/v1';

export const callApi = (endpoint, {
  apiUrl = CONTROLLER_URL,
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) =>
  fetch(`${apiUrl}/${endpoint}`, {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) throw json;

    return json;
  });

export const createDemo = (name, email) =>
  callApi('demos', {
    method: 'POST',
    body: { name, email },
  });

export const getDemo = (guid) => callApi(`demos/${guid}`);

export const login = (id, guid) =>
  callApi(`demos/${guid}/login`, {
    method: 'POST',
    body: { userId: id },
  });

export const getAdminData = token =>
  callApi('admin', { headers: { Authorization: `Bearer ${token}` } });

export const api = {
  createDemo,
  getDemo,
  login,
  getAdminData,
};

export default api;
