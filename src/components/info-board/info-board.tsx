import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player from '../../images/sprite-03.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {
	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				<img src={ player } alt="player" />
				<span className="header-text">Mine Sweeper</span>
				<img src={player } alt="player" />
			</div>

			{ this.props.gameOver && !this.props.gameWon && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			{ this.props.gameWon && <div className="won-area">
				<div className="won-title">Congratulations</div>
				<div className="won-text">Your final score is { this.props.score }</div>
			</div> }

			<div className="info-board-instructions">
				<p>The purpose of the game is to open all the cells of the board which do not contain a bomb. You lose if you set off a bomb cell.</p>
				<p>Every non-bomb cell you open will tell you the total number of bombs in the eight neighboring cells. Once you are sure that a cell contains a bomb, you can right-click to put a flag it on it as a reminder. Once you have flagged all the bombs around an open cell, you can quickly open the remaining non-bomb cells by shift-clicking on the cell.</p>
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})
}
