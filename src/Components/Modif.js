import React, { useState } from 'react';
// css
import '../assets/css/New.css';

// Axios
import axios from 'axios';

// useLocation
import { useLocation, useHistory } from 'react-router-dom';

// img
import loader from '../assets/img/loader.svg';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Composant
import Preview from '../Components/Preview';

const Modif = () => {
	let location = useLocation();

	let creation = location.state.creation;

	const [title, setTitle] = useState(creation.title);
	const [fabrics, setFabrics] = useState(creation.fabrics);
	const [colors, setColors] = useState(creation.colors);
	const [price, setPrice] = useState(creation.price);
	const [tags, setTags] = useState(creation.tags);
	const [currentPictures, setCurrentPictures] = useState(creation.picture);
	const [pictures, setPictures] = useState([]);
	const [shoplink, setShoplink] = useState(creation.shoplink);
	const [onsale, setOnsale] = useState(creation.onsale);
	const [size, setSize] = useState(creation.size);
	const [isLoading, setIsLoading] = useState(false);

	let id = creation._id;
	console.log('pictures :', pictures);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('tags', tags);
		formData.append('fabrics', fabrics);
		formData.append('colors', colors);
		formData.append('price', price);
		formData.append('shoplink', shoplink);
		formData.append('onsale', onsale);
		formData.append('size', size);
		formData.append('current', JSON.stringify(currentPictures));

		for (let file of pictures) {
			formData.append('picture', file);
		}

		setIsLoading(true);

		try {
			const response = await axios.patch(
				// `https://squiddy-shop-api.herokuapp.com/annonce/${id}`,
				`http://localhost:3010/annonce/${id}`,

				formData
			);

			if (response.status === 200) {
				setIsLoading(false);
				alert('Création modifiée !');
				history.push('/annonces');
			}
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	const history = useHistory();
	console.log('current : ', currentPictures);
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

	return isLoading ? (
		<div className='loader-style'>
			<img src={loader} alt='loader' />
		</div>
	) : (
		<div className='new-wrapper'>
			<div className='new-header'>
				<h2>Modifier l'annonce</h2>
			</div>
			<form className='new-form' onSubmit={handleSubmit}>
				<section className='new-left-section'>
					<div className='new-left-section-input'>
						<p>Titre</p>
						<input
							name='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Prix</p>
						<input
							step='.01'
							type='number'
							className='number-input'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							name='price'
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Matière</p>
						<input
							name='fabrics'
							value={fabrics}
							onChange={(e) => setFabrics(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Couleurs</p>
						<input
							type='text'
							name='colors'
							value={colors}
							onChange={(e) => setColors(e.target.value)}
						/>
					</div>
					<div className='new-left-section-input'>
						<p>Dimensions</p>
						<input
							type='text'
							value={size}
							name='size'
							onChange={(e) => setSize(e.target.value)}
						/>
					</div>
				</section>
				<section className='new-right-section'>
					<div className='image-picker-container'>
						<h4>Photos </h4>
						<Preview
							pictures={pictures}
							setPictures={setPictures}
							currentPictures={currentPictures}
							setCurrentPictures={setCurrentPictures}
						/>
					</div>
					<div className='tags-section'>
						<h4>Tags</h4>
						<div className='tags-wrapper'>
							<div className='tags-column'>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Plaid')}
										value='Plaid'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='Plaid'>Plaid</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Echarpe')}
										value='Echarpe'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='echarpe'>Écharpe</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Gants')}
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
										checked={tags.includes('Chale')}
										value='Chale'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='chale'>Châle</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Bonnet')}
										value='Bonnet'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='bonnet'>Bonnet</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Chaussettes')}
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
										checked={tags.includes('Peluche')}
										value='Peluche'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='peluche'>Peluche</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('Fetes')}
										value='Fetes'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='fetes'>Fêtes</label>
								</div>
								<div className='tag-container'>
									<input
										type='checkbox'
										checked={tags.includes('LGBT')}
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
							className='onsale-checkbox'
						/>
						<div>
							{onsale && (
								<input
									type='text'
									value={shoplink}
									placeholder='Adresse de la page Etsy'
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

export default Modif;
