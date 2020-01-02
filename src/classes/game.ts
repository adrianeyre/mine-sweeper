import IGame from './interfaces/game';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import IMineSweeperProps from '../components/mine-sweeper/interfaces/mine-sweeper-props';
import Player from './player';
import Sprite from './sprite';
import ImageEnum from './enums/image-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import PlayerResultEnum from './enums/player-result-enum';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public level: number;
	public width: number;
	public height: number;
	public bombs: number;
	public timer: any;
	public time: number;
	public blankSpaces: number;
	public isGameInPlay: boolean;
	public isGameWon: boolean;

	readonly DEFAULT_TIME: number = 300;
	readonly DEFAULT_WIDTH: number = 16;
	readonly DEFAULT_HEIGHT: number = 16;
	readonly DEFAULT_BOMBS: number = 50;
	readonly MATRIX = [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0]];
	readonly BLOW_MATRIX = [[0, 1], [1, 0], [0, -1], [-1, 0]];

	constructor(config: IMineSweeperProps) {
		this.player = new Player(config);
		this.sprites = [];
		this.level = 1;
		this.width = this.DEFAULT_WIDTH;
		this.height = this.DEFAULT_HEIGHT;
		this.bombs = this.DEFAULT_BOMBS;
		this.isGameInPlay = false;
		this.time = this.DEFAULT_TIME;
		this.blankSpaces = this.DEFAULT_WIDTH * this.DEFAULT_HEIGHT;
		this.isGameWon = false;

		this.setupSprites();
	}

	public handleInput = (playerResult: PlayerResultEnum, key: string): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
				this.blowArea(key); break;
			case PlayerResultEnum.DEAD:
				this.lose(); break;
			case PlayerResultEnum.click:
				this.revealSprite(key, true); break;
			case PlayerResultEnum.contextmenu:
				this.flagSprite(key); break;
		}
	}

	public handleTimer = () => {
		if (!this.isGameInPlay) return;
		this.time --;

		if (this.time < 1) this.lose();
	}

	private setupSprites = () => {
		this.blankBoard();
		this.bombBoard();
		this.numberBoard();
	}

	private revealSprite = (key: string, handleResult: boolean) => {
		const sprite = this.findSpriteByKey(key);
		if (!sprite) return;

		const result = sprite.reveal();
		if (result === PlayerResultEnum.SAFE) this.successPress();
		if (handleResult) this.handleInput(result, sprite.key);
	}

	private flagSprite = (key: string) => {
		const sprite = this.findSpriteByKey(key);
		if (!sprite) return;

		sprite.flag();
	}

	private blowArea = (key: string) => {
		const sprite = this.findSpriteByKey(key);
		if (!sprite) return;


		this.BLOW_MATRIX.forEach((matrix: number[]) => {
			const check = this.findSpriteByXandY(sprite.x + matrix[0], sprite.y + matrix[1]);

			if (check && check.type !== SpriteTypeEnum.BOMB) {
				this.revealSprite(check.key, check.type === SpriteTypeEnum.BLANK);
			}
		});
	}

	private blankBoard = () => {
		for (let x = 1; x <= this.width; x++) {
			for (let y = 1; y <= this.height; y++) {
				this.sprites.push(new Sprite({
					key: `sprite-${ x }-${ y }`,
					visable: true,
					x,
					y,
					width: 1,
					height: 1,
					image: ImageEnum.BLANK,
					type: SpriteTypeEnum.BLANK,
				}));
			}
		}
	}

	private bombBoard = () => {
		let placedBomb;
		for (let bombCount = 0; bombCount < this.bombs; bombCount++) {
			placedBomb = false;
			while (!placedBomb) {
				const x = Math.floor(Math.random() * (this.width - 1)) + 1;
				const y = Math.floor(Math.random() * (this.height - 1)) + 1;
				const sprite = this.findSpriteByXandY(x, y)
				if (sprite && sprite.type !== SpriteTypeEnum.BOMB) {
					placedBomb = true;
					this.blankSpaces --;
					sprite.updateType(SpriteTypeEnum.BOMB);
					sprite.updateImage(ImageEnum.BOMB);
				}
			}
		}
	}

	private numberBoard = () => {
		for (let x = 1; x <= this.width; x++) {
			for (let y = 1; y <= this.height; y++) {
				const sprite = this.findSpriteByXandY(x, y);

				if (sprite && sprite.type !== SpriteTypeEnum.BOMB) this.updateSpriteNumber(sprite);
			}
		}
	}

	private updateSpriteNumber = (sprite: ISprite) => {
		let value = 0;
		this.MATRIX.forEach((matrix: number[]) => {
			const check = this.findSpriteByXandY(sprite.x + matrix[0], sprite.y + matrix[1]);

			if (check && check.type === SpriteTypeEnum.BOMB) value++;
		});

		const imageValue = sprite.getImageByValue(value);
		sprite.updateType(value);
		sprite.updateImage(imageValue);
	}

	private successPress = () => {
		this.blankSpaces--;
		this.player.successPress();

		if (this.blankSpaces < 1) {
			this.player.successGame();
			this.isGameWon = true;
			this.isGameInPlay = false;
		}
	}

	private lose = () => {
		this.player.die();
		this.isGameInPlay = false;
	}

	private findSpriteByXandY = (x: number, y: number) => this.sprites.find((sprite: ISprite) => sprite.x === x && sprite.y === y);
	private findSpriteByKey = (key: string) => this.sprites.find((thisSprite: ISprite) => thisSprite.key === key);
}
