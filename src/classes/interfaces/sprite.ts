import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from '../enums/image-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	zIndex: number
	image: string;
	type: SpriteTypeEnum;
	imageType: string;
	revealed: boolean;
	flagged: boolean;
	reveal(): PlayerResultEnum;
	flag(): void;
	explode(): string;
	unflag(): string;
	updateImage(type: ImageEnum): string;
	updateType(type: SpriteTypeEnum): SpriteTypeEnum;
	updateImageByValue(value: number): string;
}
