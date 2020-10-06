import React from 'react';

const AuthForm = ({
	email = '',
	password = '',
	newPassword = '',
	oldPassword = '',
	setEmail = (f) => f,
	setPassword = (f) => f,
	setNewPassword = (f) => f,
	setOldPassword = (f) => f,
	showPasswordInput = true,
	loading = false,
	onSubmitHandler = (f) => f,
	btnText,
	disabledBtn = true,
	disabledEmailInput = false,
	hideEmailInput = false,
	isPasswordUpdatable = false
}) => {
	return (
		<form onSubmit={onSubmitHandler}>
			{!hideEmailInput && (
				<div className="form-group">
					<label>Adresse Email</label>
					<input
						value={email}
						name="email"
						type="email"
						placeholder="Entrer votre adresse email"
						autoComplete={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-control"
						disabled={disabledEmailInput}
					/>
				</div>
			)}
			{showPasswordInput && (
				<div className="form-group">
					<label>{isPasswordUpdatable ? 'Nouveau mot de passe' : 'Mot de passe'}</label>
					<input
						value={isPasswordUpdatable ? newPassword : password}
						name={isPasswordUpdatable ? 'newPassword' : 'password'}
						type="password"
						placeholder={isPasswordUpdatable ? 'Entrer votre nouveau mot de passe' : 'Entrer votre mot de passe'}
						onChange={isPasswordUpdatable ? (e) => setNewPassword(e.target.value) : (e) => setPassword(e.target.value)}
						className="form-control"
					/>
				</div>
			)}
			{isPasswordUpdatable && (
				<div className="form-group">
					<label>Ancien mot de passe</label>
					<input
						value={oldPassword}
						name="oldPassword"
						type="password"
						placeholder="Entrer votre ancien mot de passe"
						onChange={(e) => setOldPassword(e.target.value)}
						className="form-control"
					/>
				</div>
			)}
			<button className="btn btn-raised btn-primary" disabled={disabledBtn}>
				{btnText}
			</button>
		</form>
	);
};

export default AuthForm;
