import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableCell from './index';

configure({ adapter: new Adapter() });

describe('TableCell', () => {
  it('should have children', () => {
    const wrapper = mount(<TableCell>I Love Buffer</TableCell>);
    expect(wrapper.find(TableCell).length).toBe(1);
  });
});
