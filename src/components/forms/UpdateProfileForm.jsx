import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import CustomButton from '../ui/CustomButton/CustomButton';

const UpdateProfileForm = ({
	username,
	name,
	email,
	bio,
	onSubmitHandler,
	onChangeHandler,
	loading,
	disabledBtn = false
}) => {
	return (
		<form onSubmit={onSubmitHandler}>
			<div className="form-group">
				<label>Nom d'utilisateur</label>
				<input
					type="text"
					className="form-control"
					name="username"
					value={username}
					placeholder="Votre nouveau Nom d'utilisateur"
					onChange={onChangeHandler}
					disabled={loading}
				/>
			</div>
			<div className="form-group">
				<label>Nom</label>
				<input
					type="text"
					className="form-control"
					name="name"
					value={name || ''}
					placeholder="Votre nouveau Nom"
					onChange={onChangeHandler}
					disabled={loading}
				/>
			</div>
			<div className="form-group">
				<label>Adresse Email</label>
				<input type="email" className="form-control" name="email" value={email} disabled />
			</div>
			<div className="form-group">
				<label>Bio</label>
				{/* <textarea
					type="text"
					className="form-control"
					name="bio"
					value={bio || ''}
					placeholder="votre biographie"
					onChange={onChangeHandler}
					disabled={loading}
				/> */}
				<TextareaAutosize
					name="bio"
					rowsMax={4}
					aria-label="maximum height"
					placeholder="votre biographie"
					onChange={onChangeHandler}
					disabled={loading}
					defaultValue={bio || ''}
					value={bio}
				/>
			</div>

			{/* <button className="btn btn-raised btn-primary" disabled={!email || loading}>
				Mettre à jour mon profil
			</button> */}
			<CustomButton
				btnText={'Mettre à jour mon profil'}
				fontSize={'small'}
				width={'auto'}
				color="primary"
				disabled={!email || loading}
			/>
		</form>
	);
};

export default UpdateProfileForm;
