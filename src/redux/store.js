import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

const middlewares = [thunk];


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);

export const retrieveState = () => {
  return store ? store.getState() : null;
};

export const dispatchToState = props => {
  return store ? store.dispatch(props) : null;
};
