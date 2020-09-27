import React, { useState } from 'react';
import AuthForm from '../../components/forms/AuthForm';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

const PasswordUpdate = () => {
	const [ newPassword, setNewPassword ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const history = useHistory();

	const reAuthenticate = (currentPassword) => {
		const user = auth.currentUser;
		const credentials = new firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
		return user.reauthenticateWithCredential(credentials);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		reAuthenticate(oldPassword)
			.then(() => {
				auth.currentUser // grab the infos of the current authenticate user and updates it
					.updatePassword(newPassword)
					.then(() => {
						setLoading(false);
						setNewPassword('');
						setOldPassword('');
						toast.success('Votre mot de passe a été mise à jour !');
						history.push('/profile'); // redirect user to the profile page before password update process
						console.log('Password updated!');
					})
					.catch((error) => {
						setLoading(false);
						console.log(error);
						console.log('PASSWORD UPDATE ERROR', error.message);
						toast.error('Le nouveau mot de passe doit faire au moins 6 caractères !');
					});
			})
			.catch((error) => {
				setLoading(false);
				if (error.message === 'INVALID_PASSWORD') {
					toast.error('Le nouveau mot de passe doit faire au moins 6 caractères !');
				} else {
					toast.error('Votre ancien mot de passe est invalide !');
					setOldPassword('');
				}
				console.log(error.message);
			});
	};

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">En cours ...</h4> : <h4 className="py-5">Modification de mot de passe</h4>}
			<AuthForm
				newPassword={newPassword}
				oldPassword={oldPassword}
				setNewPassword={setNewPassword}
				setOldPassword={setOldPassword}
				loading={loading}
				btnText="Mettre à jour"
				onSubmitHandler={onSubmitHandler}
				showPasswordInput
				hideEmailInput
				disabledBtn={!newPassword || !oldPassword || loading}
				isPasswordUpdatable
			/>
		</div>
	);
};

export default PasswordUpdate;
