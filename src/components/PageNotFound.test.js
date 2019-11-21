/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './PageNotFound';

function setupShallow() {
  const wrapper = shallow(<PageNotFound />);
  return { wrapper };
}

describe('First React component test with Enzyme', () => {

  it('renders without crashing1', () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('h1').text()).toEqual('Page Not Found');
  });
  it('renders without crashing3', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('First React component test with Enzyme2', () => {
  it('renders without crashing6', () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('.pageNotFound').some('.pageNotFound')).toEqual(true);
  });
});