export default interface IGame {
	score: number;
	alive: boolean;
	successPress(): number;
	successGame(): number;
	timeBonus(time: number): number
	die(): boolean;
}
