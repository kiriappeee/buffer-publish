import { UPDATE_USER_READ_MESSAGES_SUCCESS } from './index';

const initialState = {
  user: {} // buffer.data.user_data
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_READ_MESSAGES_SUCCESS:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

export default function reducer (state = initialState, action = { }) {
  switch (action.type) {
    case UPDATE_USER_READ_MESSAGES_SUCCESS:
      return { ...state, user: userReducer(state.user, action) };
    default:
      return state;
  }
}
