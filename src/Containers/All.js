import React, { useState, useEffect } from 'react';
// css
import '../assets/css/All.css';

// Axios
import axios from 'axios';

// Composants
import CreaCard from '../Components/CreaCard';
import Search from '../Components/Search';

const All = () => {
	// States
	const [creations, setCreations] = useState();
	const [isLoading, setIsLoading] = useState(true);

	// Fetchdata
	const fetchData = async () => {
		try {
			const response = await axios.get(
				// 'https://squiddy-shop-api.herokuapp.com/annonces'
				'http://localhost:3010/annonces'
			);
			console.log(response.data);
			setCreations(response.data);
			setIsLoading(false);
		} catch (e) {
			alert('An error occurred');
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return isLoading ? (
		<div>...Chargement</div>
	) : (
		<div className='all-wrapper'>
			<header>
				<h1>Toutes mes créations</h1>
				<div className='separator'></div>
				<Search />
			</header>
			<main className='cards-main-container'>
				{creations.map((creation, index) => {
					return <CreaCard creation={creation} key={index} />;
				})}
			</main>
		</div>
	);
};

export default All;
