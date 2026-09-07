import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Sprite from '../../../classes/sprite';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';

describe('Draw Sprite', () => {
	const defaultProps = (): IDrawSpriteProps => ({
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
		handleBlockPress: vi.fn(),
	});

	it('Should render correctly', () => {
		const { container } = render(<DrawSprite {...defaultProps()} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should render an empty block when the sprite is not visable', () => {
		const { container } = render(
			<DrawSprite {...defaultProps()} sprite={{ ...defaultProps().sprite, visable: false }} />,
		);

		expect(container.querySelector('img')).toBeNull();
	});
});
