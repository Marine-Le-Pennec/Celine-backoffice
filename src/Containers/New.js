import React, { useState } from 'react';
// css
import '../assets/css/New.css';

// Axios
import axios from 'axios';

// Router
import { useHistory } from 'react-router-dom';

// Form
import { useForm } from 'react-hook-form';

// img
import borderLeft from '../assets/img/deco_left.png';
import file from '../assets/img/file.png';

const New = () => {
	const [image, setImage] = useState();

	// submit form
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data, e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('tags', data.tags);
		formData.append('fabrics', data.fabrics);
		formData.append('colors', data.colors);
		formData.append('price', data.price);
		formData.append('picture', data.picture[0]);
		try {
			const response = await axios.post(
				'https://squiddy-shop-api.herokuapp.com/annonce',
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
			<form className='new-inputs-section' onSubmit={handleSubmit(onSubmit)}>
				<div className='new-inputs-container'>
					<p>Titre</p>
					<input required name='title' ref={register} />
				</div>
				<div className='new-inputs-container'>
					<p>Prix</p>
					<input
						required
						type='number'
						className='number-input'
						name='price'
						ref={register}
					/>
				</div>
				<div className='new-inputs-container'>
					<p>Matière</p>
					<input name='fabrics' ref={register} />
				</div>
				<div className='new-inputs-container'>
					<p>Couleurs</p>
					<input type='text' name='colors' ref={register} />
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
				<div className='new-tags-section'>
					<p>Tags</p>
					<div className='new-tags-container'>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									ref={register}
									type='checkbox'
									name='tags'
									value='Vetement'
									className='checkbox'
								/>
								<label htmlFor='topDown'>Hauts et bas</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									name='tags'
									value='Echarpe'
									ref={register}
									className='checkbox'
								/>
								<label htmlFor='echarpe'>Écharpe</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Gants'
									className='checkbox'
								/>
								<label htmlFor='gants'>Gants</label>
							</div>
						</div>
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Chale'
									className='checkbox'
								/>
								<label htmlFor='chale'>Châle</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Bonnet'
									className='checkbox'
								/>
								<label htmlFor='bonnet'>Bonnet</label>
							</div>
							<div className='new-tag-input-container'>
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
						<div className='new-tags-column'>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Peluche'
									className='checkbox'
								/>
								<label htmlFor='peluche'>Peluche</label>
							</div>
							<div className='new-tag-input-container'>
								<input
									type='checkbox'
									ref={register}
									name='tags'
									value='Fetes'
									className='checkbox'
								/>
								<label htmlFor='fetes'>Fêtes</label>
							</div>
							<div className='new-tag-input-container'>
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
					className='new-submit-button'>
					Valider
				</button>
			</form>
		</div>
	);
};

export default New;
