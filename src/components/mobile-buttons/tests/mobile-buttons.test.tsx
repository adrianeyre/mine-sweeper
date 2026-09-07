import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import MobileButtons from '../mobile-buttons';
import IMobileButtonsProps from '../interfaces/mobile-buttons-props';

describe('Mobile Buttons', () => {
	it('Should render correctly', () => {
		const defaultProps: IMobileButtonsProps = {
			flagMode: false,
			toggleFlag: vi.fn(),
		};

		const { container } = render(<MobileButtons {...defaultProps} />);

		expect(screen.getByText('Explore Mode')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should toggle flag mode when pressed', async () => {
		const toggleFlag = vi.fn();
		render(<MobileButtons flagMode={true} toggleFlag={toggleFlag} />);

		expect(screen.getByText('Flag Mode')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button'));

		expect(toggleFlag).toHaveBeenCalledTimes(1);
	});
});
