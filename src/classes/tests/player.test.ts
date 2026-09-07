import { describe, expect, it } from 'vitest';

import Player from '../player';
import IMineSweeperProps from '../../components/mine-sweeper/interfaces/mine-sweeper-props';

describe('Player', () => {
	const defaultConfig: IMineSweeperProps = { level: '1' };

	it('Should create Player class', () => {
		const player = new Player(defaultConfig);

		expect(player.score).toEqual(0);
		expect(player.alive).toEqual(true);
	});
});
