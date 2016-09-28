import { call, take, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from 'services';

export const createDemoSelector = state => state.createDemo;
// ------------------------------------
// Constants
// ------------------------------------

export const CREATE_DEMO = 'CreateDemo/CREATE_DEMO';
export const CREATE_DEMO_FAILURE = 'CreateDemo/CREATE_DEMO_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export const createDemo = (guid) => ({
  type: CREATE_DEMO,
  payload: guid,
});

export const createDemoFailure = (value) => ({
  type: CREATE_DEMO_FAILURE,
  payload: value,
});

export const actions = {
  createDemo,
  createDemoFailure,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_DEMO_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload.message,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export const createDemoReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default createDemoReducer;

// ------------------------------------
// Sagas
// ------------------------------------
export function *watchCreateDemo() {
  while (true) {
    const { payload } = yield take(CREATE_DEMO);

    if (payload) {
      yield put(push(`/dashboard/${payload}`));
    }
    else {
      try {
        const demoSession = yield call(api.createDemo);
        yield put(push(`/dashboard/${demoSession.guid}`));
      }
      catch (error) {
        yield put(createDemoFailure(error));
      }
    }
  }
}

export const sagas = [
  watchCreateDemo,
];
