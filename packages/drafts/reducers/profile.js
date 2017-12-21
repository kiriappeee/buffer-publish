import { CHANGE_PROFILE } from './index';

const initialState = {
  // organization_role: 1 =>'manager', 2 => 'contributor'
  profile: {},
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_PROFILE:
      return { profile: action.profile };
    default:
      return state;
  }
}
