import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Register from '../../../../pages/users/register';
import Message from '../../Utility/Message';
import { act } from 'react-dom/test-utils';
import { useFetchUser } from '../../../../lib/user';
jest.mock('../../../../lib/user');

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('User Registration', () => {
  it('Should render a Message if loading', () => {
    //
  });
});
