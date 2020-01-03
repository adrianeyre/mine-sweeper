import IPlayer from './player'
import ISprite from './sprite';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	width: number;
	height: number;
	bombs: number;
	timer: any;
	time: number;
	level: string;
	blankSpaces: number;
	isGameInPlay: boolean;
	isGameWon: boolean;
	handleInput(playerResult: PlayerResultEnum, key: string): void;
	handleTimer(): void;
}
