import React, { useState } from 'react';
// css
import '../assets/css/Modif.css';

// Axios
import axios from 'axios';

// useLocation
import { useLocation, useHistory } from 'react-router-dom';

// img
import file from '../assets/img/file.png';
import loader from '../assets/img/loader.svg';

const Modif = () => {
	let location = useLocation();

	let creation = location.state.creation;

	const [title, setTitle] = useState(creation.title);
	const [fabrics, setFabrics] = useState(creation.fabrics);
	const [colors, setColors] = useState(creation.colors);
	const [price, setPrice] = useState(creation.price);
	const [tags, setTags] = useState(creation.tags);
	const [picture, setPicture] = useState(creation.picture);
	const [shoplink, setShoplink] = useState(creation.shoplink);
	const [onsale, setOnsale] = useState(creation.onsale);
	const [size, setSize] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	let id = creation._id;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', title);
		formData.append('tags', tags);
		formData.append('fabrics', fabrics);
		formData.append('colors', colors);
		formData.append('price', price);
		formData.append('picture', picture[0] && picture[0]);
		formData.append('shoplink', shoplink);
		formData.append('onsale', onsale);
		formData.append('size', size);
		setIsLoading(true);

		try {
			const response = await axios.patch(
				`https://squiddy-shop-api.herokuapp.com/annonce/${id}`,
				// `http://localhost:3010/annonce/${id}`,

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

	const correctPicture = () => {
		if (creation.picture.secure_url) {
			return <img src={creation.picture.secure_url} alt='miniature' />;
		} else {
			return <img src={creation.picture} alt='miniature' />;
		}
	};

	return isLoading ? (
		<div className='loader-style'>
			<img src={loader} alt='loader' />
		</div>
	) : (
		<div className='modif-wrapper'>
			<div className='modif-img-decoration-container'>{correctPicture()}</div>
			<form className='modif-inputs-section' onSubmit={handleSubmit}>
				<div className='modif-inputs-container'>
					<p>Titre</p>
					<input
						name='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='modif-inputs-container'>
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
				<div className='modif-inputs-container'>
					<p>Matière</p>
					<input
						name='fabrics'
						value={fabrics}
						onChange={(e) => setFabrics(e.target.value)}
					/>
				</div>
				<div className='modif-inputs-container'>
					<p>Couleurs</p>
					<input
						type='text'
						name='colors'
						value={colors}
						onChange={(e) => setColors(e.target.value)}
					/>
				</div>
				<div className='modif-inputs-container'>
					<p>Taille</p>
					<input
						type='text'
						name='size'
						onChange={(e) => setSize(e.target.value)}
					/>
				</div>
				<div className='modif-image-container'>
					<p>Image</p>

					<label htmlFor='file-input'>
						<img src={file} alt='download' />
					</label>

					<input
						id='file-input'
						type='file'
						accept='.jpg,.png'
						name='picture'
						onChange={(e) => setPicture(e.target.files)}
					/>
					<div className={picture[0] ? 'download-validation' : 'hide'}>
						Image changée !
					</div>
				</div>
				<div className='modif-tags-section'>
					<div className='modif-tags-container'>
						<div className='modif-tags-column'>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Plaid')}
									value='Plaid'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='topDown'>Plaid</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Echarpe')}
									value='Echarpe'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='modif-tag-input-container'>
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
						<div className='modif-tags-column'>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Chale')}
									value='Chale'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Bonnet')}
									value='Bonnet'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='modif-tag-input-container'>
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
						<div className='modif-tags-column'>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Peluche')}
									value='Peluche'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Fetes')}
									value='Fetes'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='modif-tag-input-container'>
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
				<section className='new-inputs-container'>
					<p>À vendre ?</p>
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
				<button type='submit' name='submit' className='modif-submit-button'>
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Modif;
