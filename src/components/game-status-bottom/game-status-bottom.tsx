import React, { FC } from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';

import './styles/game-status-bottom.scss';

const GameStatusBottom: FC<IGameStatusBottomProps> = (props: IGameStatusBottomProps) => {
	return <div className="game-status-bottom">
		<div className="game-status-left">LEVEL <span className="variable-text">{ props.level }</span></div>
		<div className="game-status-centre">
			{ props.showButton && <button type="button" onClick={ props.toggleInfoBoard }>Show Board</button> }
		</div>
		<div className="game-status-right">TIME <span className="variable-text">{ props.time }</span></div>
	</div>
}

export default GameStatusBottom;
