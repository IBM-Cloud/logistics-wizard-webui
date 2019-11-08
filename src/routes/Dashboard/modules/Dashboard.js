import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';
import { demoSelector } from 'modules/demos';

export const dashboardSelector = state => state.dashboard;

// ------------------------------------
// Constants
// ------------------------------------
export const GET_ADMIN_DATA = 'Dashboard/GET_ADMIN_DATA';
export const SIMULATE_STORM = 'Dashboard/SIMULATE_STORM';
export const SELECT_MARKER = 'Dashboard/SELECT_MARKER';
export const SET_MAP_LOADING = 'Dashboard/SET_MAP_LOADING';
export const ADMIN_DATA_RECEIVED = 'Dashboard/ADMIN_DATA_RECEIVED';
export const STORM_DATA_RECEIVED = 'Dashboard/STORM_DATA_RECEIVED';
export const ACKNOWLEDGE_RECOMMENDATAION = 'Dashboard/ACKNOWLEDGE_RECOMMENDATAION';
export const RECOMMENDATIONS_RECEIVED = 'Dashboard/RECOMMENDATIONS_RECEIVED';

// ------------------------------------
// Actions
// ------------------------------------
export const mapLoading = () => ({
  type: SET_MAP_LOADING,
  payload: {
  },
});

export const selectMarker = (type, data) => ({
  type: SELECT_MARKER,
  payload: {
    type,
    data,
  },
});

export const getAdminData = (guid) => ({
  type: GET_ADMIN_DATA,
  guid,
});

export const adminDataReceived = (payload) => ({
  type: ADMIN_DATA_RECEIVED,
  payload,
});

export const simulateStorm = () => ({
  type: SIMULATE_STORM,
});

export const stormDataReceived = payload => ({
  type: STORM_DATA_RECEIVED,
  payload,
});

export const recommendationsReceived = payload => ({
  type: RECOMMENDATIONS_RECEIVED,
  payload,
});

export const acknowledgeRecommendation = (recommendationId) => ({
  type: ACKNOWLEDGE_RECOMMENDATAION,
  payload: {
    recommendationId,
  },
});

export const actions = {
  selectMarker,
  getAdminData,
  adminDataReceived,
  stormDataReceived,
  acknowledgeRecommendation,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_MAP_LOADING]: (state) => ({
    ...state,
    mapLoading: true,
  }),
  [SELECT_MARKER]: (state, action) => ({
    ...state,
    infoBox: action.payload,
  }),
  [ADMIN_DATA_RECEIVED]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [STORM_DATA_RECEIVED]: (state, action) => ({
    ...state,
    storms: [action.payload],
    mapLoading: false,
  }),
  [RECOMMENDATIONS_RECEIVED]: (state, action) => {
    const newState = JSON.parse(JSON.stringify(state)); // Deep clone object
    newState.storms[0].recommendations = action.payload.recommendations;
    newState.mapLoading = false;
    return newState;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  infoBox: {
    type: 'hidden',
    data: {},
  },
  shipments: [],
  retailers: [],
  'distribution-centers': [],
  storms: [],
};

export const dashboardReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default dashboardReducer;

// ------------------------------------
// Sagas
// ------------------------------------

export function *watchGetAdminData() {
  while (true) {
    yield take(GET_ADMIN_DATA);
    const demoState = yield select(demoSelector);

    try {
      const adminData = yield call(api.getAdminData, demoState.token);
      yield put(adminDataReceived(adminData));
    }
    catch (error) {
      console.log('Failed to retrieve dashboard data');
      console.error(error);
      // yield put(getAdminDataFilure(error));
    }
  }
}

export function *watchSimulateStorm() {
  while (true) {
    yield take(SIMULATE_STORM);
    yield put(mapLoading());
    const demoState = yield select(demoSelector);
    try {
      const stormData = yield call(api.simulateStorm, demoState.token);
      yield put(stormDataReceived(stormData));
      yield put(selectMarker('storm', stormData));
    }
    catch (error) {
      console.log('Failed to retrieve storm data from simulation');
      console.error(error);
    }
  }
}

export function *watchAcknowledgeRecommendation() {
  while (true) {
    const { payload } = yield take(ACKNOWLEDGE_RECOMMENDATAION);
    yield put(mapLoading());
    const demoState = yield select(demoSelector);

    try {
      console.log('calling api');
      const acknowledgeResponse =
        yield call(api.postAcknowledgeRecommendation, demoState.token, payload.recommendationId);
      console.log('acknowledgeResponse: ', acknowledgeResponse);
      const recommendations = yield call(api.getRecommendations, demoState.token);
      console.log('recommendations: ', recommendations);
      yield put(recommendationsReceived(recommendations));
    }
    catch (error) {
      console.log('Error in acknowledgeRecommendation');
      console.error(error);
    }
  }
}

export const sagas = [
  watchGetAdminData,
  watchSimulateStorm,
  watchAcknowledgeRecommendation,
];
