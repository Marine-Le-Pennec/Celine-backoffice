import React, { useState, useEffect } from 'react';
// css
import '../assets/css/All.css';

// Axios
import axios from 'axios';

// img
import loader from '../assets/img/loader.svg';

// Composants
import CreaCard from '../Components/CreaCard';

const All = () => {
	// States
	const [creations, setCreations] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// State poubelle permettant de rafraichir lors du delete
	const [requestData, setRequestData] = useState(new Date());
	console.log(creations);

	// Fetchdata
	const fetchData = async () => {
		try {
			const response = await axios.get(
				'https://squiddy-shop-api.herokuapp.com/annonces'
				// 'http://localhost:3010/annonces'
			);
			setCreations(response.data);
			setIsLoading(false);
		} catch (e) {
			alert('An error occurred');
		}
	};
	useEffect(() => {
		fetchData();
	}, [requestData]);

	return isLoading ? (
		<div className={isLoading ? 'loader-style' : 'hidden'}>
			<img src={loader} alt='loader' />
		</div>
	) : (
		<div className='all-wrapper'>
			<header>
				<h1>Toutes mes créations</h1>
			</header>
			<main className='cards-main-container'>
				{creations.map((creation, index) => {
					return (
						<CreaCard
							creation={creation}
							key={index}
							setRequestData={setRequestData}
						/>
					);
				})}
			</main>
		</div>
	);
};

export default All;
