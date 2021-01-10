import React from 'react';
import { shallow } from 'enzyme';

import GameStatusBottom from '../game-status-bottom';
import IGameStatusBottomProps from '../interfaces/game-status-bottom-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusBottomProps = {
			level: 'Easy',
			time: 9999,
			showButton: true,
			toggleInfoBoard: jest.fn(),
		};

		const gameStatus = shallow(<GameStatusBottom {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});