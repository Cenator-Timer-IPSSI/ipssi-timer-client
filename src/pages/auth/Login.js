import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/forms/AuthForm.jsx';
import { Divider } from '@material-ui/core';
import CustomButton from '../../components/ui/CustomButton/CustomButton';

const CREATE_USER = gql`
	mutation createUser {
		createUser {
			username
			email
		}
	}
`;

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const { dispatch } = useContext(AuthContext);
	let history = useHistory();

	const [ createUser ] = useMutation(CREATE_USER);

	const onSubmitHandler = async (e) => {
		e.preventDefault(); // prevent the default Browser behavior
		setLoading(true);

		try {
			// sign in user with firebase
			await auth.signInWithEmailAndPassword(email, password).then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();

				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});

				// send info to our server and mongodb to either create/update
				createUser();
				// redirect user
				history.push('./');
			});
		} catch (error) {
			console.log(`Error ${error}`);
			toast.error('Les identifiants entrés sont invalides');
			setLoading(false);
		}
	};

	const googleLoginHandler = () => {
		setLoading(true);

		try {
			auth.signInWithPopup(googleAuthProvider).then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();

				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});

				// send info to our server and mongodb to either create/update
				createUser();
				// redirect user
				history.push('./');
			});
		} catch (error) {
			setLoading(false);
			console.log(`Error ${error}`);
			toast.error(error.message);
		}
	};

	return (
		<AuthForm
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			loading={loading}
			showPasswordInput
			onSubmitHandler={onSubmitHandler}
			btnText="Se connecter"
			authText="Se connecter à mon compte"
			disabledBtn={!email || !password || loading}
			logInWithGoogle={googleLoginHandler}
		/>
	);
};

export default Login;
