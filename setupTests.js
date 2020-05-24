import React from 'react';
import Enzyme from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });
