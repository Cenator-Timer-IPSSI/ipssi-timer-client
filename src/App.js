import React, { useContext, useMemo, useState } from 'react';

// Apollo imports --
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

// components imports --
import Nav from './components/Nav';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import CustomPrivateRoute from './components/CustomPrivateRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';

// react-router imports --
import { Switch, Route } from 'react-router-dom';

// react-toastify imports --
import { ToastContainer } from 'react-toastify';

// react-toastify imports --
import './App.css';
import CustomPublicRoute from './components/CustomPublicRoute';
import Team from './pages/team/Team';
import TeamAdd from './pages/team/TeamAdd';
import TeamView from './pages/team/TeamView';
import TeamUpdate from './pages/team/TeamUpdate';
import Project from './pages/project/Project';
import ProjectAdd from './pages/project/ProjectAdd';
import ProjectView from './pages/project/ProjectView';
import ProjectUpdate from './pages/project/ProjectUpdate';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

const App = () => {
	const { state: { user } } = useContext(AuthContext);

	const [ value, setValue ] = useState(0);
	const [ selectedIndex, setSelectedIndex ] = useState(0);


	// create http link
	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
	});

	// setContext for authtoken
	const authLink = setContext(() => {
		return {
			headers: {
				authtoken: user ? user.token : ''
			}
		};
	});

	// concat http and authtoken link
	const link = authLink.concat(httpLink);

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link
	});

	return (
		<ApolloProvider client={client}>
			<Header
				value={value}
				setValue={setValue}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
			{/* <Nav /> */}
			<ToastContainer />
			<Switch>
				<Route exact path="/" exact component={Home} />
				<Route exact path="/pomodoro" exact component={Pomodoro} />
				<CustomPublicRoute path="/login" exact component={Login} />
				<CustomPublicRoute path="/register" exact component={Register} />
				<Route path="/complete-registration" exact component={CompleteRegistration} />
				<CustomPrivateRoute path="/password/update" exact component={PasswordUpdate} />
				<Route path="/password/forgot" exact component={PasswordForgot} />
				<CustomPrivateRoute path="/profile" exact component={Profile} />
				<CustomPrivateRoute path="/teams" exact component={Team} />
				<CustomPrivateRoute path="/teams/add" exact component={TeamAdd} />
				<CustomPrivateRoute path="/team/:teamid" exact component={TeamView} />
				<CustomPrivateRoute path="/team/update/:teamid" exact component={TeamUpdate} />
				<CustomPrivateRoute path="/projects" exact component={Project} />
				<CustomPrivateRoute path="/project/add" exact component={ProjectAdd} />
				<CustomPrivateRoute path="/project/:projectid" exact component={ProjectView} />
				<CustomPrivateRoute path="/project/update/:projectid" exact component={ProjectUpdate} />
			</Switch>
			<Footer value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
		</ApolloProvider>
	);
};

export default App;
