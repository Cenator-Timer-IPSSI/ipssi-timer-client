import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_PROJECTS, SINGLE_TEAM, ALL_USERS, SINGLE_PROJECT, SINGLE_Timer, ALL_TIMERS } from '../../graphql/queries';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../../graphql/mutations';
import { useParams, useHistory } from 'react-router-dom';
import omitDeep from 'omit-deep';
import TimerView from '../timer/TimerView';

const Project = () => {
	const [ values, setValues ] = useState({
		_id: '',
		name: '',
		description: '',
	});
	const history = useHistory();
	const [ getSingleProject, { data: singleProject } ] = useLazyQuery(SINGLE_PROJECT);

	const [ loading, setLoading ] = useState(false);

	// For routing
	const { projectid } = useParams();

	// Grab data inside state
	const { _id, name, description } = values;
  const { data: usersFomDb } = useQuery(ALL_USERS);

	useMemo(
		() => {
			if (singleProject) {
				setValues({
					...values,
					_id: singleProject.singleProject._id,
					name: singleProject.singleProject.name,
					description: singleProject.singleProject.description,
				});
			}
		},
		[ singleProject ]
	);

	useEffect(() => {
		console.log(projectid);
		getSingleProject({ variables: { projectId: projectid } });
	}, []);

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		setLoading(false);
		toast.success("Les informations du projet sont mise à jour avec succès !");
	};

	//Delete project
	const [ deleteProject ] = useMutation(DELETE_PROJECT, {
		update: ({ data }) => {
			console.log('DELETE PROJECT MUTATION', data);
			toast.info(`Le projet a été supprimé !`);
		},
		onError: (err) => {
			console.log(err);
			toast.error('Une Erreur est survenue lors de la suppression du projet !');
		}
	});
	const handleDelete = async (projectId) => {
		// Ask user if he really want to delete
		let answer = window.confirm('Voulez-vous vraiment supprimé ce projet ?');
		if (answer) {
			setLoading(true);
			deleteProject({
				variables: { projectId },
				refetchQueries: [ { query: ALL_PROJECTS } ]
			});
			setLoading(false);
			history.push("/projects")
		}
	};
	//Delete project

	return (
		<div className="container p-5">
			{loading ? <h3 className="text-danger">Chargement en cours...</h3> : <h3>Project : {name}</h3>}
				<p className="h5 m-2"><u>Description :</u> </p>
				<p className="m-4">{description}</p>
					<button
						onClick={() => history.push(`/project/update/${_id}`)}
						className="btn btn-raised btn-primary mr-4"
					>Modifier</button>
					<button onClick={() => handleDelete(_id)} className="btn btn-raised btn-danger">
						Supprimer
					</button>
				<hr/>
				<p className="h5"><u>Tâches :</u></p>
        <TimerView/>
		</div>
	);
};

export default Project;
