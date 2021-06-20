import React from 'react';
import {shallow} from 'enzyme';
import DownloadButton from '../DownloadButton';
import serializer from 'enzyme-to-json/serializer';
import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE
} from '../../../constants/statusMessages';

expect.addSnapshotSerializer(serializer);

describe('<DownloadButton />', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            status: SUCCESS_MESSAGE,
            checkboxState: {
                agreeChecked: true
            }
        };
    });
    it('renders DownloadButton component', () => {
        const component = shallow(<DownloadButton {...defaultProps} />).dive();

        expect(
            component.find('WithStyles(ForwardRef(Button))').prop('disabled')
        ).toEqual(false);
        expect(component).toMatchSnapshot();
    });

    it('should disable DownloadButton, when status is success, but agreeChecked is false', () => {
        defaultProps = {
            ...defaultProps,
            checkboxState: {
                agreeChecked: false
            }
        };

        const component = shallow(<DownloadButton {...defaultProps} />).dive();

        expect(
            component.find('WithStyles(ForwardRef(Button))').prop('disabled')
        ).toEqual(true);
    });

    it('should disable DownloadButton, when status is error', () => {
        defaultProps = {
            ...defaultProps,
            status: ERROR_MESSAGE
        };

        const component = shallow(<DownloadButton {...defaultProps} />).dive();

        expect(
            component.find('WithStyles(ForwardRef(Button))').prop('disabled')
        ).toEqual(true);
    });
});
