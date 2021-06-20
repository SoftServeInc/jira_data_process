import React from 'react';
import {shallow} from 'enzyme';
import serializer from 'enzyme-to-json/serializer';
import App from '../App';

expect.addSnapshotSerializer(serializer);

describe('<App />', () => {
    it('renders App component', () => {
        expect(shallow(<App />)).toMatchSnapshot();
    });
});
