import React, { useState } from 'react';
// css
import '../assets/css/Modif.css';

// Axios
import axios from 'axios';
// Form
import { useForm } from 'react-hook-form';

// useLocation
import { useLocation, useHistory } from 'react-router-dom';

// img
import file from '../assets/img/file.png';

const Modif = () => {
	let location = useLocation();

	let creation = location.state.creation;

	const [image, setImage] = useState();

	const { register, handleSubmit } = useForm();
	let id = creation._id;

	const onSubmit = async (data, e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('title', data.tags);
		formData.append('title', data.fabrics);
		formData.append('title', data.colors);
		formData.append('title', data.price);
		formData.append('picture', data.picture[0]);
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

	return (
		<div className='modif-wrapper'>
			<div className='modif-img-decoration-container'>
				<img src={creation.picture.secure_url} alt='crea pic' />
			</div>
			<form className='modif-inputs-section' onSubmit={handleSubmit(onSubmit)}>
				<div className='modif-inputs-container'>
					<p>Titre</p>
					<input name='title' placeholder={creation.title} ref={register} />
				</div>
				<div className='modif-inputs-container'>
					<p>Prix</p>
					<input
						step='.01'
						type='number'
						className='number-input'
						placeholder={creation.price}
						name='price'
						ref={register}
					/>
				</div>
				<div className='modif-inputs-container'>
					<p>Matière</p>
					<input name='fabrics' ref={register} placeholder={creation.fabrics} />
				</div>
				<div className='modif-inputs-container'>
					<p>Couleurs</p>
					<input
						type='text'
						name='colors'
						ref={register}
						placeholder={creation.colors}
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
						onChange={(e) => setImage(e.target.files)}
						ref={register}
					/>
					<div
						className={
							image && image[0].name.length !== 0
								? 'download-validation'
								: 'hide'
						}>
						Image ajoutée !
					</div>
				</div>
				<div className='modif-tags-section'>
					<p>Tags</p>
					{creation.tags.map((tag, i) => {
						return <span key={i}>{tag}</span>;
					})}
					<div className='modif-tags-container'>
						<div className='modif-tags-column'>
							<div className='modif-tag-input-container'>
								<input
									ref={register}
									type='checkbox'
									name='tags'
									value='Plaid'
									className='checkbox'
								/>
								<label htmlFor='topDown'>Plaid</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Echarpe'
									ref={register}
									className='checkbox'
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
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
									ref={register}
									name='tags'
									value='Chale'
									className='checkbox'
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Bonnet'
									className='checkbox'
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
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
									ref={register}
									name='tags'
									value='Peluche'
									className='checkbox'
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Fetes'
									className='checkbox'
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='modif-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='LGBT'
									className='checkbox'
								/>
								<label htmlFor='lgbt'>LGBT</label>
							</div>
						</div>
					</div>
				</div>
				<button
					type='submit'
					name='submit'
					ref={register}
					className='modif-submit-button'>
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Modif;
