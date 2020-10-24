import React from 'react';

//Material UI ---
import { makeStyles, CircularProgress } from '@material-ui/core';

//Styles ---
import './Spinner-styles.scss';

const S_spinner = makeStyles((theme) => ({
	loaderContainer: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		webkitTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',
		width: '100vw',
		textAlign: 'center'
	},
	spinner: {
		color: theme.palette.secondary.main
	}
}));

const Spinner = ({ text = '' }) => {
	const S = S_spinner();
	return (
		<div className={S.loaderContainer}>
			{text}
			<CircularProgress className={S.spinner} size={60} />
		</div>
	);
};

export default Spinner;
