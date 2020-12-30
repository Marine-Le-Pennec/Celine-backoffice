import React from 'react';
// css
import '../assets/css/CreaCard.css';

// axios
import axios from 'axios';

// Router
import { Link } from 'react-router-dom';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreaCard = ({ creation, setRequestData }) => {
	// Fetch picture

	// Fetch ID
	const id = creation._id;

	// Translate the UTC date for a more readeable date
	// const date = new Date(creation.created).toLocaleDateString();

	// Delete crea
	const HandleDelete = async () => {
		try {
			let r = window.confirm('Souhaitez-vous supprimer cette création ?');
			if (r === true) {
				await axios.delete(
					`https://squiddy-shop-api.herokuapp.com/annonce/${id}`
					// `http://localhost:3010/annonce/${id}`
				);
				alert('Création supprimée !');
				// pour le rafraichissement lors du delete
				setRequestData(new Date());
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='card-wrapper'>
			<section className='thumbnail-container'>
				<img src={creation.picture[0].secure_url} alt='thumbnail' />
			</section>
			<section className='card-infos-container'>
				<h4>{creation.title}</h4>
				<div className='card-infos-actions'>
					<Link
						className='Link'
						style={{ color: '#00D1FF' }}
						to={{
							pathname: `/modif/${id}`,
							state: { creation },
						}}>
						<FontAwesomeIcon icon='eye' size='2x' className='hover' />
					</Link>

					<button
						className='delete-button'
						style={{ color: '#FF9B25' }}
						onClick={HandleDelete}>
						<FontAwesomeIcon icon='trash-alt' size='2x' className='hover' />
					</button>
				</div>
			</section>
		</div>
	);
};

export default CreaCard;
