import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import MineSweeper from '../mine-sweeper';
import IMineSweeperProps from '../interfaces/mine-sweeper-props';

describe('Mine Sweeper', () => {
	const defaultProps: IMineSweeperProps = { level: 'Easy' };

	it('Should render correctly', () => {
		const { container } = render(<MineSweeper {...defaultProps} />);

		expect(screen.getByText('Mine Sweeper')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should lay out the board for the level the player chose', async () => {
		const { container } = render(<MineSweeper {...defaultProps} />);

		await userEvent.selectOptions(screen.getByRole('combobox'), 'Medium');
		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(screen.getByText('LEVEL').parentElement).toHaveTextContent('Medium');
		// Medium is a 20x20 grid, and every cell is one sprite. jsdom has no
		// layout, so the *sizing* half of `updatePlayerArea` cannot be asserted
		// here — this covers the half that can be.
		expect(container.querySelectorAll('.play-area > div')).toHaveLength(400);
	});
});
