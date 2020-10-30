import React, { useContext } from 'react';

// Apollo imports --
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

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

const App = () => {
	const { state: { user } } = useContext(AuthContext);
    let uri = "";
    if (process.env.NODE_ENV === "production" ) {
        uri = "https://cenator-api.herokuapp.com/graphql";
    } else {
        uri = process.env.REACT_APP_GRAPHQL_ENDPOINT
    }

	// create http link
	const httpLink = new HttpLink({
        uri: uri
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
			<Nav />
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
		</ApolloProvider>
	);
};

export default App;
