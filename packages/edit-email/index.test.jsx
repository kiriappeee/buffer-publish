import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import EditEmailContainer, {
  reducer,
  actions,
  actionTypes,
  middleware,
  Modal,
} from './index';
import EditEmail from './components/EditEmail';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('EditEmailContainer', () => {
  const state = {
    appSidebar: {
      user: {
        email: 'hello@bufferapp.com',
      },
    },
    editEmail: {
      displayModal: true,
    },
  };

  it('should render', () => {
    const store = storeFake(state);
    const wrapper = mount(
      <Provider store={store}>
        <EditEmail />
      </Provider>,
    );
    expect(wrapper.find(EditEmail).length)
      .toBe(1);
  });

  it('renders the modal if displayModal is true', () => {
    const store = storeFake(state);
    const wrapper = mount(<EditEmailContainer store={store} />);
    expect(wrapper.find(Modal).length)
      .toBe(1);
  });

  it('should receive the user email address from appSidebar state', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);

    const component = shallow(<EditEmailContainer store={store} />);

    expect(component.prop('email')).toBe('hello@bufferapp.com');
  });

  it('should export reducer', () => {
    expect(reducer)
      .toBeDefined();
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
});
