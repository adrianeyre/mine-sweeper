export default interface IGame {
	score: number;
	alive: boolean;
	successPress(): number;
	successGame(): number;
	die(): boolean;
}
