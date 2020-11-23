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

const New = () => {
	const [title, setTitle] = useState('');
	const [fabrics, setFabrics] = useState('');
	const [colors, setColors] = useState('');
	const [price, setPrice] = useState(0);
	const [tags, setTags] = useState([]);
	const [picture, setPicture] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('tags', tags);
		formData.append('fabrics', fabrics);
		formData.append('colors', colors);
		formData.append('price', price);
		formData.append('picture', picture[0]);
		try {
			const response = await axios.post(
				'https://squiddy-shop-api.herokuapp.com/annonce',
				// 'http://localhost:3010/annonce',
				formData
			);
			console.log(response);

			if (response.status === 200) {
				alert('Nouvelle création ajoutée !');
				history.push('/');
			} else {
				alert('Veuillez compléter tous les champs');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const history = useHistory();

	return (
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
						onChange={(e) => setPicture(e.target.files)}
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
									name='tags'
									value='Plaid'
									className='checkbox'
								/>
								<label htmlFor='topDown'>Plaid</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Echarpe'
									className='checkbox'
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Gants'
									className='checkbox'
								/>
								<label htmlFor='gants'>Gants et mitaines</label>
							</div>
						</div>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Chale'
									className='checkbox'
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Bonnet'
									className='checkbox'
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Chaussettes'
									className='checkbox'
								/>
								<label htmlFor='chaussettes'>Chaussettes</label>
							</div>
						</div>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Peluche'
									className='checkbox'
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Fetes'
									className='checkbox'
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='LGBT'
									className='checkbox'
								/>
								<label htmlFor='lgbt'>LGBT</label>
							</div>
						</div>
					</div>
				</div>
				<button type='submit' className='new-submit-button'>
					Valider
				</button>
			</form>
		</div>
	);
};

export default New;
