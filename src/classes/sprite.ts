import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
import PlayerResultEnum from './enums/player-result-enum';

import sprite01 from '../images/sprite-01.png';
import sprite02 from '../images/sprite-02.png';
import sprite03 from '../images/sprite-03.png';
import sprite04 from '../images/sprite-04.png';
import sprite05 from '../images/sprite-05.png';
import sprite06 from '../images/sprite-06.png';
import sprite07 from '../images/sprite-07.png';
import sprite08 from '../images/sprite-08.png';
import sprite09 from '../images/sprite-09.png';
import sprite10 from '../images/sprite-10.png';
import sprite11 from '../images/sprite-11.png';
import sprite12 from '../images/sprite-12.png';
import sprite13 from '../images/sprite-13.png';
import sprite14 from '../images/sprite-14.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;
	public imageType: string;
	public revealed: boolean;
	public flagged: boolean;

	private revealImage: string;

	readonly Z_INDEX: number = 5000;
	readonly imageValues = [
		ImageEnum.ZERO,
		ImageEnum.ONE,
		ImageEnum.TWO,
		ImageEnum.THREE,
		ImageEnum.FOUR,
		ImageEnum.FIVE,
		ImageEnum.SIX,
		ImageEnum.SEVEN,
		ImageEnum.EIGHT,
	]
	readonly playerImages = {
		blank: sprite01,
		bomb: sprite03,
		wrong: sprite04,
		explode: sprite05,
		flag: sprite06,
		zero: sprite02,
		one: sprite07,
		two: sprite08,
		three: sprite09,
		four: sprite10,
		five: sprite11,
		six: sprite12,
		seven: sprite13,
		eight: sprite14,
	}

	constructor(config: ISpriteProps) {
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = this.Z_INDEX;
		this.type = config.type;
		this.image = this.playerImages.blank;
		this.revealImage = this.playerImages.zero;
		this.revealed = false;
		this.flagged = false;
	}

	public reveal = (): PlayerResultEnum => {
		if (this.revealed || this.flagged) return PlayerResultEnum.EXPLORED;

		this.image = this.revealImage;
		this.revealed = true;

		return this.type === SpriteTypeEnum.BOMB ? PlayerResultEnum.DEAD : PlayerResultEnum.SAFE;
	}

	public flag = (): void => {
		if (this.revealed) return;

		this.image = this.flagged ? this.playerImages.blank : this.playerImages.flag
		this.flagged = !this.flagged;
	}

	
	public explode = (): string => this.image = this.playerImages[ImageEnum.EXPLODE];
	public unflag = (): string => this.image = this.playerImages[this.type === SpriteTypeEnum.BOMB ? ImageEnum.BOMB : ImageEnum.WRONG];
	public updateImage = (type: ImageEnum): string => this.revealImage = this.playerImages[type];
	public updateType = (type: SpriteTypeEnum): SpriteTypeEnum =>  this.type = type;
	public updateImageByValue = (value: number): string => this.updateImage(this.imageValues[value]);
}
