import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.common.blue,
		width: '100%',
		zIndex: 1302,
		position: 'relative'
	},
	adornment: {
		width: '21em',
		verticalAlign: 'bottom',
		[theme.breakpoints.down('md')]: {
			width: '15em'
		},
		[theme.breakpoints.down('sm')]: {
			width: '10em'
		},
		[theme.breakpoints.down('xs')]: {
			width: '7.5em'
		}
	},
	gridContainer: {
		position: 'absolute'
	},
	gridItem: {
		margin: '3em'
	},
	link: {
		color: 'white',
		fontFamily: 'Arial',
		fontSize: '0.75em',
		fontWeight: 'bold',
		textDecoration: 'none'
	},
	socialIcon: {
		width: '4em',
		height: '4em',
		[theme.breakpoints.down('xs')]: {
			width: '2.5em',
			height: '2.5em'
		}
	},
	socialIconContainer: {
		position: 'absolute',
		marginTop: '-6em',
		right: '1.25em',
		[theme.breakpoints.down('xs')]: {
			right: '0.6em',
			// marginTop: 'auto',
			marginBottom: 'auto'
		}
	},
	logoContainer: {
		padding: 0,
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	logo: {
		height: '8em',
		[theme.breakpoints.down('md')]: {
			height: '7em'
		},
		[theme.breakpoints.down('xs')]: {
			height: '5.5em'
		}
	}
}));
