import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../client/components/Login.jsx';

describe('Login', () => {
  it('should be defined', () => {
   expect(Login).toBeDefined();
  });

  it('should render correctly', () => {
    const tree = shallow(
     <Login name='button test' />
    );
    expect(tree).toMatchSnapshot();
  });
});