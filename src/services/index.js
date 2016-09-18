export const controllerApi = `${__CONTROLLER_API__}/api/v1`;

export const callApi = (endpoint, {
  apiUrl = controllerApi,
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) =>
  fetch(`${apiUrl}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
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

export const getDemo = guid => callApi(`demos/${guid}`);

export const login = (id, guid) =>
  callApi(`demos/${guid}/login`, {
    method: 'POST',
    body: { userId: id },
  });

export const getRetailers = guid => callApi(`demos/${guid}/retailers`);

export const getAdminData = token =>
  callApi('admin', { headers: { Authorization: `Bearer ${token}` } });

export const createUser = guid => {
  getRetailers(guid).then(retailers => {
    const availableRetailers = retailers.filter(retailer => !retailer.managerId);
    if (availableRetailers.length > 0) {
      callApi(`demos/${guid}/users`, {
        method: 'POST',
        body: { retailerId: availableRetailers[0].id },
      });
    }
  });
};

export const api = {
  createDemo,
  getDemo,
  login,
  getRetailers,
  getAdminData,
  createUser,
};

export default api;
