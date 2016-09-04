import faker from 'faker';

export const getDemo = ({
  guid = faker.random.uuid(),
} = {}) => ({
  createdAt: faker.date.recent(),
  name: faker.fake('{{lorem.word}} {{random.number}}'),
  guid,
  id: faker.random.number(),
  users: [{
    username: faker.name.firstName(),
    email: faker.internet.email(),
    created: null,
    id: faker.random.number(),
    demoId: faker.random.number(),
    roles: [{
      id: 1,
      name: 'supplychainmanager',
      description: null,
      created: faker.date.recent(),
      modified: faker.date.recent(),
    }],
  }],
});

export const login = () => ({
  token: faker.random.uuid(),
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
  retailers: [{
    managerId: null,
    address: {
      state: faker.address.state(),
      city: faker.address.city(),
      latitude: faker.address.latitude(),
      country: faker.address.country(),
      longitude: faker.address.longitude(),
    },
    id: 405,
  }],
});

export const mockApi = {
  getDemo,
  login,
  getAdminData,
};

export default mockApi;
