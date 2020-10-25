import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
//Components
import App from './App';
import { AuthProvider } from './context/authContext';

//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

ReactDOM.render(
	// <Provider store={store}>
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				{/* <PersistGate persistor={persistor}> */}
				<App />
				{/* </PersistGate> */}
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	/* </Provider> */ document.getElementById('root')
);
