import React, { FC, useState } from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player from '../../images/sprite-03.png';

import './styles/info-board.scss';

const InfoBoard: FC<IInfoBoardProps> = (props: IInfoBoardProps) => {
	const [level, setLevel] = useState<string>(props.level);

	const styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ props.containerHeight }px`,
	})

	const handleLevelChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const newLevel = event.target.value

		setLevel(newLevel);
	};

	const startGame = (): void => props.startGame(level);

	return <div className="info-board" style={ styleInfoBoard() }>
		<div className="info-board-header">
			<img src={ player } alt="player" />
			<span className="header-text">Mine Sweeper</span>
			<img src={player } alt="player" />
		</div>

		{ props.gameOver && !props.gameWon && <div className="game-over-area">
			<div className="game-over-title">Game Over</div>
			<div className="game-over-text">You scored { props.score }, better luck next time!</div>
		</div> }

		{ props.gameWon && <div className="won-area">
			<div className="won-title">Congratulations</div>
			<div className="won-text">Your final score is { props.score }</div>
		</div> }

		<div className="info-board-instructions">
			<p>The purpose of the game is to open all the cells of the board which do not contain a bomb. You lose if you set off a bomb cell.</p>
			<p>Every non-bomb cell you open will tell you the total number of bombs in the eight neighboring cells. Once you are sure that a cell contains a bomb, you can right-click to put a flag it on it as a reminder. Once you have flagged all the bombs around an open cell, you can quickly open the remaining non-bomb cells by shift-clicking on the cell.</p>
		</div>

		<div className="button-area">
			<select value={ level } onChange={ (e: any) => handleLevelChange(e) }>
				<option value="Easy">Easy</option>
				<option value="Medium">Medium</option>
				<option value="Hard">Hard</option>
				<option value="Ultra">Ultra</option>
			</select>
			<button type="button" onClick={ () => startGame() }>Play Game</button>
		</div>
	</div>
}

export default InfoBoard;
