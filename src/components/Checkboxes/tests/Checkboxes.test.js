import React from 'react';
import {mount, shallow} from 'enzyme';
import Checkboxes from '../Checkboxes';
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);

describe('<Checkboxes />', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            checkboxState: {
                agreeChecked: false,
                unblockChecked: true,
                keyChecked: true,
                issueTypeChecked: true,
                summaryChecked: true,
                assigneeChecked: true,
                storyPointsChecked: true,
                statusChecked: true,
                reporterChecked: true,
                labelsChecked: true,
                priorityChecked: true,
                subtasksCountChecked: true,
                updatedDateChecked: true,
                componentsChecked: true,
                fixVersionsChecked: true
            }
        };
    });

    it('renders Checkboxes component', () => {
        const component = shallow(<Checkboxes {...defaultProps} />);

        expect(component.find('.required-checkboxes')).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('should hide required fields configuration, if unblockChecked is false', () => {
        defaultProps = {
            ...defaultProps,
            checkboxState: {
                unblockChecked: false
            }
        };

        const component = shallow(<Checkboxes {...defaultProps} />);

        expect(component.find('.required-checkboxes')).toHaveLength(0);
    });

    it('should call setCheckboxState prop function on checkbox value change', () => {
        defaultProps = {
            ...defaultProps,
            setCheckboxState: jest.fn()
        };

        const event = {
            target: {
                name: 'agreeChecked',
                checked: true
            }
        };

        const component = mount(<Checkboxes {...defaultProps} />);

        component
            .find('WithStyles(ForwardRef(Checkbox))')
            .last()
            .prop('onChange')(event);

        expect(component.prop('setCheckboxState')).toHaveBeenCalled();
    });
});
