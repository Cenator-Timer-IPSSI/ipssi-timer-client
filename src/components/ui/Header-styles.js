import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	marginToolbar: {
		...theme.mixins.toolbar,
		marginBottom: '3em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2em'
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1.25em'
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
	},
	tabContainer: {
		marginLeft: 'auto'
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px'
	},
	authBtn: {
		...theme.typography.authBtn,
		borderRadius: '50px',
		marginLeft: '25px',
		marginRight: '5px',
		height: '45px',
		width: 'auto',
		textShadow: '1px 1px 2px #000',
		'&:hover': {
			color: theme.palette.common.white
		}
	},
	menu: {
		backgroundColor: theme.palette.common.blue,
		color: 'white',
		borderRadius: '0px'
	},
	menuItem: {
		...theme.typography.tab,
		...theme.typography.opacityTab,
		'&:hover': {
			opacity: 1
		}
	},
	selectedMenuItem: {
		fontWeight: 'bold',
		fontFamily: 'Pacifico'
	},
	drawer: {
		...theme.typography.tab,
		backgroundColor: theme.palette.common.blue
	},
	drawerItem: {
		...theme.typography.opacityTab,
		color: 'white',
		'&:hover': {
			opacity: 1
		},
		[theme.breakpoints.down('sm')]: {

		}
	},
	drawerItemDisconnect: {
		...theme.typography.opacityTab,
		color: '#f00',
		// backgroundColor: "#f00",
		'&:hover': {
			opacity: 1
		},
		[theme.breakpoints.down('sm')]: {
			// fontSize: "12px"
			fontWeight: 'normal'
		}
	},
	drawerItemSelected: {
		'& .MuiListItemText-root': {
			opacity: 1
		}
	},
	drawerIconContainer: {
		'&:hover': {
			backgroundColor: 'transparent'
		},
		marginLeft: 'auto'
	},
	drawerMenuIcon: {
		height: '50px',
		width: '50px',
		color: 'white'
	},
	drawerAuthItem: {
		...theme.typography.authBtn,
		backgroundColor: theme.palette.common.orange,
		textTransform: 'uppercase'
	},
	appBar: {
		zIndex: theme.zIndex.modal + 1
	}
}));
