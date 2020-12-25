import React, { useState } from 'react';
// css
import '../assets/css/New.css';

// Axios
import axios from 'axios';

// Router
import { useHistory } from 'react-router-dom';

// img
import loader from '../assets/img/loader.svg';

// Composants
import Preview from '../Components/Preview';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const New = () => {
	const [title, setTitle] = useState('');
	const [fabrics, setFabrics] = useState('');
	const [colors, setColors] = useState('');
	const [price, setPrice] = useState(0);
	const [tags, setTags] = useState([]);
	const [shoplink, setShoplink] = useState('');
	const [onsale, setOnsale] = useState(false);
	const [size, setSize] = useState('');
	const [pictures, setPictures] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	console.log(pictures);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('tags', tags);
		formData.append('fabrics', fabrics);
		formData.append('colors', colors);
		formData.append('shoplink', shoplink);
		formData.append('onsale', onsale);
		formData.append('size', size);
		formData.append('price', price);

		for (let file of pictures) {
			formData.append('picture', file);
		}
		setIsLoading(true);

		try {
			const response = await axios.post(
				// 'https://squiddy-shop-api.herokuapp.com/annonce',
				'http://localhost:3010/annonce',
				formData
			);

			if (response.status === 200) {
				setIsLoading(false);
				alert('Nouvelle création ajoutée !');
				history.push('/');
			}
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	// Gerer les checkboxes
	const handleTagClick = (tag) => {
		// Trouver l'index dans le tableau de tags du tag séléctionné
		const indexOfTag = tags.indexOf(tag);
		// Créer une copie du tableau immuable tags
		const newTags = [...tags];
		// Si le tag existe
		if (indexOfTag > -1) {
			// on le supprime
			newTags.splice(indexOfTag, 1);
		} else {
			// sinon on l'ajoute dans la copie de tableau...
			newTags.push(tag);
		}
		//... puis on set le state tags avec le nouveau tableau mis à jour
		setTags(newTags);
	};

	// Gérer le toggle "À vendre"
	const handleOnSaleClick = () => {
		setOnsale(!onsale);
		if (!onsale) {
			setShoplink('');
		}
	};

	const history = useHistory();

	return isLoading ? (
		<div className={isLoading ? 'loader-style' : 'hidden'}>
			<img src={loader} alt='loader' />
		</div>
	) : (
		<div className='new-wrapper'>
			<div className='new-header'>
				<h2>Nouvelle annonce</h2>
			</div>
			<form className='new-form' onSubmit={handleSubmit}>
				<section className='new-left-section'>
					<div className='new-left-section-input'>
						<p>Titre</p>
						<input
							required
							name='title'
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Prix</p>
						<input
							required
							step='.01'
							type='number'
							className='number-input'
							name='price'
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Matière</p>
						<input
							name='fabrics'
							onChange={(e) => setFabrics(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Couleurs</p>
						<input
							type='text'
							name='colors'
							onChange={(e) => setColors(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Dimensions</p>
						<input
							type='text'
							name='size'
							onChange={(e) => setSize(e.target.value)}
						/>
					</div>
				</section>
				<section className='new-right-section'>
					<div className='image-picker-container'>
						<h4>Photos </h4>
						<Preview pictures={pictures} setPictures={setPictures} />
					</div>
					<div className='tags-section'>
						<h4>Tags</h4>
						<div className='tags-wrapper'>
							<div className='tags-column'>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Plaid'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='Plaid'>Plaid</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Echarpe'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='echarpe'>Écharpe</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Gants'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='gants'>Gants et mitaines</label>
								</div>
							</div>
							<div className='tags-column'>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Chale'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='chale'>Châle</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Bonnet'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='bonnet'>Bonnet</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Chaussettes'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='chaussettes'>Chaussettes</label>
								</div>
							</div>
							<div className='tags-column'>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Peluche'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='peluche'>Peluche</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='Fetes'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='fetes'>Fêtes</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										value='LGBT'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='lgbt'>LGBT</label>
								</div>
							</div>
						</div>
					</div>
					<section className='onsale-section'>
						<h4>À vendre ?</h4>
						<input
							type='checkbox'
							checked={onsale}
							onChange={handleOnSaleClick}
							className='checkbox'
						/>
						<div>
							{onsale && (
								<input
									placeholder='Lien vers la page de vente'
									onChange={(e) => setShoplink(e.target.value)}
								/>
							)}
						</div>
					</section>
				</section>
				<div className='validation'>
					<button type='submit' className='validation-button'>
						<FontAwesomeIcon icon='check-circle' size='lg' color='#8e5cfa' />
					</button>
					<p>Valider</p>
				</div>
			</form>
		</div>
	);
};

export default New;
