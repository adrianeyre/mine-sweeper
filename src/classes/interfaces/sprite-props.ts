import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISpriteProps {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	xOffset?: boolean;
	image: string;
	type: SpriteTypeEnum;
}
