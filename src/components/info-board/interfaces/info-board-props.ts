export default interface IInfoBoardProps {
	gameOver: boolean;
	gameWon: boolean;
	score: number;
	level: string;
	containerHeight: number;
	startGame(level: string): void;
}
