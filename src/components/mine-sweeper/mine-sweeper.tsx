import React, { MouseEvent } from 'react';

import Game from '../../classes/game';
import PlayerResultEnum from '../../classes/enums/player-result-enum';
import ISprite from '../../classes/interfaces/sprite';
import IMineSweeperProps from './interfaces/mine-sweeper-props';
import IMineSweeperState from './interfaces/mine-sweeper-state';
import GameStatusTop from '../game-status-top/game-status-top';
import GameStatusBottom from '../game-status-bottom/game-status-bottom';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';
import MobileButtons from '../mobile-buttons/mobile-buttons';

import './styles/mine-sweeper.scss';

export default class MineSweeper extends React.Component<IMineSweeperProps, IMineSweeperState> {
	private TIMER_INTERVAL: number = 1000;
	private container: HTMLDivElement | null = null;

	constructor(props: IMineSweeperProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			containerMargin: 0,
			game: new Game(this.props),
			showInfoBoard: true,
			flagMode: false,
			level: 'Easy',
		};

		this.styleContainer = this.styleContainer.bind(this);
	}

	public componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
	}

	public componentWillUnmount() {
		// Cleared directly rather than through `stopTimer`: that one also calls
		// `setState`, which does nothing on an unmounted component.
		if (this.state.timer) clearInterval(this.state.timer);
		window.removeEventListener('resize', this.updatePlayerArea);
	}

	public render() {
		return (
			<div
				className="mine-sweeper-play-container"
				ref={(d) => {
					this.container = d;
				}}
				style={this.styleContainer()}
			>
				<div style={this.styleStatusTop()}>
					<GameStatusTop score={this.state.game.player.score} hiScore={10000} />
				</div>

				{!this.state.game.isGameInPlay && this.state.showInfoBoard && (
					<InfoBoard
						level={this.state.level}
						gameOver={!this.state.game.player.alive}
						gameWon={this.state.game.isGameWon}
						startGame={this.startGame}
						score={this.state.game.player.score}
						containerHeight={this.state.containerHeight}
					/>
				)}

				{this.state.game.isGameInPlay && (
					<div className="play-area">
						{this.state.game.sprites?.map((sprite: ISprite) => (
							<DrawSprite
								key={sprite.key}
								sprite={sprite}
								height={this.state.spriteHeight}
								width={this.state.spriteWidth}
								containerWidth={this.state.containerWidth}
								handleBlockPress={this.handleBlockPress.bind(this, sprite.key)}
							/>
						))}
					</div>
				)}

				<div style={this.styleStatusBottom()}>
					<GameStatusBottom
						level={this.state.game.level}
						time={this.state.game.time}
						showButton={!this.state.game.player.alive || this.state.game.isGameWon}
						toggleInfoBoard={this.toggleInfoBoard}
					/>
				</div>

				{this.state.game.isGameInPlay && this.state.containerWidth < 600 && (
					<div style={this.styleGameButtons()}>
						<MobileButtons flagMode={this.state.flagMode} toggleFlag={this.toggleFlag} />
					</div>
				)}
			</div>
		);
	}

	private styleContainer = () => ({
		maxWidth: `${this.state.containerHeight}px`,
		marginLeft: `${this.state.containerMargin}px`,
	});

	private styleStatusTop = () => ({
		position: 'absolute' as const,
		width: `100%`,
		maxWidth: `${this.state.containerHeight}px`,
	});

	private styleStatusBottom = () => ({
		position: 'absolute' as const,
		width: `100%`,
		maxWidth: `${this.state.containerHeight}px`,
		top: `${(this.state.containerWidth / 100) * 96.9}px`,
	});

	private styleGameButtons = () => ({
		position: 'absolute' as const,
		width: `100%`,
		maxWidth: `${this.state.containerHeight}px`,
		top: `${(this.state.containerWidth / 100) * 100}px`,
	});

	// React 18 and later batch every `setState`, including the ones made from an
	// async continuation, so `this.state` is still the old state on the line
	// after the call. `updatePlayerArea` sizes the board from `state.game`, so it
	// has to run from the setState callback — called straight afterwards, as it
	// was, it measures the *previous* level's grid and every sprite lands wrong.
	private startGame = (level: string): void => {
		const props = { ...this.props, level };
		const game = new Game(props);
		game.isGameInPlay = true;
		this.stopTimer();
		this.startTimer();
		this.setState({ game, level }, this.updatePlayerArea);
	};

	private updatePlayerArea = (): void => {
		if (!this.container) return;

		const containerHeight = this.container.getBoundingClientRect().height;
		let containerWidth = this.container.getBoundingClientRect().width;
		const containerMargin = (window.innerWidth - containerHeight) / 2;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.state.game.width;
		const spriteHeight = ((containerWidth / 100) * 86) / this.state.game.height;
		this.setState(() => ({
			spriteWidth,
			spriteHeight,
			containerWidth,
			containerHeight,
			containerMargin,
		}));
	};

	private handleBlockPress = (key: string, event: MouseEvent<HTMLDivElement>): void => {
		const game = this.state.game;
		if (!game.isGameInPlay) return;

		const type = this.state.flagMode
			? PlayerResultEnum.contextmenu
			: (event.type as PlayerResultEnum);

		game.handleInput(type, key);

		if (!game.isGameInPlay) this.stopTimer();
		this.setState(() => ({ game }));
	};

	private startTimer = (): void => {
		const timer = setInterval(this.myTimer, this.TIMER_INTERVAL);

		this.setState(() => ({ timer }));
	};

	private stopTimer = (): void => {
		if (this.state.timer) clearInterval(this.state.timer);

		this.setState(() => ({ timer: undefined }));
	};

	private myTimer = (): void => {
		const game = this.state.game;
		game.handleTimer();

		if (!game.isGameInPlay) this.stopTimer();
		this.setState(() => ({ game }));
	};

	private toggleInfoBoard = () =>
		this.setState((state) => ({ showInfoBoard: !state.showInfoBoard }));
	private toggleFlag = () => this.setState((state) => ({ flagMode: !state.flagMode }));
}
