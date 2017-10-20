import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import Sent, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import SentPosts from './components/SentPosts';

configure({ adapter: new Adapter() });

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Sent', () => {
  it('should render', () => {
    const store = storeFake({
      sent: {
        byProfileId: {
          abc: {
            loading: true,
            loadingMore: false,
            moreToLoad: false,
            page: 1,
            posts: [],
            total: 0,
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Sent
          profileId="abc"
        />
      </Provider>,
    );
    expect(wrapper.find(SentPosts).length)
      .toBe(1);
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
