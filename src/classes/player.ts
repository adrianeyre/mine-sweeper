import IPlayer from './interfaces/player';
import IMineSweeperProps from '../components/mine-sweeper/interfaces/mine-sweeper-props';

export default class Player implements IPlayer {
	public score: number;
	public alive: boolean;

	readonly SCORE_FOR_SUCCESS_PRESS: number = 10;
	readonly SCORE_FOR_SUCCESS_GAME: number = 100;

	constructor(config: IMineSweeperProps) {
		this.score = 0;
		this.alive = true;
	}

	public successPress = (): number => this.score += this.SCORE_FOR_SUCCESS_PRESS;
	public successGame = (): number => this.score += this.SCORE_FOR_SUCCESS_GAME;
	public timeBonus = (time: number): number => this.score += 10 * time;
	public die = () => this.alive = false;
}
