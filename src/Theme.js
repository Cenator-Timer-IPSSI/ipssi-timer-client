import { createMuiTheme } from '@material-ui/core';

// colors declarations
const cenatorBlue = '#0B72B9';
// const cenatorBlue = '#007cc1';
const cenatorOrange = '#FFBA60';
const cenatorGrey = '#868686';

export default createMuiTheme({
	palette: {
		common: {
			blue: `${cenatorBlue}`,
			orange: `${cenatorOrange}`
		},
		primary: {
			main: `${cenatorBlue}`
		},
		secondary: {
			main: `${cenatorOrange}`
		}
	},
	typography: {
		tab: {
			textTransform: 'none',
			fontWeight: 700,
			fontSize: '1rem',
			fontFamily: 'Raleway'
		},
		h2: {
			fontFamily: 'Raleway',
			fontWeight: 700,
			fontSize: '2.5rem',
			color: cenatorBlue,
			lineHeight: 1.5
		},
		h4: {
			fontFamily: 'Raleway',
			fontWeight: 700,
			fontSize: '1.75rem',
			color: cenatorBlue
		},
		subtitle1: {
			fontFamily: 'Raleway',
			fontWeight: 300,
			fontSize: '1.25rem',
			color: cenatorGrey
		},
		authBtn: {
			textTransform: 'none',
			fontFamily: 'Pacifico',
			fontSize: '1rem',
			color: '#ffffff'
		},
		opacityTab: {
			opacity: 0.7
		},
		learnMoreBtn: {
			color: cenatorBlue,
			borderWidth: 2,
			borderColor: cenatorBlue,
			borderRadius: 50,
			textTransform: 'none',
			fontFamily: 'Robotto',
			fontWeight: 'bold'
		}
	}
});
