import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_PROJECT, DELETE_PROJECT } from '../../graphql/mutations';
import { ALL_PROJECTS } from '../../graphql/queries';
import ProjectCard from '../../components/ProjectCard';

const initialState = {
	name: '',
	description: ''
};
const Project = () => {
	const [ values, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);

	// state values
	const { name, description } = values;
	// mutation
	const [ createProject ] = useMutation(CREATE_PROJECT, {
		// read query from cache / write query to cache
		update: (cache, { data: { createProject } }) => {
			// read Query from cache for performance purpose later
			const { projectsCreatedByUser } = cache.readQuery({
				query: ALL_PROJECTS
			});
			// write Query to cache
			cache.writeQuery({
				query: ALL_PROJECTS,
				data: {
					projectsCreatedByUser: [ createProject, ...projectsCreatedByUser ]
				}
			});
		},
		onError: (err) => {
			console.log(err.graphQLError);
			//toast.error(err.graphQLError[0].message)
		}
	});

	// queries
	const { data: projects } = useQuery(ALL_PROJECTS);

	/* useEffect(() => {
		setValues({ users: usersFomDb && [ ...usersFomDb.allUsers ] });
	}, []); */

	/* 	useMemo(
		() => {
			if (users) {
				setValues({
					...values,
					users: usersFomDb && usersFomDb.allUsers
				});
			}
		},
		[ users ]
	); */

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
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		await createProject({ variables: { input: values } });
		setValues(initialState);
		setLoading(false);
		toast.success('Le projet a été créée avec succès!');
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
		setValues({ users: users, ...values });
	};
	return (
		<div className="container">
			<div className="text-right">
				{loading ? (
					<h4 className="text-info">Chargement en cours...</h4>
				) : (
					<a href="/project/add" className="btn btn-raised btn-primary"> Ajouter un projet</a>
				)}
			</div>
			<hr />
			{/* {projects && JSON.stringify(projects)} */}
			{/* Need to make a check otherwise users.allUsers provoke an error */}
			<div className="row">
				{projects &&
					projects.projectsCreatedByUser.map((project) => (
						<div className="col-sm-6 col-md-7 col-lg-4 mt-4" key={project._id}>
							<ProjectCard
								handleDelete={handleDelete}
								project={project}
								showDeleteButton={false}
								showUpdateButton={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Project;
