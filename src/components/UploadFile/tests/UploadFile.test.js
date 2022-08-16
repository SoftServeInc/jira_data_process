import React from 'react';
import {shallow} from 'enzyme';
import serializer from 'enzyme-to-json/serializer';
import UploadFile from '../UploadFile';

expect.addSnapshotSerializer(serializer);

describe('<UploadFile />', () => {
    let defaultProps;

    beforeEach(async () => {
        defaultProps = {
            selectedFile: false,
            onFileChange: jest.fn()
        };
    });

    it('renders UploadFile component', () => {
        const component = shallow(<UploadFile {...defaultProps} />).dive();

        expect(component.find('.choose-file-container')).toHaveLength(1);
    });

    it('should show CheckIcon, if selectedFile prop is true', () => {
        defaultProps = {
            ...defaultProps,
            selectedFile: true
        };
        const component = shallow(<UploadFile {...defaultProps} />).dive();

        expect(component.find('.hide-check-icon')).toHaveLength(0);
    });
});
