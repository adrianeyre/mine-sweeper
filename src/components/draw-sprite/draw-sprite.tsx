import { FC } from 'react';

import IDrawSpriteProps from './interfaces/draw-sprite-props';

const DrawSprite: FC<IDrawSpriteProps> = (props: IDrawSpriteProps) => {
	// The vertical offset is a pure function of the container width — the status
	// bar above the board is 4.2% of it. It used to be assigned from a mount
	// effect into a local, which under React 18's double-invoked StrictMode
	// mount ran twice and, either way, was recomputed as 0 on every render
	// before the effect could touch it. Deriving it here is what the effect was
	// trying to do, one render earlier.
	const offsetHeight = (props.containerWidth / 100) * 4.2;
	const offsetWidth = 0;

	const styleSprite = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${(x - 1) * props.width + offsetWidth}px, ${offsetHeight + (y - 1) * props.height}px, 0)`,
		transform: `translate3d(${(x - 1) * props.width + offsetWidth}px, ${offsetHeight + (y - 1) * props.height}px, 0)`,
		zIndex: props.sprite.zIndex,
	});

	if (!props.sprite.visable) return <div></div>;

	return (
		<div
			key={props.sprite.key}
			style={styleSprite(props.sprite.x, props.sprite.y)}
			onClick={props.handleBlockPress}
			onContextMenu={props.handleBlockPress}
		>
			<img
				src={props.sprite.image}
				height={props.height * props.sprite.height}
				width={props.width * props.sprite.width}
				alt="sprite"
			/>
		</div>
	);
};

export default DrawSprite;
