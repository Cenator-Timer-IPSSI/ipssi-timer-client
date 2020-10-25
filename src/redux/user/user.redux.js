import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

//--------------------------------------------------------------------
//                           TYPES
//--------------------------------------------------------------------
export const UserActionTypes = {
	SET_IS_LOGGED_IN: 'user/setIsLoggedIn',
	SET_USER_TOKEN: 'user/setUserToken',
	SET_USER_NAME: 'user/setName',
	SET_USER_EMAIL: 'user/setEmail',
	SET_USER_PASSWORD: 'user/setPassword',
	SET_USER_BIO: 'user/setBio',
	SET_USER_IMAGES: 'user/setImages'
};

//--------------------------------------------------------------------
//                           INITIAL STATE
//--------------------------------------------------------------------
export const USER_INITIAL_STATE = {
	isLoggedIn: false,
	name: '',
	token: '',
	email: '',
	password: '',
	bio: '',
	images: []
};
//--------------------------------------------------------------------
//                           ACTIONS
//--------------------------------------------------------------------
export const setIsLoggedIn_act = createAction(UserActionTypes.SET_IS_LOGGED_IN);
export const setUserToken_act = createAction(UserActionTypes.SET_USER_TOKEN);
export const setUserName_act = createAction(UserActionTypes.SET_USER_NAME);
export const setUserEmail_act = createAction(UserActionTypes.SET_USER_EMAIL);
export const setUserPassword_act = createAction(UserActionTypes.SET_USER_PASSWORD);
export const setUserBio_act = createAction(UserActionTypes.SET_USER_BIO);
export const setUserImages_act = createAction(UserActionTypes.SET_USER_IMAGES);

//--------------------------------------------------------------------
//                           REDUCERS
//--------------------------------------------------------------------
export const userReducer = handleActions(
	new Map([
		[
			setIsLoggedIn_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserToken_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserName_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserEmail_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserPassword_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserBio_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		],
		[
			setUserImages_act,
			(state, action) => ({
				...state,
				payload: action.payload
			})
		]
	]),
	USER_INITIAL_STATE
);

//--------------------------------------------------------------------
//                           SELECTORS
//--------------------------------------------------------------------
const selectUser = (state) => state.user ? state.user : null;

export const selectIsLoggedIn = createSelector([ selectUser ], (user) => (user ? user.isLoggedIn : false));
export const selectUserToken = createSelector([ selectUser ], (user) => (user ? user.token : ''));
export const selectUserUsername = createSelector([ selectUser ], (user) => (user ? user.username : ''));
export const selectUserName = createSelector([ selectUser ], (user) => (user ? user.name : ''));
export const selectUserEmail = createSelector([ selectUser ], (user) => (user ? user.email : ''));
export const selectUserPassword = createSelector([ selectUser ], (user) => (user ? user.password : ''));
export const selectUserBio = createSelector([ selectUser ], (user) => (user ? user.bio : ''));
export const selectUserImages = createSelector([ selectUser ], (user) => (user ? user.images : []));
