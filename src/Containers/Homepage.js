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
				<section className='page-links-container'>
					<Link to='/new' className='homepage-new-button'>
						<h2>
							Nouvelle
							<br />
							création{' '}
						</h2>
					</Link>
					<Link to='/annonces' className='homepage-all-button'>
						<h2>
							Mes <br /> créations{' '}
						</h2>
					</Link>
				</section>
			</div>
			<div className='homepage-border-deco-container'>
				<img src={decoRight} alt='décoration' />
			</div>
		</div>
	);
};

export default Homepage;
