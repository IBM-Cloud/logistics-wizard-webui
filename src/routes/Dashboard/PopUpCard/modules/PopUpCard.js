// import { delay } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';
import { loginSuccess, receiveDemoSuccess, demoSelector } from 'modules/demos';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHIPMENT_DATA = 'PopUpCard/GET_SHIPMENT_DATA';
export const SHIPMENT_DATA_RECEIVED = 'PopUpCard/SHIPMENT_DATA_RECEIVED';

// ------------------------------------
// Actions
// ------------------------------------
export const getShipmentData = (value) => ({
  type: GET_SHIPMENT_DATA,
  payload: value,
});

export const shipmentDataReceived = (value) => ({
  type: SHIPMENT_DATA_RECEIVED,
  payload: value,
});

export const actions = {
  getShipmentData,
  shipmentDataReceived,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHIPMENT_DATA_RECEIVED]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export const popupcardReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default popupcardReducer;

// ------------------------------------
// Sagas
// ------------------------------------

// This is set up in `../index.js` as the key in  `injectSagas(store, { key: 'dashboard', sagas });`
export const dashboardSelector = state => state.dashboard;

function *watchGetShipmentData() {
  console.log("watchGetShipmentData");
  while (true) {
    const { payload } = yield take(GET_SHIPMENT_DATA);
    let demoState = yield select(demoSelector);
    if (demoState.guid !== payload) {
      try {
        const demoSession = yield call(api.getDemo, payload);
        yield put(receiveDemoSuccess(demoSession));
        demoState = yield select(demoSelector);
      }
      catch (error) {
        console.log(error);
        // yield put(receiveDemoFailure(error));
      }
    }

    try {
      const { token } = yield call(api.login, demoState.id, demoState.guid);
      yield put(loginSuccess(token));
      demoState = yield select(demoSelector);
    }
    catch (error) {
      console.log(error);
      // yield put(loginFailure(error));
    }

    try {
      const shipmentData = yield call(api.getShipment, '421');
      yield put(shipmentDataReceived(shipmentData));
    }
    catch (error) {
      console.log(error);
      // yield put(getAdminDataFilure(error));
    }
  }
}

export const sagas = [
  watchGetShipmentData,
];
