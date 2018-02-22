import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

import Login from '../../client/components/Login.jsx';
import SingleInput from '../../client/components/SingleInput.jsx';
import Home from '../../client/components/Home.jsx';
import sinon from 'sinon';

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

  it('renders two <SingleInput /> components', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(SingleInput).length).toBe(2);
  })
  
  it('renders a `.sign_up` class', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.sign_up').length).toBe(1);
  });

});

describe('SingleInput', () => {
  it('should be defined', () => {
    expect(SingleInput).toBeDefined();
  })

  it('allows us to set props', () => {
    const wrapper = mount(<SingleInput title="hello world" />)
    expect(wrapper.props().title).toBe("hello world")

    wrapper.setProps({ title: 'hello world 2' });
    expect(wrapper.props().title).toBe('hello world 2');


  })

  it('calls props.onChange when user changes input', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<SingleInput onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { value: '1234567890!!!' } });
    console.log('onchange :', onChange.callCount)
    expect(onChange.callCount).toBe(1);
  })
})

describe('Home', () => {
  it('should be defined', () => {
    expect(Home).toBeDefined();
  })
})