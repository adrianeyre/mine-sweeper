import React from 'react';
import { shallow } from 'enzyme';

import MineSweeper from '../mine-sweeper';
import IMineSweeperProps from '../interfaces/mine-sweeper-props';

describe('Mine Sweeper', () => {
	it('Should render correctly', () => {
		const defaultProps: IMineSweeperProps = { level: 'Easy' };
		const game = shallow(<MineSweeper {...defaultProps} />);
		expect(game).toMatchSnapshot();
	});
});