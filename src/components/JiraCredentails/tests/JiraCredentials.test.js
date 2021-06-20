import React from 'react';
import {mount, shallow} from 'enzyme';
import JiraCredentials from '../JiraCredentials';
import serializer from 'enzyme-to-json/serializer';
import {act} from 'react-dom/test-utils';

expect.addSnapshotSerializer(serializer);

describe('<JiraCredentials />', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            username: 'username',
            password: 'password',
            setUsername: jest.fn(),
            setPassword: jest.fn()
        };
    });

    it('renders JiraCredentials component', () => {
        const component = shallow(<JiraCredentials {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });

    it('should call setUsername function on username value change', () => {
        const component = mount(<JiraCredentials {...defaultProps} />);
        const event = {
            target: {
                value: 'other_username'
            }
        };

        act(() => {
            component
                .find('WithStyles(ForwardRef(TextField))')
                .first()
                .prop('onChange')(event);
        });

        expect(component.prop('setUsername')).toHaveBeenCalledWith(
            'other_username'
        );
    });

    it('should call setPassword function on password value change', () => {
        const component = mount(<JiraCredentials {...defaultProps} />);
        const event = {
            target: {
                value: 'other_password'
            }
        };

        act(() => {
            component
                .find('WithStyles(ForwardRef(TextField))')
                .last()
                .prop('onChange')(event);
        });

        expect(component.prop('setPassword')).toHaveBeenCalledWith(
            'other_password'
        );
    });
});
