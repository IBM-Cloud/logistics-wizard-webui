import faker from 'faker';

export const getUser = (id, role = 'retailstoremanager') => ({
  username: faker.name.firstName(),
  email: faker.internet.email(),
  created: null,
  id,
  demoId: faker.random.number(),
  roles: [{
    id: 1,
    name: role,
    description: null,
    created: faker.date.recent(),
    modified: faker.date.recent(),
  }],
});

export const getDemo = ({
  name = faker.fake('{{lorem.word}} {{random.number}}'),
  guid = faker.random.uuid(),
} = {}) => ({
  createdAt: faker.date.recent(),
  name,
  guid,
  id: faker.random.number(),
  users: [
    getUser(100, 'supplychainmanager'),
  ],
});

export const login = (token = faker.random.uuid()) => ({ token });

export const getRetailer = ({
  managerId = null,
  state = faker.address.state(),
  city = faker.address.city(),
} = {}) => ({
  managerId,
  address: {
    state,
    city,
    latitude: faker.address.latitude(),
    country: faker.address.country(),
    longitude: faker.address.longitude(),
  },
  id: 405,
});

export const getAdminData = () => ({
  'distribution-centers': [{
    contact: {
      name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    },
    address: {
      state: faker.address.state(),
      city: faker.address.city(),
      latitude: faker.address.latitude(),
      country: faker.address.country(),
      longitude: faker.address.longitude(),
    },
    id: 1,
  }],
  shipments: [{
    id: faker.random.number(),
    fromId: 1,
    status: 'APPROVED',
    createdAt: Date.now(),
    deliveredAt: null,
    currentLocation: {
      state: faker.address.state(),
      city: faker.address.city(),
      latitude: faker.address.latitude(),
      country: faker.address.country(),
      longitude: faker.address.longitude(),
    },
    estimatedTimeOfArrival: faker.date.future(),
    toId: 405,
    updatedAt: null,
  }],
  retailers: [getRetailer()],
});

export const mockApi = {
  getUser,
  getDemo,
  login,
  getRetailer,
  getAdminData,
};

export default mockApi;
