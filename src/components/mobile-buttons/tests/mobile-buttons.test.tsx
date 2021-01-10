import React from 'react';
import { shallow } from 'enzyme';

import MobileButtons from '../mobile-buttons';
import IMobileButtonsProps from '../interfaces/mobile-buttons-props';

describe('Info Board', () => {
	it('Should render correctly', () => {
		const defaultProps: IMobileButtonsProps = {
			flagMode: false,
			toggleFlag: jest.fn(),
		};

		const infoBoard = shallow(<MobileButtons {...defaultProps} />);
		expect(infoBoard).toMatchSnapshot();
	});
});