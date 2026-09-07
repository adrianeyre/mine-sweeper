import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	const defaultProps = (overrides: Partial<IInfoBoardProps> = {}): IInfoBoardProps => ({
		gameOver: true,
		gameWon: false,
		score: 1000,
		level: 'Easy',
		containerHeight: 1000,
		startGame: vi.fn(),
		...overrides,
	});

	it('Should render correctly', () => {
		const { container } = render(<InfoBoard {...defaultProps()} />);

		expect(screen.getByText('Game Over')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should start the game at the level the player picked', async () => {
		const startGame = vi.fn();
		render(<InfoBoard {...defaultProps({ startGame })} />);

		await userEvent.selectOptions(screen.getByRole('combobox'), 'Hard');
		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(startGame).toHaveBeenCalledWith('Hard');
	});
});
