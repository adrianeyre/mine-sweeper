import React, { FC } from 'react';

import sprite01 from '../../images/sprite-01.png';
import sprite06 from '../../images/sprite-06.png';

import IMobileButtonsProps from './interfaces/mobile-buttons-props'

import './styles/mobile-buttons.scss';

const MobileButtons: FC<IMobileButtonsProps> = (props: IMobileButtonsProps) => {
	return <div className="mobile-buttons">
		<div className="button-row">
			<button type="button" onClick={ props.toggleFlag }>
				{ props.flagMode && <div><img src={ sprite06 } alt="flag" /> <span className="button-text">Flag Mode</span></div> }
				{ !props.flagMode && <div><img src={ sprite01 } alt="explore" /> <span className="button-text">Explore Mode</span></div> }
			</button>
		</div>
	</div>
}

export default MobileButtons;
