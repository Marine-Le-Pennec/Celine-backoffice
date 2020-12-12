import React, { useState } from 'react';
// css
import '../assets/css/New.css';

// Axios
import axios from 'axios';

// Router
import { useHistory } from 'react-router-dom';

// img
import borderLeft from '../assets/img/deco_left.png';
import file from '../assets/img/file.png';
import loader from '../assets/img/loader.svg';

const New = () => {
	const [title, setTitle] = useState('');
	const [fabrics, setFabrics] = useState('');
	const [colors, setColors] = useState('');
	const [price, setPrice] = useState(0);
	const [tags, setTags] = useState([]);
	const [picture, setPicture] = useState({});
	const [shoplink, setShoplink] = useState('');
	const [onsale, setOnsale] = useState(false);
	const [size, setSize] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	console.log(picture);
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
		formData.append('picture', picture === undefined ? undefined : picture);
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
			} else {
				setIsLoading(false);
				alert('Veuillez compléter tous les champs');
			}
		} catch (error) {
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
		<div className='loader-style'>
			<img src={loader} alt='loader' />
		</div>
	) : (
		<div className='new-wrapper'>
			<div className='new-img-decoration-container'>
				<img src={borderLeft} alt='left border' />
			</div>
			<form className='new-inputs-section' onSubmit={handleSubmit}>
				<div className='new-inputs-container'>
					<p>Titre</p>
					<input
						required
						name='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='new-inputs-container'>
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
				<div className='new-inputs-container'>
					<p>Matière</p>
					<input name='fabrics' onChange={(e) => setFabrics(e.target.value)} />
				</div>
				<div className='new-inputs-container'>
					<p>Couleurs</p>
					<input
						type='text'
						name='colors'
						onChange={(e) => setColors(e.target.value)}
					/>
				</div>
				<div className='new-inputs-container'>
					<p>Taille</p>
					<input
						type='text'
						name='size'
						onChange={(e) => setSize(e.target.value)}
					/>
				</div>
				<div className='new-image-container'>
					<p>Image</p>

					<label htmlFor='file-input'>
						<img src={file} alt='download' />
					</label>

					<input
						id='file-input'
						type='file'
						accept='.jpg,.png'
						name='picture'
						onChange={(e) => setPicture(e.target.files[0])}
					/>
					<div className={picture ? 'download-validation' : 'hide'}>
						Image ajoutée !
					</div>
				</div>
				<div className='new-tags-section'>
					<p>Tags</p>
					<div className='new-tags-container'>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Plaid'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='topDown'>Plaid</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Echarpe'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Gants'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='gants'>Gants et mitaines</label>
							</div>
						</div>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Chale'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Bonnet'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Chaussettes'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='chaussettes'>Chaussettes</label>
							</div>
						</div>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Peluche'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									value='Fetes'
									className='checkbox'
									onChange={(e) => handleTagClick(e.target.value)}
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='new-tag-input-container'>
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
								placeholder='Adresse de la page Etsy'
								onChange={(e) => setShoplink(e.target.value)}
							/>
						)}
					</div>
				</section>
				<button type='submit' className='new-submit-button'>
					Valider
				</button>
			</form>
		</div>
	);
};

export default New;
