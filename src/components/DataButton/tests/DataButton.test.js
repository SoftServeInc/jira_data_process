import React from 'react';
import {shallow} from 'enzyme';
import DataButton from '../DataButton';
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);

describe('<DataButton />', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            jiraUrl: 'jira.example.com',
            username: 'username',
            password: 'password',
            jql: 'status=done AND project="EXAMPLE" AND assignee=username'
        };
    });
    it('renders DataButton component', () => {
        const component = shallow(<DataButton {...defaultProps} />).dive();

        expect(component).toMatchSnapshot();
    });

    it('should disable DataButton, when all required props are provided', () => {
        const component = shallow(<DataButton {...defaultProps} />).dive();

        expect(
            component.find('WithStyles(ForwardRef(Button))').prop('disabled')
        ).toEqual(false);
    });

    it('should disable DataButton, when at least one of required props is not provided', () => {
        defaultProps = {
            ...defaultProps,
            jql: null
        };

        const component = shallow(<DataButton {...defaultProps} />).dive();

        expect(
            component.find('WithStyles(ForwardRef(Button))').prop('disabled')
        ).toEqual(true);
    });
});
