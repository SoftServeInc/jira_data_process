import React from 'react';
import {shallow} from 'enzyme';
import GreenCheckbox from '../GreenCheckbox';
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);

describe('<GreenCheckbox />', () => {
    it('renders GreenCheckbox component', () => {
        const component = shallow(<GreenCheckbox />).dive();

        expect(component).toMatchSnapshot();
    });
});
