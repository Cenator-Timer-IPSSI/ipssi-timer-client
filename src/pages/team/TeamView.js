import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_TEAM, DELETE_TEAM } from '../../graphql/mutations';
import { ALL_TEAMS } from '../../graphql/queries';
import TeamCard from '../../components/TeamCard';
import TeamForm from '../../components/forms/TeamForm.jsx';
import omitDeep from 'omit-deep';

const initialState = {
	name: '',
	description: ''
	//users: []
};
const Team = () => {
	const [ values, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);
	const [ selected, setSelected ] = useState([]);

	// state values
	const { name, description, users } = values;

	// queries
	const { data: teams } = useQuery(ALL_TEAMS);

	const [ deleteTeam ] = useMutation(DELETE_TEAM, {
		update: ({ data }) => {
			console.log('DELETE TEAM MUTATION', data);
			toast.info(`L'équipe a été supprimé !`);
		},
		onError: (err) => {
			console.log(err);
			toast.error("Une Erreur est survenue lors de la suppression de l'équipe !");
		}
	});

	const handleDelete = async (teamId) => {
		// Ask user if he really want to delete
		let answer = window.confirm('Voulez-vous vraiment supprimé cette équipe ?');
		if (answer) {
			setLoading(true);
			deleteTeam({
				variables: { teamId },
				refetchQueries: [ { query: ALL_TEAMS } ]
			});
			setLoading(false);
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setValues(initialState);
		setLoading(false);
		toast.success('Votre équipe a été créée avec succès!');
	};

	const onChangeHandler = (e) => {
		e.preventDefault();
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSelectChange = (e) => {
		let options = e.target.options;
		let users = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				users.push(options[i].value);
			}
		}
		//setValues({ users: users, ...values });
	};

	return (
		<div className="container">
			<div className="text-right">
				{loading ? (
					<h4 className="text-info">Chargement en cours...</h4>
				) : (
					<a href="./teams/add" className="btn btn-raised btn-primary"> Ajouter une équipe </a>
				)}
			</div>
			<hr/>
			<div className="row p-5">
				{teams &&
					teams.teamsCreatedByAdmin.map((team) => (
						<div className="col-md-6 pt-5" key={team._id}>
							<TeamCard
								handleDelete={handleDelete}
								team={team}
								showDeleteButton={true}
								showUpdateButton={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Team;
