//React ---
import React, { Fragment } from 'react';

//React-router
import { useHistory } from 'react-router-dom';

//Material UI ---
import { Avatar, Box, Container, CssBaseline, TextField, Typography, Link, Grid } from '@material-ui/core';

// Material UI Icons ---
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//Components ---
import CustomButton from '../ui/CustomButton/CustomButton';
import PackageJson from '../../../package.json';

//Styles ---
import { S_authForm } from './AuthForm-styles.js';

function CustomCopyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{`V${PackageJson.version} `}
			{'Copyright © '}
			<Link color="inherit" to="https://www.github.com/Amorisson/Cenator-ipssi-timer-client/">
				Cenator
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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
	btnText = '',
	authText = 'Se connecter',
	disabledBtn = true,
	disabledEmailInput = false,
	hideEmailInput = false,
	isPasswordUpdatable = false,
	isLoginPage = true,
	logInWithGoogle = (f) => f
}) => {
	const S = S_authForm();
	const history = useHistory();

	const goToPasswordForgotPage = (path) => {
		switch (path) {
			case '/login':
				history.push(path);
				break;
			case '/register':
				history.push(path);
				break;
			case '/password/forgot':
				history.push(path);
				break;
			default:
				history.push('/login');
				break;
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={S.paper}>
				<Avatar className={S.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{authText}
				</Typography>
				<form className={S.form} onSubmit={onSubmitHandler}>
					{!hideEmailInput && (
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Adresse Email"
							autoFocus
							defaultValue={email}
							value={email}
							name="email"
							type="email"
							placeholder="Entrer votre adresse email"
							autoComplete={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							disabled={disabledEmailInput}
						/>
					)}
					{showPasswordInput && (
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							label={isPasswordUpdatable ? 'Nouveau mot de passe' : 'Mot de passe'}
							id={isPasswordUpdatable ? 'newPassword' : 'password'}
							autoComplete="current-password"
							defaultValue={isPasswordUpdatable ? newPassword : password}
							value={isPasswordUpdatable ? newPassword : password}
							name={isPasswordUpdatable ? 'newPassword' : 'password'}
							type="password"
							placeholder={isPasswordUpdatable ? 'Entrer votre nouveau mot de passe' : 'Entrer votre mot de passe'}
							onChange={
								isPasswordUpdatable ? (e) => setNewPassword(e.target.value) : (e) => setPassword(e.target.value)
							}
							className="form-control"
						/>
					)}

					{isPasswordUpdatable && (
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							label={'Ancien mot de passe'}
							id="oldPassword"
							autoComplete="current-password"
							defaultValue={isPasswordUpdatable ? newPassword : password}
							value={oldPassword}
							type="password"
							name="oldPassword"
							placeholder="Entrer votre ancien mot de passe"
							onChange={(e) => setOldPassword(e.target.value)}
							className="form-control"
						/>
					)}
					{history.location.pathname === '/login' ? (
						<Grid container spacing={5} justify="center" alignItems="center">
							<Grid item>
								<Link component="button" variant="body2" onClick={() => goToPasswordForgotPage('/register')}>
									Vous n'avez pas de compte ?
								</Link>
							</Grid>
							<Grid item>
								<Link
									component="button"
									variant="body2"
									color="error"
									onClick={() => goToPasswordForgotPage('/password/forgot')}
								>
									Mot de passe oublié ?
								</Link>
							</Grid>
						</Grid>
					) : (
						<Link component="button" variant="body2" onClick={() => goToPasswordForgotPage('/login')}>
							J'ai déjà un compte !
						</Link>
					)}

					<CustomButton
						btnText={btnText}
						fontSize={'small'}
						width={'100%'}
						maxWidth={'100%'}
						color="secondary"
						disabled={disabledBtn}
					/>
					<CustomButton
						btnText={'Se connecter avec Google'}
						fontSize={'small'}
						width={'100%'}
						maxWidth={'100%'}
						color="secondary"
						disabled={disabledBtn}
						onClick={logInWithGoogle}
					/>

					<CustomButton
						btnText={'Se connecter avec Facebook'}
						fontSize={'small'}
						width={'100%'}
						maxWidth={'100%'}
						color="secondary"
						disabled={disabledBtn}
						onClick={logInWithGoogle}
					/>
					{/* <button className="btn btn-raised btn-danger my-3" onClick={logInWithGoogle}>
						Se connecter avec Google
					</button> */}
				</form>
			</div>
			<Box mt={2}>
				<CustomCopyright />
			</Box>
		</Container>
		/* <form onSubmit={onSubmitHandler}>
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
		</form> */
	);
};

export default AuthForm;
