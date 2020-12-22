import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

// css
import '../assets/css/New.css';

// Axios
import axios from 'axios';

// Router
import { useHistory } from 'react-router-dom';

// img
import loader from '../assets/img/loader.svg';

const New = () => {
	const [title, setTitle] = useState('');
	const [fabrics, setFabrics] = useState('');
	const [colors, setColors] = useState('');
	const [price, setPrice] = useState(0);
	const [tags, setTags] = useState([]);
	const [shoplink, setShoplink] = useState('');
	const [onsale, setOnsale] = useState(false);
	const [size, setSize] = useState('');
	const [picture, setPicture] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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

		for (let file of picture) {
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

	// DropZone

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
						<p>Taille</p>
						<input
							type='text'
							name='size'
							onChange={(e) => setSize(e.target.value)}
						/>
					</div>
				</section>
				<section className='new-right-section'>
					<div className=''>
						<p>Image</p>
						<Dropzone onDrop={(acceptedFiles) => setPicture(acceptedFiles)}>
							{({ getRootProps, getInputProps }) => (
								<section className='dropzone-wrapper'>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<p>
											Drag 'n' drop some files here, or click to select files
										</p>
										{picture.map((file) => {
											return (
												<li key={file.path}>
													{file.path} - {file.size} bytes
												</li>
											);
										})}
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className='tags-section'>
						<p>Tags</p>
						<div className='tags-wrapper'>
							<div className='tags-column'>
								<div className=''>
									<input
										type='checkbox'
										value='Plaid'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='Plaid'>Plaid</label>
								</div>
								<div className=''>
									<input
										type='checkbox'
										value='Echarpe'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='echarpe'>Écharpe</label>
								</div>
								<div className=''>
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
								<div className=''>
									<input
										type='checkbox'
										value='Chale'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='chale'>Châle</label>
								</div>
								<div className=''>
									<input
										type='checkbox'
										value='Bonnet'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='bonnet'>Bonnet</label>
								</div>
								<div className=''>
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
								<div className=''>
									<input
										type='checkbox'
										value='Peluche'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='peluche'>Peluche</label>
								</div>
								<div className=''>
									<input
										type='checkbox'
										value='Fetes'
										className='checkbox'
										onChange={(e) => handleTagClick(e.target.value)}
									/>
									<label htmlFor='fetes'>Fêtes</label>
								</div>
								<div className=''>
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
						<p>À vendre ?</p>
						<input
							type='checkbox'
							checked={onsale}
							onChange={handleOnSaleClick}
							className='checkbox'
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
				</section>
				<div className='validation'>
					<button type='submit'>Valider</button>
				</div>
			</form>
		</div>
	);
};

export default New;
