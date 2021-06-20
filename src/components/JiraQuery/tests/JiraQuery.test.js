import React from 'react';
import {shallow} from 'enzyme';
import JiraQuery from '../JiraQuery';
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);

describe('<JiraQuery />', () => {
    it('renders JiraQuery component', () => {
        const component = shallow(
            <JiraQuery
                jql={'status=done AND project="EXAMPLE" AND assignee=username'}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
