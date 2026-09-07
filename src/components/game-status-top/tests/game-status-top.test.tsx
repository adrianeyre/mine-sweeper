import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import GameStatusTop from '../game-status-top';
import IGameStatusTopProps from '../interfaces/game-status-top-props';

describe('Game Status Top', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusTopProps = {
			score: 1000,
			hiScore: 9999,
		};

		const { container } = render(<GameStatusTop {...defaultProps} />);

		expect(screen.getByText('9999')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});
});
