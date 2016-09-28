import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';
import { getAdminData } from 'routes/Dashboard/modules/Dashboard';

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

// TODO finish this v
export const createUser = () => ({
  type: 'CREATE_USER',
});

export const login = (userid) => ({
  type: LOGIN,
  userid,
});

export const loginSuccess = ({ token, userid }) => ({
  type: LOGIN_SUCCESS,
  token,
  userid,
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
  [LOGIN_SUCCESS]: (state, { token, userid }) => ({
    ...state,
    token: token.token,
    users: state.users.map(user => ({
      ...user,
      loggedIn: user.id === userid,
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
    let demoState = yield select(demoSelector);

    if (demoState.guid !== guid) {
      try {
        const [demo, retailers] = yield [
          call(api.getDemo, guid),
          call(api.getRetailers, guid),
        ];
        yield put(getDemoSuccess({ demo, retailers }));
        window.localStorage.setItem('savedGuid', guid);
        demoState = yield select(demoSelector);
        yield put(login(demoState.users[0].id));
      }
      catch (error) {
        console.log('Get Demo Failure: ', error);
        // yield put(getDemoFailure(error));
      }
    }
  }
}

export function *watchLogin() {
  while (true) {
    const { userid } = yield take(LOGIN);
    const demoState = yield select(demoSelector);
    try {
      const token = yield call(api.login, userid, demoState.guid);
      yield put(loginSuccess({ token, userid }));
      yield put(getAdminData(demoState.guid));
    }
    catch (error) {
      console.log('Login Failure: ', error);
      // yield put(loginFailure(error));
    }
  }
}

export const sagas = [
  watchGetDemoSession,
  watchLogin,
];
