import React from 'react';
import {mount} from 'enzyme';
import Status from '../Status';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE
} from '../../../constants/statusMessages';

describe('<Status />', () => {
    it('renders CircularProgress component, when isLoading prop is true', () => {
        const component = mount(<Status isLoading />);

        expect(component.contains(<CircularProgress />)).toBe(true);
    });

    it('should render error text, when status prop equals ERROR_MESSAGE and isLoading is false', () => {
        const component = mount(<Status status={ERROR_MESSAGE} />);

        expect(component.find('.error')).toHaveLength(1);
        expect(component.find('div').text()).toEqual(
            "Something went wrong. Maybe it's the problem with your VPN connection. Also, please check your JIRA credentials, URL, query and try again..."
        );
    });

    it('should render success text, when status prop equals SUCCESS_MESSAGE and isLoading is false', () => {
        const component = mount(<Status status={SUCCESS_MESSAGE} />);

        expect(component.find('.success')).toHaveLength(1);
        expect(component.find('div').text()).toEqual(
            'Success! Data was received'
        );
    });

    it('should render no text, when status prop not equals ERROR_MESSAGE or SUCCESS_MESSAGE and isLoading is false', () => {
        const component = mount(<Status />);

        expect(component.find('div').text()).toEqual('');
    });
});
