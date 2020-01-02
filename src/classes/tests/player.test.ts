import Player from '../player';
import IPlayerProps from '../interfaces/player-props';

describe('Player', () => {
	let defaultConfig: IPlayerProps

	beforeEach(() => {
		defaultConfig = {}
	})

	it('Should create Player class', () => {
		const player = new Player(defaultConfig);

		expect(player.score).toEqual(0);
		expect(player.alive).toEqual(true);
	});
});