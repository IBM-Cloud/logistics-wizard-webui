import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEMO_SESSION = 'demos/GET_DEMO_SESSION';
export const GET_DEMO_SUCCESS = 'demos/GET_DEMO_SUCCESS';
export const LOGIN = 'demos/LOGIN';
export const LOGIN_SUCCESS = 'demos/LOGIN_SUCCESS';

export const demoSelector = state => state.demoSession;

// ------------------------------------
// Actions
// ------------------------------------
export const getDemoSession = (guid) => ({
  type: GET_DEMO_SESSION,
  guid,
});

export const getDemoSuccess = (payload) => ({
  type: GET_DEMO_SUCCESS,
  demo: payload.demo,
  retailers: payload.retailers,
});

export const login = (userid) => ({
  type: LOGIN,
  userid,
});

export const loginSuccess = ({ token, id }) => ({
  type: LOGIN_SUCCESS,
  token,
  id,
});

export const actions = {
  getDemoSuccess,
  loginSuccess,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const matchUserToLocation = (userid, retailers) => {
  const location = retailers.find((retailer) => retailer.managerId === userid).address;
  return `${location.city}, ${location.state}`;
};

const mapUserData = (users, retailers) =>
  users.map(user => {
    const isSupplyManager = user.roles[0].name.includes('supply');
    const userMapping = {
      id: user.id,
      role: isSupplyManager ? 'Supply Chain Manager' : 'Retail Store Manager',
    };

    if (!isSupplyManager) {
      userMapping.location = matchUserToLocation(user.id, retailers);
    }

    return userMapping;
  });

const ACTION_HANDLERS = {
  [GET_DEMO_SUCCESS]: (state, { demo, retailers }) => ({
    ...state,
    name: demo.name,
    guid: demo.guid,
    users: mapUserData(demo.users, retailers),
  }),
  [LOGIN_SUCCESS]: (state, { token, id }) => ({
    ...state,
    token: token.token,
    users: state.users.map(user => ({
      ...user,
      loggedIn: user.id === id,
    })),
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export const demosReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default demosReducer;

// ------------------------------------
// Sagas
// ------------------------------------
export function *watchGetDemoSession() {
  while (true) {
    const { guid } = yield take(GET_DEMO_SESSION);
    const demoState = yield select(demoSelector);

    if (demoState.guid !== guid) {
      try {
        const [demo, retailers] = yield [
          call(api.getDemo, guid),
          call(api.getRetailers, guid),
        ];
        yield put(getDemoSuccess({ demo, retailers }));
        yield put(login());
      }
      catch (error) {
        // console.log(error);
        // yield put(getDemoSession(error));
      }
    }
  }
}

export function *watchLogin() {
  while (true) {
    const { id } = yield take(LOGIN);
  }
}

export const sagas = [
  watchGetDemoSession,
  watchLogin,
];
