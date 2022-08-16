import React from 'react';
import {shallow} from 'enzyme';
import JiraUrl from '../JiraUrl';
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);

describe('<JiraUrl />', () => {
    it('renders JiraUrl component', () => {
        const component = shallow(<JiraUrl jiraUrl={'jira.example.com'} />);

        expect(component).toMatchSnapshot();
    });

    it('should not show an error, when isJiraUrlTouched is true and jiraUrl prop is provided', () => {
        const component = shallow(
            <JiraUrl jiraUrl={'jira.example.com'} isJiraUrlTouched />
        );

        expect(
            component.find('WithStyles(ForwardRef(TextField))').prop('error')
        ).toEqual(false);
    });

    it('should show an error, when isJiraUrlTouched is true and jiraUrl prop is not provided', () => {
        const component = shallow(<JiraUrl isJiraUrlTouched />);

        expect(
            component.find('WithStyles(ForwardRef(TextField))').prop('error')
        ).toEqual(true);
    });
});
