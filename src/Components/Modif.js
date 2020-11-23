import React, { useState } from 'react';
// css
import '../assets/css/Modif.css';

// Axios
import axios from 'axios';

// useLocation
import { useLocation, useHistory } from 'react-router-dom';

// img
import file from '../assets/img/file.png';

const Modif = () => {
	let location = useLocation();

	let creation = location.state.creation;

	const [title, setTitle] = useState(creation.title);
	const [fabrics, setFabrics] = useState(creation.fabrics);
	const [colors, setColors] = useState(creation.colors);
	const [price, setPrice] = useState(creation.price);
	const [tags, setTags] = useState(creation.tags);
	const [picture, setPicture] = useState(creation.picture.secure_url);

	let id = creation._id;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', title);
		// formData.append('tags', tags);
		formData.append('fabrics', fabrics);
		formData.append('colors', colors);
		formData.append('price', price);
		formData.append('picture', picture[0]);
		try {
			const response = await axios.patch(
				`https://squiddy-shop-api.herokuapp.com/annonce/${id}`,
				// `http://localhost:3010/annonce/${id}`,

				formData
			);
			if (response.status === 200) {
				alert('Création modifiée !');
				history.push('/annonces');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const history = useHistory();

	const isCheked = (value) => {
		console.log(tags);
		if (tags.indexOf(tags[value]) > -1) {
			console.log('ok');
		}
		return false;
	};

	console.log(isCheked('LGBT'));
	return (
		<div className='modif-wrapper'>
			<div className='modif-img-decoration-container'>
				<img src={creation.picture.secure_url} alt='crea pic' />
			</div>
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
					<div className={picture[0].name ? 'download-validation' : 'hide'}>
						Image ajoutée !
					</div>
				</div>
				<div className='modif-tags-section'>
					{/* <p>Tags</p>
					{tags.map((tag, i) => {
						return <span key={i}>{tag}</span>;
					})} */}
					<div className='modif-tags-container'>
						<div className='modif-tags-column'>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Plaid')}
									value='Plaid'
									className='checkbox'
								/>
								<label htmlFor='topDown'>Plaid</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Echarpe')}
									value='Echarpe'
									className='checkbox'
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Gants')}
									value='Gants'
									className='checkbox'
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
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Bonnet')}
									value='Bonnet'
									className='checkbox'
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Chaussettes')}
									value='Chaussettes'
									className='checkbox'
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
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('Fetes')}
									value='Fetes'
									className='checkbox'
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									checked={tags.includes('LGBT')}
									value='LGBT'
									className='checkbox'
								/>
								<label htmlFor='lgbt'>LGBT</label>
							</div>
						</div>
					</div>
				</div>
				<button type='submit' name='submit' className='modif-submit-button'>
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Modif;
