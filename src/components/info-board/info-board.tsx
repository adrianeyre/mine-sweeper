import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';
import IInfoBoardState from './interfaces/info-board-state';

import player from '../../images/sprite-03.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, IInfoBoardState> {
	constructor(props: IInfoBoardProps) {
		super(props);

		this.state = {
			level: 'Easy',
		}

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.startGame = this.startGame.bind(this);
	}

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
				<select value={ this.state.level } onChange={ this.handleLevelChange.bind(this) }>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
					<option value="Ultra">Ultra</option>
				</select>
				<button type="button" onClick={ this.startGame.bind(this) }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})

	private handleLevelChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const level = event.target.value
		await this.setState({ level });
	};

	private startGame = (): void => this.props.startGame(this.state.level);
}
