import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { userReducer } from './user/user.redux';

// Tell redux where and how to persist data
const persistConfig = {
	key: 'root',
	storage: sessionStorage,
	stateReconciler: autoMergeLevel2,
	whitelist: [ 'user' ]
};

const rootReducer = combineReducers({
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
