import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import GameStatusBottom from '../game-status-bottom';
import IGameStatusBottomProps from '../interfaces/game-status-bottom-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusBottomProps = {
			level: 'Easy',
			time: 9999,
			showButton: true,
			toggleInfoBoard: vi.fn(),
		};

		const { container } = render(<GameStatusBottom {...defaultProps} />);

		expect(screen.getByRole('button', { name: 'Show Board' })).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});
});
