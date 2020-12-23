import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box',
	position: 'relative',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
};

const deleteButton = {
	position: 'absolute',
	borderStyle: 'none',
	background: '#222179',
	right: '5px',
	fontSize: '1rem',
};

const Preview = ({ pictures, setPictures }) => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		maxFiles: 5,
		onDrop: (acceptedFiles) => {
			setPictures(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const thumbs = pictures.map((file, index) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} alt='thumbnail' />
			</div>
			<button
				style={deleteButton}
				type='button'
				onClick={() => {
					const newPictures = [...pictures];
					newPictures.splice(index, 1);
					setPictures(newPictures);
				}}>
				<FontAwesomeIcon icon='times' color='yellow' size='lg' />
			</button>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			pictures.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[pictures]
	);
	return (
		<section className='container'>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
				<em>(5 files are the maximum number of files you can drop here)</em>
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	);
};

export default Preview;
