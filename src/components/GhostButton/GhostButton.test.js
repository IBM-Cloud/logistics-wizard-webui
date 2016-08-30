// import test from 'ava';
// import sinon from 'sinon';
// import React from 'react';
// import { shallow } from 'enzyme';
// import GlobalButton from './GlobalButton';

// const setup = () => {
//   const spies = {
//     clicky: sinon.spy(),
//   };
//   const props = {
//     customProp: 'Test',
//     clicky: spies.clicky,
//   };
//   const component = shallow(<GlobalButton {...props} />);
//
//   return { spies, props, component };
// };

// test('(Component) Has expected elements.', t => {
//   const { props, component } = setup();
// });
//
// test('(Component) Works as expected.', t => {
//   const { spies, component } = setup();
//
//   t.false(spies.clicky.calledOnce);
//   component.find('button').first().simulate('click');
//   t.true(spies.clicky.calledOnce,
//     'calls clicky prop when clicked');
// });
