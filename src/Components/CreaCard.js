import React, { useEffect } from 'react';
// css
import '../assets/css/CreaCard.css';

// axios
import axios from 'axios';

// Router
import { Link } from 'react-router-dom';

// img
import noImage from '../assets/img/no.png';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreaCard = ({ creation }) => {
	// Fetch picture

	const correctPicture = () => {
		if (creation.picture.secure_url) {
			return <img src={creation.picture.secure_url} alt='miniature' />;
		} else {
			return <img src={creation.picture} alt='miniature' />;
		}
	};

	// Fetch ID
	const id = creation._id;

	// Translate the UTC date for a more readeable date
	const date = new Date(creation.created).toLocaleDateString();

	// Delete crea

	const HandleDelete = async (event) => {
		try {
			event.preventDefault();
			let r = window.confirm('Souhaitez-vous supprimer cette création ?');
			if (r === true) {
				await axios.delete(
					`https://squiddy-shop-api.herokuapp.com/annonce/${id}`
				);
				alert('Création supprimée !');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const HandleDelete = async (event) => {
			try {
				event.preventDefault();
				let r = window.confirm('Souhaitez-vous supprimer cette création ?');
				if (r === true) {
					await axios.delete(
						`https://squiddy-shop-api.herokuapp.com/annonce/${id}`
					);
					alert('Création supprimée !');
				}
			} catch (error) {
				console.log(error);
			}
		};
		return () => {
			HandleDelete();
		};
	}, [id]);

	return (
		<div className='card-wrapper'>
			<div className='card-image-container'>
				{/* <img src={image} alt='miniature' /> */}
				{correctPicture()}
			</div>
			<div className='card-info-resume-container'>
				<p className='card-title'>{creation.title}</p>
				<p className='card-price'>{creation.price} €</p>
				<p className='card-date'>{date}</p>
				<div className='card-icons-container'>
					<Link
						className='Link'
						style={{ color: '#A8AA51' }}
						to={{
							pathname: `/modif/${id}`,
							state: { creation },
						}}>
						<FontAwesomeIcon icon='eye' size='2x' className='hover' />
					</Link>
				</div>
				<div className='card-icons-container'>
					<button
						className='delete-button'
						style={{ color: '#7E0A0A' }}
						onClick={HandleDelete}>
						<FontAwesomeIcon icon='trash-alt' size='2x' className='hover' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreaCard;
