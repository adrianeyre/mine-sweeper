import React from 'react';
import { shallow } from 'enzyme';

import MineSweeper from '../mine-sweeper';
import IMineSweeperProps from '../interfaces/mine-sweeper-props';

describe('Mine Sweeper', () => {
	it('Should render correctly', () => {
		const defaultProps: IMineSweeperProps = {};
		const fishy = shallow(<MineSweeper {...defaultProps} />);
		expect(fishy).toMatchSnapshot();
	});
});