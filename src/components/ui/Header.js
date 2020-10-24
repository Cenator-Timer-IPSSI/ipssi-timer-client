import React, { useState, useEffect, Fragment, useContext, useMemo } from 'react';
import {
	AppBar,
	Toolbar,
	Tabs,
	Tab,
	Button,
	Menu,
	MenuItem,
	useTheme,
	useMediaQuery,
	SwipeableDrawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useStyles } from './Header-styles';
import { AuthContext } from '../../context/authContext';
import { auth } from 'firebase';
import CustomAvatar from './CustomAvatar/CustomAvatar';
import { useQuery } from '@apollo/react-hooks';
import { USER_PROFILE } from '../../graphql/queries';
import omitDeep from 'omit-deep';

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { data } = useQuery(USER_PROFILE);
	const [ userInfos, setUserInfos ] = useState({
		name: '',
		username: '',
		email: '',
		bio: '',
		images: []
	});

	const [ loading, setLoading ] = useState(false);

	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ openMenu, setOpenMenu ] = useState(false);
	const [ openDrawer, setOpenDrawer ] = useState(false);
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const { state: { user }, dispatch } = useContext(AuthContext);
	let history = useHistory();

	const logoutHandler = () => {
		// sign out the current user
		auth().signOut();

		// clean the user on the state
		dispatch({
			type: 'LOGGED_IN_USER',
			payload: null
		});
		// redirect to login page
		history.push('/login');
	};

	const toolbarList = [
		{ name: 'Accueil', link: '/', activeIndex: 0 },
		{
			name: 'Services',
			link: '/services',
			activeIndex: 1,
			ariaControls: anchorEl ? 'simple-menu' : undefined,
			hasPopup: anchorEl ? 'true' : undefined,
			mouseOver: (event) => handleClick(event)
		},
		{ name: "C'est quoi Cenator ?", link: '/about-cenator', activeIndex: 2 },
		{ name: 'La Team Cenator', link: '/cenator-team', activeIndex: 3 },
		{ name: 'Nous Contacter', link: '/contact-us', activeIndex: 4 }
	];

	const menuList = [
		{ name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
		{ name: 'Gestion de projets', link: '/project-management', activeIndex: 1, selectedIndex: 1 },
		{ name: 'La technique Pomodoro', link: '/pomodoro', activeIndex: 1, selectedIndex: 2 }
	];

	const handleChangeState = (event, newValue) => {
		return event.type === 'click' ? setValue(newValue) : null;
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = (event) => {
		setOpenMenu(false);
		setAnchorEl(null);
	};

	const handleClickItem = (event, index) => {
		setAnchorEl(null);
		setOpenMenu(false);

		setValue(1);
		setSelectedIndex(index);
	};

	useEffect(
		() => {
			[ ...toolbarList, ...menuList ].forEach((route) => {
				switch (window.location.pathname) {
					case `${route.link}`:
						if (value !== route.activeIndex) {
							setValue(route.activeIndex);
							if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
								setSelectedIndex(route.selectedIndex);
							}
						}
						break;
					default:
						break;
				}
			});
		},
		[ value, setValue, selectedIndex, setSelectedIndex, toolbarList, menuList ]
	);

	useEffect(
		() => {
			if (data) {
				setUserInfos({
					username: data.profile.username,
					name: data.profile.name,
					email: data.profile.email,
					bio: data.profile.bio,
					images: omitDeep(data.profile.images, [ '__typename' ])
				});
				// console.log(userInfos.images);
				//TODO: Fix warning messages when code are executed - We dispatch new infos to global state
				// dispatch({
				// type: 'LOGGED_IN_USER',
				// payload: { ...data['profile'] }
				// });
			}
		},
		[ data ]
	);
    const { url, public_url} = userInfos.images;
	const drawer = (
		<Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onOpen={() => setOpenDrawer(true)}
				onClose={() => setOpenDrawer(false)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.marginToolbar} />
				<List disablePadding>
					{!user ? null : (
						<ListItem
							onClick={() => {
								setOpenDrawer(false);
							}}
							divider
							button
							classes={{ undefined }}
							component={Link}
							to="/profile"
							selected={undefined}
						>
							<ListItemAvatar>
								<CustomAvatar imgSrc={url} altText={`Photo de ${userInfos.name}`} />
							</ListItemAvatar>
							<ListItemText className={classes.drawerItem} disableTypography>
								{userInfos.name}
							</ListItemText>
						</ListItem>
					)}

					{toolbarList.map((item, index) => (
						<ListItem
							key={`${item.name.trim()}${index}`}
							divider
							button
							component={Link}
							to={item.link}
							onClick={() => {
								setOpenDrawer(false);
								setValue(item.activeIndex);
							}}
							selected={item.activeIndex === value}
							classes={{ selected: classes.drawerItemSelected }}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{item.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						divider
						button
						classes={{ root: classes.drawerAuthItem, selected: classes.drawerItemSelected }}
						component={Link}
						to="/login"
						selected={value === 5}
					>
						{!user ? (
							<ListItemText className={classes.drawerItem} disableTypography>
								Se connecter
							</ListItemText>
						) : (
							<ListItemText className={classes.drawerItemDisconnect} disableTypography onClick={logoutHandler}>
								Se déconnecter
							</ListItemText>
						)}
					</ListItem>
					{!user && (
						<ListItem
							onClick={() => {
								setOpenDrawer(false);
								setValue(5);
							}}
							divider
							button
							classes={{ root: classes.drawerAuthItem, selected: classes.drawerItemSelected }}
							component={Link}
							to="/register"
							selected={value === 5}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								Créer un compte
							</ListItemText>
						</ListItem>
					)}
				</List>
			</SwipeableDrawer>
			<IconButton disableRipple onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
				<MenuIcon className={classes.drawerMenuIcon} />
			</IconButton>
		</Fragment>
	);

	const tabs = (
		<Fragment>
			<Tabs className={classes.tabContainer} value={value} onChange={handleChangeState} indicatorColor="primary">
				{toolbarList.map((tab, index) => (
					<Tab
						key={`${tab.name}${index}`}
						className={classes.tab}
						component={Link}
						to={tab.link}
						label={tab.name}
						aria-controls={tab.ariaControls}
						aria-haspopup={tab.hasPopup}
						onMouseOver={tab.mouseOver}
					/>
				))}
			</Tabs>

			{!user ? (
				<Button variant="contained" color="secondary" className={classes.authBtn} component={Link} to="/login">
					Se connecter
				</Button>
			) : (
				<Button variant="contained" color="secondary" className={classes.authBtn} component={Link} to="/profile">
					{user.username ? user.username : user.email.split('@')[0]}
				</Button>
			)}

			{!user ? (
				<Button variant="contained" color="secondary" className={classes.authBtn} component={Link} to="/register">
					Créer un compte
				</Button>
			) : (
				<Button
					variant="contained"
					color="secondary"
					className={classes.authBtn}
					component={Link}
					onClick={logoutHandler}
				>
					Se Déconnecter
				</Button>
			)}

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(openMenu)}
				MenuListProps={{ onMouseLeave: handleClose }}
				classes={{ paper: classes.menu }}
				style={{ zIndex: 1302 }}
				elevation={0}
				keepMounted
			>
				{menuList.map((menu, index) => (
					<MenuItem
						key={`${menu.name}${index}`}
						component={Link}
						to={menu.link}
						onClick={(event) => {
							handleClickItem(event, index);
							handleClose();
						}}
						classes={{ root: classes.menuItem, selected: classes.selectedMenuItem }}
						selected={selectedIndex === menu.selectedIndex}
					>
						{menu.name}
					</MenuItem>
				))}
			</Menu>
		</Fragment>
	);

	return (
		<Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary" className={classes.appBar}>
					<Toolbar disableGutters>
						<Button component={Link} to="/" disableRipple onClick={() => setValue(0)} className={classes.logoContainer}>
							<img src={logo} alt="company logo" className={classes.logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.marginToolbar} />
		</Fragment>
	);
};

export default Header;
