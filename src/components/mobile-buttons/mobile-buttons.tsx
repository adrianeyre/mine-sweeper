import React from 'react';

import sprite01 from '../../images/sprite-01.png';
import sprite06 from '../../images/sprite-06.png';

import IMobileButtonsProps from './interfaces/mobile-buttons-props'

import './styles/mobile-buttons.scss';

export default class MobileButtons extends React.Component<IMobileButtonsProps, {}> {
	public render() {
		return <div className="mobile-buttons">
			<div className="button-row">
				<button type="button" onClick={ this.props.toggleFlag }>
					{ this.props.flagMode && <span><img src={ sprite06 } alt="flag" /> Flag Mode</span> }
					{ !this.props.flagMode && <span><img src={ sprite01 } alt="explore" /> Explore Mode</span> }
				</button>
			</div>
		</div>
	}
}
