import IGame from '../../../classes/interfaces/game';

export default interface IMineSweeperState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number;
	containerHeight: number;
	containerMargin: number;
	level: string;
	timer?: ReturnType<typeof setInterval>;
	showInfoBoard: boolean;
	flagMode: boolean;
}
