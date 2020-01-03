import React from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';

import './styles/game-status-bottom.scss';

export default class GameStatusBottom extends React.Component<IGameStatusBottomProps, {}> {

	public render() {
		return <div className="game-status-bottom">
			<div className="game-status-left">LEVEL <span className="variable-text">{ this.props.level }</span></div>
			<div className="game-status-centre">
				{ this.props.showButton && <button type="button" onClick={ this.props.toggleInfoBoard }>Show Board</button> }
			</div>
			<div className="game-status-right">TIME <span className="variable-text">{ this.props.time }</span></div>
		</div>
	}
}
