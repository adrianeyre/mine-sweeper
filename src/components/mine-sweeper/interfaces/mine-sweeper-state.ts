import IGame from '../../../classes/interfaces/game';

export default interface IMineSweeperState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	timer?: any;
}
