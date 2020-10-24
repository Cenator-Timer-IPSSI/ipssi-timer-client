// React core --
import React, { useState, useMemo, useContext } from 'react';
// React router --
import { useHistory } from 'react-router-dom';

// Apollo imports --
import { useQuery, useMutation } from '@apollo/react-hooks';

// Others dependencies imports --
import { toast } from 'react-toastify';
import omitDeep from 'omit-deep';

// components imports --
import ImageUpload from '../../components/ImageUpload';
import Spinner from '../../components/ui/Spinner/Spinner';
import UpdateProfileForm from '../../components/forms/UpdateProfileForm.jsx';
import CustomButton from '../../components/ui/CustomButton/CustomButton';

// graphql imports --
import { USER_PROFILE } from '../../graphql/queries';
import { UPDATE_USER_PROFILE } from '../../graphql/mutations';

const Profile = () => {
    const history = useHistory();
	const [ profile, setProfile ] = useState({
		name: '',
		username: '',
		email: '',
		bio: '',
		images: []
	});

	const [ loading, setLoading ] = useState(false);

	const { data } = useQuery(USER_PROFILE);

	const [ updateUser ] = useMutation(UPDATE_USER_PROFILE, {
		update: ({ data }) => {
			console.log('UPDATED USER PROFILE: ', data);
			toast.success('Vos informations ont été mise à jour avec succès!');
		}
	});

	useMemo(
		() => {
			if (data) {
				setProfile({
					username: data.profile.username,
					name: data.profile.name,
					email: data.profile.email,
					bio: data.profile.bio,
					images: omitDeep(data.profile.images, [ '__typename' ])
				});

				//TODO: Fix warning messages when code are executed - We dispatch new infos to global state
				/* dispatch({
					type: 'LOGGED_IN_USER',
					payload: { ...data['profile'] }
				});*/
			}
		},
		[ data ]
	);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		//console.log(profile);
		try {
			// execute the mutation responsible to update user profile infos
			setLoading(true);
			await updateUser({ variables: { input: profile } });
            setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
		setLoading(false);
	};

	const onChangeHandler = (e) => {
        e.preventDefault()
		// we update the profile state by keeping the unmodified values and update changed properties
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-12 pb-3">
					{loading ? (
						<Spinner text="Chargement en cours..." />
					) : (
						<h4 className="py-5">Mon Profil utilisateur</h4>
					)}
				</div>
				<ImageUpload profile={profile} setProfile={setProfile} setLoading={setLoading} loading={loading} />
			</div>

			<UpdateProfileForm
				{...profile}
				onSubmitHandler={onSubmitHandler}
				onChangeHandler={onChangeHandler}
				loading={loading}
			/>
			{/* <a className="btn btn-raised btn-primary" href="/password/update">Changer mon mot de passe</a> */}
            <CustomButton
				btnText={'Changer mon mot de passe'}
				fontSize={'small'}
				width={'auto'}
				color="primary"
                onClick={() => history.push("/password/update")}
			/>
		</div>
	);
};

export default Profile;
