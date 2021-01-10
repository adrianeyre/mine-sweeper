import React from 'react';
import { shallow } from 'enzyme';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Sprite from '../../../classes/sprite';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';

describe('Draw Sprite', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawSpriteProps = {
			sprite: new Sprite({
				key: 'sprite',
				visable: true,
				x: 10,
				y: 10,
				width: 10,
				height: 10,
				image: 'image',
				type: SpriteTypeEnum.BOMB,
			}),
			height: 1000,
			width: 1000,
			containerWidth: 1000,
			handleBlockPress: jest.fn(),
		};

		const sprite = shallow(<DrawSprite {...defaultProps} />);
		expect(sprite).toMatchSnapshot();
	});
});