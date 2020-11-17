import React from 'react';
// css
import '../assets/css/Homepage.css';

// Router
import { Link } from 'react-router-dom';

// img
import decoLeft from '../assets/img/deco_left.png';
import decoRight from '../assets/img/deco_right.png';
import logo from '../assets/img/Squid_logo.png';

const Homepage = () => {
	return (
		<div className='homepage-wrapper'>
			<div className='homepage-border-deco-container'>
				<img src={decoLeft} alt='décoration' />
			</div>
			<div className='homepage-center-container'>
				<img src={logo} alt='squiddy' />
				<Link to='/new' className='homepage-new-button'>
					<p>Nouvelle annonce</p>
				</Link>
				<Link to='/annonces' className='homepage-all-button'>
					<p>Mes créations</p>
				</Link>
			</div>
			<div className='homepage-border-deco-container'>
				<img src={decoRight} alt='décoration' />
			</div>
		</div>
	);
};

export default Homepage;
