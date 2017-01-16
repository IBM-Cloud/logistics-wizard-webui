import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';
import { demoSelector } from 'modules/demos';

export const dashboardSelector = state => state.dashboard;

// ------------------------------------
// Constants
// ------------------------------------
export const GET_ADMIN_DATA = 'Dashboard/GET_ADMIN_DATA';
export const SIMULATE_WEATHER = 'Dashboard/SIMULATE_WEATHER';
export const SELECT_MARKER = 'Dashboard/SELECT_MARKER';
export const ADMIN_DATA_RECEIVED = 'Dashboard/ADMIN_DATA_RECEIVED';
export const WEATHER_DATA_RECEIVED = 'Dashboard/WEATHER_DATA_RECEIVED';
export const WEATHER_OBSERVATIONS = 'Dashboard/WEATHER_OBSERVATIONS';
export const WEATHER_OBSERVATIONS_RECEIVED = 'Dashboard/WEATHER_OBSERVATIONS_RECEIVED';

// ------------------------------------
// Actions
// ------------------------------------
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

export const simulateWeather = () => ({
  type: SIMULATE_WEATHER,
});

export const weatherDataReceived = payload => ({
  type: WEATHER_DATA_RECEIVED,
  payload,
});

export const getWeatherObservations = (longitude, latitude) => ({
  type: WEATHER_OBSERVATIONS,
  longitude,
  latitude,
});

export const weatherObservationsReceived = payload => ({
  type: WEATHER_OBSERVATIONS_RECEIVED,
  payload,
});

export const actions = {
  selectMarker,
  getAdminData,
  adminDataReceived,
  weatherDataReceived,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECT_MARKER]: (state, action) => ({
    ...state,
    infoBox: action.payload,
  }),
  [ADMIN_DATA_RECEIVED]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [WEATHER_DATA_RECEIVED]: (state, action) => ({
    ...state,
    weather: [action.payload],
  }),
  [WEATHER_OBSERVATIONS_RECEIVED]: (state, action) => {
    if (state.infoBox.type === 'shipment') {
      return {
        ...state,
        infoBox: {
          ...state.infoBox,
          data: {
            ...state.infoBox.data,
            currentLocation: {
              ...state.infoBox.data.currentLocation,
              weather: action.payload.observations,
            },
          },
        },
      };
    }
    else if (state.infoBox.type === 'retailer') {
      return {
        ...state,
        infoBox: {
          ...state.infoBox,
          data: {
            ...state.infoBox.data,
            address: {
              ...state.infoBox.data.address,
              weather: action.payload.observations,
            },
          },
        },
      };
    }

    return state;
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
  weather: [],
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

export function *watchSimulateWeather() {
  while (true) {
    yield take(SIMULATE_WEATHER);
    const demoState = yield select(demoSelector);

    try {
      const weatherData = yield call(api.simulateWeather, demoState.token);
      yield put(weatherDataReceived(weatherData));
    }
    catch (error) {
      console.log('Failed to retrieve weather data');
      console.error(error);
    }
  }
}

export function *watchWeatherObservations() {
  while (true) {
    const { longitude, latitude } = yield take(WEATHER_OBSERVATIONS);
    const demoState = yield select(demoSelector);

    try {
      const observations = yield call(api.getWeatherObservations, demoState.token,
        longitude, latitude);
      yield put(weatherObservationsReceived({
        longitude,
        latitude,
        observations,
      }));
    }
    catch (error) {
      console.log('Failed to get observations');
      console.error(error);
    }
  }
}

export const sagas = [
  watchGetAdminData,
  watchSimulateWeather,
  watchWeatherObservations,
];
