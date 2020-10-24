//React ---
import React from 'react';

//Material-ui ---
import { Button, Typography } from '@material-ui/core';

//Styles ---
import { S_customButton } from './CustomButton-styles.js';

const CustomButton = ({
	isFullWidth,
	btnText,
	onClick = (f) => f,
	width = '14rem',
	minWidth = '10rem',
	maxWidth = '21rem',
	height = '2.5rem',
	fontSize = 'large',
	color = 'secondary',
	style = {}
}) => {
	const S = S_customButton();

	return (
		<Button
			id={'btnId'}
			className={S.rootCustomButton}
			children
			disableElevation
			fullWidth={isFullWidth}
			variant="contained"
			color={color}
			onClick={onClick}
			style={{
				width: width,
				height: height,
				minWidth: minWidth,
				maxWidth: maxWidth,
				fontSize: fontSize,
				...style
			}}
		>
			<Typography className={S.btnLabel}>{btnText.toUpperCase()}</Typography>
		</Button>
	);
};

export default CustomButton;
