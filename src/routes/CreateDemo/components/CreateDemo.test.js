import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { bindActionCreators } from 'redux';
import { shallow } from 'enzyme';
import { CreateDemo } from './CreateDemo';

test.todo('Add error state/response from failed createDemo call.');

const setup = () => {
  const spies = {
    createDemo: sinon.spy(),
    dispatch: sinon.spy(),
  };
  const props = {
    ...bindActionCreators({
      createDemo: spies.createDemo,
    }, spies.dispatch),
  };
  const component = shallow(<CreateDemo {...props} />);

  return { spies, props, component };
};

test('(Component) Renders with needed elements for interaction', t => {
  const { component } = setup();
  t.is(component.find('TextField').length, 1,
    'Has an input for entering a guid');
  t.is(component.find('TextField').first().props().id, 'demoGuid');
  t.is(component.find('RaisedButton').length, 1,
    'has a button to create a demo');
  t.is(typeof (component.find('RaisedButton').first().prop('onClick')), 'function',
    'uses onClick prop to call a function');
});

test('(Component) Create Demo button works as expected.', t => {
  const { spies, component } = setup();

  t.false(spies.createDemo.calledOnce);
  t.false(spies.dispatch.calledOnce);

  component.find('RaisedButton').first().simulate('click');
  t.true(spies.dispatch.calledOnce);
  t.true(spies.createDemo.calledOnce,
    'calls createDemo when clicked');

  const guidInput = component.find('TextField').first();
  guidInput.simulate('change', { target: { id: 'demoGuid', value: '1234abcd' } });
  component.find('RaisedButton').first().simulate('click');
  t.deepEqual(spies.createDemo.args[1][0], { guid: '1234abcd' },
    'if guid is entered, it passes it to the createDemo action');
});
