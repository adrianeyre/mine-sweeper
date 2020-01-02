import React from 'react';
import Game from '../../classes/game';
import ISprite from '../../classes/interfaces/sprite';
import IMineSweeperProps from './interfaces/mine-sweeper-props';
import IMineSweeperState from './interfaces/mine-sweeper-state';
import GameStatusTop from '../game-status-top/game-status-top';
import GameStatusBottom from '../game-status-bottom/game-status-bottom';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';

import './styles/mine-sweeper.scss';

export default class MineSweeper extends React.Component<IMineSweeperProps, IMineSweeperState> {
	private TIMER_INTERVAL: number = 1000;
	private container: any;

	constructor(props: IMineSweeperProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			game: new Game(this.props),
		}

		this.styleContainer = this.styleContainer.bind(this);
	}

	public async componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
	}

	public async componentWillUnmount() {
		await this.stopTimer();
		window.removeEventListener('resize', this.updatePlayerArea);
	}

	public render() {
		return <div className="mine-sweeper-play-container" ref={(d) => { this.container = d }} style={ this.styleContainer() }>
			<div style={ this.styleStatusTop() }><GameStatusTop score={ this.state.game.player.score } hiScore={ 10000 } /></div>

			{ !this.state.game.isGameInPlay && <InfoBoard gameOver={ !this.state.game.player.alive } gameWon={ this.state.game.isGameWon } startGame={ this.startGame } score={ this.state.game.player.score } containerHeight={ this.state.containerHeight } /> }

			<div className="play-area">
				{ this.state.game.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } handleBlockPress={ this.handleBlockPress.bind(this, sprite.key) }/>) }
			</div>

			<div style={ this.styleStatusBottom() }><GameStatusBottom time={ this.state.game.time } /></div>
		</div>
	}

	private styleContainer = () => ({
		maxWidth: `${ this.state.containerHeight }px`,
	})

	private styleStatusTop = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
	})

	private styleStatusBottom = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
		top: `${ this.state.containerHeight / 100 * 94.375 }px`,
	})

	private startGame = async (): Promise<void> => {
		const game = new Game(this.props);
		game.isGameInPlay = true;
		await this.stopTimer();
		await this.startTimer();
		await this.setState(() => ({ game }));
		this.updatePlayerArea();
	}

	private updatePlayerArea = (): void => {
		const containerHeight = this.container && this.container.getBoundingClientRect().height;
		let containerWidth = this.container && this.container.getBoundingClientRect().width;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.state.game.width;
		const spriteHeight = ((containerWidth / 100) * 85 ) / this.state.game.height;
		this.setState(() => ({ spriteWidth, spriteHeight, containerWidth, containerHeight }))
	}

	private handleBlockPress = async (key: string, event: any) => {
		const game = this.state.game;
		game.handleInput(event.type, key);

		if (!game.isGameInPlay) this.stopTimer();
		await this.setState(() => ({ game }));
	}


	private startTimer = async (): Promise<void> => {
		const timer = setInterval(this.myTimer, this.TIMER_INTERVAL);

		await this.setState(() => ({ timer }));
	}

	private stopTimer = async (): Promise<void> => {
		clearInterval(this.state.timer);

		await this.setState(() => ({ timer: undefined }));
	}

	private myTimer = (): void => {
		const game = this.state.game
		game.handleTimer();

		this.setState(() => ({ game }));
	}
}