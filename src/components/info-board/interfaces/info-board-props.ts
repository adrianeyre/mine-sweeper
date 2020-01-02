export default interface IInfoBoardProps {
	gameOver: boolean;
	gameWon: boolean;
	score: number;
	containerHeight: number;
	startGame(): void;
}