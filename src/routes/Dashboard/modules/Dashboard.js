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
export const ADMIN_DATA_RECEIVED = 'Dashboard/ADMIN_DATA_RECEIVED';
export const STORM_DATA_RECEIVED = 'Dashboard/STORM_DATA_RECEIVED';
export const ACKNOWLEDGE_RECOMMENDATAION = 'Dashboard/ACKNOWLEDGE_RECOMMENDATAION';
export const RECOMMENDATIONS_RECEIVED = 'Dashboard/RECOMMENDATIONS_RECEIVED';
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

export const getWeatherObservations = (locationType, locationId, longitude, latitude) => ({
  type: WEATHER_OBSERVATIONS,
  locationType,
  locationId,
  longitude,
  latitude,
});

export const weatherObservationsReceived = payload => ({
  type: WEATHER_OBSERVATIONS_RECEIVED,
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
  }),
  [RECOMMENDATIONS_RECEIVED]: (state, action) => {
    const newState = JSON.parse(JSON.stringify(state)); // Deep clone object
    newState.storms[0].recommendations = action.payload.recommendations;
    return newState;
  },
  [WEATHER_OBSERVATIONS_RECEIVED]: (state, action) => {
    // payload.locationType
    // payload.locationId
    // payload.longitude
    // payload.latitude
    // payload.observations
    console.log('Received weather for', action.payload);
    if (action.payload.locationType === 'shipment') {
      return {
        ...state,
        shipments: state.shipments.map((shipment) => {
          if (shipment.id === action.payload.locationId) {
            return {
              ...shipment,
              currentLocation: {
                ...shipment.currentLocation,
                weather: action.payload.observations,
              },
            };
          }
          return shipment;
        }),
      };
    }
    else if (action.payload.locationType === 'retailer') {
      return {
        ...state,
        retailers: state.retailers.map((retailer) => {
          if (retailer.id === action.payload.locationId) {
            return {
              ...retailer,
              address: {
                ...retailer.address,
                weather: action.payload.observations,
              },
            };
          }
          return retailer;
        }),
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
    console.log('recommendationId: ', payload.recommendationId);
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

export function *watchWeatherObservations() {
  while (true) {
    const { locationType, locationId, longitude, latitude } = yield take(WEATHER_OBSERVATIONS);
    const demoState = yield select(demoSelector);

    try {
      console.log('Get weather for', locationType, locationId, longitude, latitude);
      const observations = yield call(api.getWeatherObservations, demoState.token,
        longitude, latitude);
      yield put(weatherObservationsReceived({
        locationType,
        locationId,
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
  watchSimulateStorm,
  watchWeatherObservations,
  watchAcknowledgeRecommendation,
];
